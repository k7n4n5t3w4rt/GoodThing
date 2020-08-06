// @flow
let NODE_ENV /*: string */ = "development";
if (typeof process === "undefined" || process.release.name !== "node") {
  NODE_ENV = window.NODE_ENV;
}

export default {
  NODE_ENV,
};
