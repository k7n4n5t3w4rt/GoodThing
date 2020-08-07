// @flow
import fs from "fs";
import path from "path";
/*::
import typeof FsType from "fs";
 */

const readFromCache = (
  url /*: string */,
  cacheTtl /*: number */,
  force /*: boolean */ = false,
) /*: string | false */ => {
  const cachedFilePath = `./public${url}/index.html`.replace("//", "/");
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

const writeToCache = (
  url /*: string */,
  renderedOutput /*: string */,
) /*:  Promise<boolean> */ => {
  const filePath /*: string */ = `./public${url}/index.html`.replace("//", "/");
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

const writeFile = (
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

const clearCache = () /*: boolean */ => {
  const publicPath = "public";
  fs.rmdirSync(
    publicPath,
    // $FlowFixMe
    { recursive: true },
  );
  // $FlowFixMe
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }
  return true;
};

export default {
  writeToCache,
  readFromCache,
  clearCache,
};
