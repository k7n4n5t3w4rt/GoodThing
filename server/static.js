// @flow
import fs from "fs";
import path from "path";
/*::
import typeof FsType from "fs";
 */

export const readFromCache = (
  url /*: string */,
  cacheTtl /*: number */,
  force /*: boolean */ = false,
) /*: string | false */ => {
  const cachedFilePath = `.${url}/index.html`.replace("//", "/");
  const fileExists = fs.existsSync(cachedFilePath);
  if (fileExists) {
    const stats = fs.statSync(cachedFilePath);
    const then = Math.floor(stats.mtimeMs / 1000); // seconds
    const now = Math.floor(Date.now() / 1000); // Seconds
    if (now - then < cacheTtl || force === true) {
      return fs.readFileSync(cachedFilePath, "utf8");
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const writeToCache = (
  url /*: string */,
  renderedOutput /*: string */,
) /*:  Promise<boolean> */ => {
  const filePath /*: string */ = `.${url}/index.html`.replace("//", "/");
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }
  return openFile(filePath)
    .then((fd /*: number */) /*: Promise<boolean> */ => {
      return writeFile(fd, renderedOutput)
        .then(() /*: boolean */ => {
          return true;
        })
        .catch((e /*: Error */) /*: boolean */ => {
          console.error(e);
          return false;
        });
    })
    .catch((e /*: Error */) /*: boolean */ => {
      console.error(e);
      return false;
    });
};

export const restoreIndexFile = (
  goodthingElement /*: string */,
) /*:  Promise<boolean> */ => {
  const indexFilePath /*: string */ = "./index.html";
  if (fs.existsSync(indexFilePath)) {
    const cachedFileContents = readFromCache("/", 0, true) || "";
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
      if (restoredIndexFileContents !== "") {
        return openFile(indexFilePath)
          .then((fd /*: number */) /*: Promise<boolean> */ => {
            return writeFile(fd, restoredIndexFileContents)
              .then(() /*: boolean */ => {
                return true;
              })
              .catch((e /*: Error */) /*: boolean */ => {
                console.error(e);
                return false;
              });
          })
          .catch((e /*: Error */) /*: boolean */ => {
            console.error(e);
            return false;
          });
      }
    }
  }
  // If something has gone wrong, reject
  return Promise.reject(false);
};

export const openFile = (filePath /*: string */) /*: Promise<number> */ => {
  return new Promise((resolve, reject) /*: void */ => {
    fs.open(filePath, "w", (
      e /*: ?ErrnoError */,
      fd /*: number */,
    ) /*: void */ => {
      if (e) {
        reject(e);
      } else {
        resolve(fd);
      }
    });
  });
};

export const writeFile = (
  fd /*: number */,
  renderedOutput /*: string */,
) /*: Promise<boolean> */ => {
  return new Promise((resolve, reject) /*: void */ => {
    fs.write(fd, renderedOutput, 0, "utf8", (
      e /*: ?ErrnoError */,
      written /*: number */,
      string /*: string */,
    ) /*: void */ => {
      if (e) {
        reject(e);
      } else {
        resolve(true);
      }
    });
  }).catch((e /*: Error */) /*: boolean */ => {
    console.error(e);
    return false;
  });
};

export const clearFromCache = (url /*: string */) /*: Promise<boolean> */ => {
  const [, topLevelDirectory] = url.split("/");
  return new Promise((resolve, reject) /*: void */ => {
    // Flow doesn't recognise the new signature for
    // fs.rmdir with the recursive option
    const deleteDir = `./${topLevelDirectory}`;
    // Don't do it. Don't recursively delete everything
    if (deleteDir === "/" || deleteDir === "./" || deleteDir === "../") {
      throw new Error("This is, potentially, a massive problem.");
    } else if (deleteDir === "./") {
      // Not so much of a problem but we have to
      // work out what to do with ./index.html
    } else {
      // Ok, continue...
      fs.rmdir(
        deleteDir,
        // $FlowFixMe
        {
          recursive: true,
        },
        // $FlowFixMe
        e => {
          if (e) {
            reject(e);
          } else {
            resolve(true);
          }
        },
      );
    }
  });
};
