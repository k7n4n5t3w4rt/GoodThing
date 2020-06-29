// @flow
import http from "http";
import fs from "fs";
import finalHandler from "finalhandler";
import serveStatic from "serve-static";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
import render from "../web_modules/preact-render-to-string.js";
import App from "../js/App.js";
import { readFromCache, writeToCache } from "./static.js";
import {
  goodthingElement,
  cacheTtl,
  appPaths,
  unCachedUrls,
} from "./static_config.js";

const html /*: HtmType */ = htm.bind(h);

// Flow
/*::
import typeof {
  goodthingElement as GoodthingElementType,
  cacheTtl as CacheTtlType,
  appPaths as AppPathsType,
  unCachedUrls as UnCachedUrlsType
} from "./static_config.js";
import typeof {
  readFromCache as ReadFromCacheType,
  writeToCache as WriteToCacheType
} from "./static.js";
import typeof AppType from "../js/App.js";
import typeof RenderType from "../web_modules/preact-render-to-string.js";
import typeof { h as HType } from "../web_modules/preact.js";
import typeof HtmType from "../web_modules/htm.js";
import typeof ServeStaticType from "serve-static";
import typeof FinalHandlerType from "finalhandler";
import typeof FsType from "fs";
import typeof HttpType from "http";
*/

// CONFIG
const PORT /*: number */ = 4000;

var serveAsStatic = serveStatic(".", {
  index: false,
});

const requestHandler = (req, res) => {
  req.url = req.url.replace(/\/$/, "");
  // NOTE: The trailing "/" doesn't seem to matter
  // to `preact-router` when `/js/App.js` is being
  // rendered server-side
  const [urlPath /*: string */, queryString /*: string */] = req.url.split("?");
  let generateValue /*: string */ = "";
  if (typeof queryString !== "undefined") {
    [, generateValue] = queryString.split("=");
  }
  let forceCache /*: boolean */ = false;
  if (generateValue === "true") {
    forceCache = true;
  }
  if (urlPath.match(/.+\..+$/) !== null) {
    // console.log("Static: ", urlPath);
    serveAsStatic(req, res, finalHandler(req, res));
  } else if (
    cacheTtl > 0 &&
    forceCache === false &&
    appPaths().indexOf(urlPath) !== -1
  ) {
    const output = readFromCache(urlPath, cacheTtl);
    if (output !== false) {
      console.log("Cache: ", urlPath);
      res.end(output);
    } else {
      const output = renderToString(urlPath);
      writeToCache(urlPath, output);
      console.log("Rendered: ", urlPath);
      res.end(output);
    }
  } else {
    const output = renderToString(urlPath);
    if (forceCache === true) {
      writeToCache(urlPath, output);
      console.log("Cached: ", urlPath);
    }
    console.log("Rendered: ", urlPath);
    res.end(output);
  }
};

const renderToString = (url /*: string */) /*: string */ => {
  const index /*: string */ = fs.readFileSync("./index.html", "utf8");
  // [1] Swap the placeholder copy with the rendered output
  const gtStartElement = `<${goodthingElement} id="goodthing" data-goodthing>`;
  const gtStartElementRe = `<${goodthingElement} id="goodthing" data-goodthing>`;
  const gtEndElement = `</${goodthingElement} data-goodthing>`;
  const gtEndElementRe = `<\\/${goodthingElement} data-goodthing>`;
  const reString = `${gtStartElementRe}[\\s\\S]*${gtEndElementRe}`;
  const re = new RegExp(reString, "g");
  let renderedContent = index.replace(
    re,
    `${gtStartElement}` +
      render(App({ url }), {}, { pretty: true }) +
      `${gtEndElement}`,
  );
  return renderedContent;
};

const server = http.createServer(requestHandler);

server.listen(PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${PORT}`);
});
