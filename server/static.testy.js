// @flow
import { goodthingElement } from "./static_config.js";
import { test, testPromise, should } from "./testy.js";
import {
  openFile,
  writeFile,
  writeToCache,
  readFromCache,
  clearFromCache,
  restoreIndexFile,
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
  clearFromCache as ClearFromCacheType,
  restoreIndexFile as RestoreIndexFileType
} from "./static.js";
*/

testPromise("Cache | Opening a file", () /*: Promise<any>*/ => {
  const cachedFilePath /*: string */ = "./testytest1.html";
  return openFile(cachedFilePath)
    .then((fd /*: number */) /*: void */ => {
      should(fd).be.aboveOrEqual(0);
      should(fs.existsSync(cachedFilePath)).be.exactly(true);
      // Clean up the file
      fs.unlink(cachedFilePath, () /*: void */ => {});
    })
    .catch((e) /*: void */ => {
      console.error(e);
    });
});

testPromise("Cache | Writing to a file", () /*: Promise<any> */ => {
  const cachedFilePath /*: string */ = "./testytest2.html";
  return openFile(cachedFilePath)
    .then((fd /*: number */) /*: void */ => {
      writeFile(fd, "Testy test")
        .then((result /*: boolean */) /*: void */ => {
          if (result === true) {
            should(fs.readFileSync(cachedFilePath, "utf8")).be.exactly(
              "Testy test",
            );
            // Clean up the file
            fs.unlink(cachedFilePath, () /*: void */ => {});
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

testPromise("Cache | Fixing up the ./index.html", () /*: Promise<any> */ => {
  const cachedFilePath /*: string */ = "/";

  const cachedFileContents = readFromCache(cachedFilePath, 0, true) || "";
  let restoredIndexFileContents = cachedFileContents;
  if (cachedFileContents !== "") {
    const gtStartElement = `<${goodthingElement} id="goodthing" data-goodthing>`;
    const gtStartElementRe = `<${goodthingElement} id="goodthing" data-goodthing>`;
    const gtEndElement = `</${goodthingElement} data-goodthing>`;
    const gtEndElementRe = `<\\/${goodthingElement} data-goodthing>`;
    const reString = `${gtStartElementRe}[\\s\\S]*${gtEndElementRe}`;
    const re = new RegExp(reString, "g");
    restoredIndexFileContents =
      cachedFileContents.replace(
        re,
        `${gtStartElement}<!-- GOODTHING -->${gtEndElement}`,
      ) || "";
    return restoreIndexFile(goodthingElement)
      .then(result => {
        should(readFromCache(cachedFilePath, 10, true)).be.exactly(
          restoredIndexFileContents,
        );
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  }
  return Promise.reject(false);
});

testPromise(
  "Cache | Writing to and reading from the cache",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ =
      "/this/is/a/test/of/the/cache/script/testytest";

    return writeToCache(cachedFilePath, "Testy test")
      .then(result => {
        should(result).be.exactly(true);
        return result;
        // Clean up the file
      })
      .then(result => {
        should(readFromCache(cachedFilePath, 0, true)).be.exactly("Testy test");
        fs.unlink(cachedFilePath, (
          e /*: Error | null | typeof undefined */,
        ) /*: void */ => {
          if (e) {
            // console.error(e);
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
  "Cache | Clearing a branch from the cache",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ =
      "/this/is/a/test/of/the/cache/script/testytest";
    return writeToCache(cachedFilePath, "Testy test")
      .then(result => {
        if (result === true) {
          clearFromCache(cachedFilePath)
            .then((result /*: boolean */) /*: void */ => {
              should(fs.existsSync(cachedFilePath)).be.exactly(false);
              should(result).be.exactly(true);
            })
            .catch((e /*: Error */) /*: void */ => {
              console.error(e);
            });
        } else {
          console.error("Something went wrong writing to the cache.");
        }
      })
      .catch((e) /*: void */ => {
        console.error(e);
      });
  },
);

testPromise(
  "Cache | Trying to clear a branch from the cache that doesn't exist",
  () /*: Promise<any> */ => {
    const cachedFilePath /*: string */ =
      "/this/is/a/test/of/the/cache/script/testytest";
    return clearFromCache(cachedFilePath)
      .then((result /*: boolean */) /*: void */ => {
        should(fs.existsSync(cachedFilePath)).be.exactly(false);
        should(result).be.exactly(true);
      })
      .catch((e /*: Error */) /*: void */ => {
        console.error(e);
      });
  },
);
