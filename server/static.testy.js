// @flow
import { goodthingElement } from "./static_config.js";
import { test, testPromise, should } from "./testy.js";
import {
  openFile,
  writeFile,
  writeToCache,
  readFromCache,
  clearCache,
} from "./static.js";
import requestPromise from "./request_promise.js";
import fs, { read } from "fs";
/*::
import typeof {
  goodthingElement as GoodthingElementType,
} from "./static_config.js";
import typeof {
  test as TestType,
  testPromise as TestPromiseType,
  should as ShouldType
} from "./testy.js";
import typeof {
  openFile as OpenFileType,
  writeFile as WriteFileType,
  writeToCache as WriteToCacheType,
  readFromCache as ReadFromCacheType,
  clearCache as ClearCacheType,
} from "./static.js";
*/

test("Cache | Clearing the cache", () /*: void */ => {
  should(clearCache()).be.exactly(true);
});

testPromise("Cache | Opening a file", () /*: Promise<any>*/ => {
  const cachedFilePath /*: string */ = "./public/testytest1.html";
  return openFile(cachedFilePath)
    .then((fd /*: number */) /*: void */ => {
      should(fd).be.aboveOrEqual(0);
      should(fs.existsSync(cachedFilePath)).be.exactly(true);
      // Clean up the file
      fs.unlink(cachedFilePath, (
        e /*: Error | null | typeof undefined */,
      ) /*: void */ => {
        if (e) {
          console.error(e);
        }
      });
    })
    .catch((e) /*: void */ => {
      console.error(e);
    });
});

testPromise("Cache | Writing to a file", () /*: Promise<any> */ => {
  const cachedFilePath /*: string */ = "./public/testytest2.html";
  return openFile(cachedFilePath)
    .then((fd /*: number */) /*: void */ => {
      writeFile(fd, "Testy test")
        .then((result /*: boolean */) /*: void */ => {
          if (result === true) {
            should(fs.readFileSync(cachedFilePath, "utf8")).be.exactly(
              "Testy test",
            );
            // Clean up the file
            fs.unlink(cachedFilePath, (
              e /*: Error | null | typeof undefined */,
            ) /*: void */ => {
              if (e) {
                console.error(e);
              }
            });
          }
        })
        .catch((e) /*: void */ => {
          console.error(e);
        });
    })
    .catch((e) /*: void */ => {
      console.error(e);
    });
});

testPromise(
  "Cache | Writing to and reading from /index.html",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ = "/";

    return writeToCache(cachedFilePath, "Testy test")
      .then((result) => {
        should(result).be.exactly(true);
        return result;
        // Clean up the file
      })
      .then((result) => {
        should(readFromCache(cachedFilePath, 0, true)).be.exactly("Testy test");
        fs.unlink("./public" + cachedFilePath + "index.html", (
          e /*: Error | null | typeof undefined */,
        ) /*: void */ => {
          if (e) {
            console.error(e);
          }
        });
        return true;
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  },
);

testPromise(
  "Cache | Writing to and reading from the deep cache",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ =
      "/this/is/a/test/of/the/cache/script/testytest";

    return writeToCache(cachedFilePath, "Testy test")
      .then((result) => {
        should(result).be.exactly(true);
        return result;
        // Clean up the file
      })
      .then((result) => {
        should(readFromCache(cachedFilePath, 0, true)).be.exactly("Testy test");
        // $FlowFixMe
        fs.rmdirSync("./public/this", { recursive: true });
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  },
);
