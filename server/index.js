// @flow
import conf from "./config.js";
import http from "http";
import fs from "fs";
import finalHandler from "finalhandler";
import serveStatic from "serve-static";
import { h } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
import render from "../web_modules/preact-render-to-string.js";
import App from "../js/App.js";
import staticCache from "./static_cache.js";
import {
  goodthingElement,
  cacheTtl,
  appPaths,
  unCachedUrls,
} from "./static_config.js";
// Flow
const html = htm.bind(h);

var serveAsStatic = serveStatic(".", {
  index: false,
});

const requestHandler = (req, res) => {
  req.url = req.url.replace(/\/$/, "");
  // NOTE: The trailing "/" doesn't seem to matter
  // to `preact-router` when `/js/App.js` is being
  // rendered server-side
  const [urlPath /*: string */, queryString /*: string */] = req.url.split("?");
  let generate /*: boolean */ = false;
  let generateValue /*: string */ = "";
  if (typeof queryString !== "undefined") {
    [, generateValue] = queryString.split("=");
    generate = generateValue === "true";
  }
  let forceCache /*: boolean */ = false;
  if (generate === true) {
    forceCache = true;
  }
  if (urlPath.match(/.+\..+$/) !== null) {
    serveAsStatic(req, res, finalHandler(req, res));
  } else if (
    cacheTtl > 0 &&
    forceCache === false &&
    appPaths().indexOf(urlPath) !== -1
  ) {
    const output = staticCache.readFromCache(urlPath, cacheTtl);
    if (output !== false) {
      // console.log("Cache: ", urlPath);
      res.end(output);
    } else {
      const output = renderToString(urlPath, generate);
      staticCache.writeToCache(urlPath, output);
      // console.log("Rendered: ", urlPath);
      res.end(output);
    }
  } else {
    const output = renderToString(urlPath, generate);
    if (forceCache === true) {
      staticCache.writeToCache(urlPath, output);
      // console.log("Cached: ", urlPath);
    }
    // console.log("Rendered: ", urlPath);
    res.end(output);
  }
};

const renderToString = (
  url /*: string */,
  generate /*: boolean */,
) /*: string */ => {
  const index /*: string */ = fs.readFileSync("./index.html", "utf8");
  let renderedContent = index;

  // Server-side rendering
  if (conf.NODE_ENV !== "development" || generate === true) {
    // [1] Swap the placeholder copy with the rendered output
    const gtStartElement = `<${goodthingElement} id="goodthing" data-goodthing>`;
    const gtStartElementRe = `<${goodthingElement} id="goodthing" data-goodthing>`;
    const gtEndElement = `</${goodthingElement} data-goodthing>`;
    const gtEndElementRe = `<\\/${goodthingElement} data-goodthing>`;
    const reString = `${gtStartElementRe}[\\s\\S]*${gtEndElementRe}`;
    const re = new RegExp(reString, "g");
    renderedContent = index.replace(
      re,
      `${gtStartElement}` +
        render(App({ url }), {}, { pretty: true }) +
        `${gtEndElement}`,
    );
  }

  // Do the ENVs
  const re_env_NODE_ENV = new RegExp("_NODE_ENV_", "g");
  renderedContent = renderedContent.replace(re_env_NODE_ENV, conf.NODE_ENV);
  const re_env_REMEMBER_ME = new RegExp("_REMEMBER_ME_", "g");
  renderedContent = renderedContent.replace(
    re_env_REMEMBER_ME,
    conf.REMEMBER_ME.toString(),
  );
  return renderedContent;
};

const server = http.createServer(requestHandler);

server.listen(conf.PORT, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${conf.PORT}`);
});
