// @flow
import { appPaths } from "./static_config.js";
import requestPromise from "./request_promise.js";
import { copyStaticFiles } from "./static_generate.js";
/*::
import typeof { appPaths as AppPathsType } from "./static_config.js";
import RequestPromiseType from "./request_promise.js";
*/

copyStaticFiles();

appPaths().forEach((url /*: string */) /*: Promise<any> */ =>
  requestPromise({
    hostname: "localhost",
    port: 4000,
    method: "GET",
    path: url + "?generate=true",
  })
    .then(() /*: void */ => {
      console.log(`Done: [`, url, `]`);
    })
    .catch((e) => {
      console.log(e);
    }));
