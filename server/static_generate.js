// @flow
import { appPaths } from "./static_config.js";
import requestPromise from "./request_promise.js";
import fs from "fs";
import path from "path";
/*::
import typeof FsType from "fs";
import typeof { appPaths as AppPathsType } from "./static_config.js";
import RequestPromiseType from "./request_promise.js";
*/

const copyDir = function (src, dest) {
  const files = fs.readdirSync(src);
  for (let i = 0; i < files.length; i++) {
    const current = fs.lstatSync(path.join(src, files[i]));
    if (current.isDirectory()) {
      copyDir(
        path.join(src, files[i]),
        "./public/" + path.join(dest, files[i]),
      );
    } else {
      fs.copyFileSync(
        path.join(src, files[i]),
        "./public/" + path.join(dest, files[i]),
      );
    }
  }
};

// Copy in the static files
fs.copyFileSync("modernizr-config.json", "./public/modernizr-config.json");
fs.copyFileSync("404.html", "./public/404.html");
fs.copyFileSync("browserconfig.xml", "./public/browserconfig.xml");
fs.copyFileSync("favicon.ico", "./public/favicon.ico");
fs.copyFileSync("humans.txt", "./public/humans.txt");
fs.copyFileSync("icon.png", "./public/icon.png");
fs.copyFileSync("index.html", "./public/index.html");
fs.copyFileSync("robots.txt", "./public/robots.txt");
fs.copyFileSync("site.webmanifest", "./public/site.webmanifest");
fs.copyFileSync("tile-wide.png", "./public/tile-wide.png");
fs.copyFileSync("tile.png", "./public/tile.png");
copyDir("js", "./public/js");
copyDir("img", "./public/img");
copyDir("css", "./public/css");

appPaths().forEach((url /*: string */) /*: Promise<any> */ =>
  requestPromise({
    hostname: "localhost",
    port: 4000,
    method: "GET",
    path: url + "?generate=true",
  })
    .then(({ asdasd, dasdasd }) => {
      console.log(`Done: [`, url, `]`);
    })
    .catch((e) => {
      console.log(e);
    }));
