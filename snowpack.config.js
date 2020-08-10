// snowpack.config.js
// Plugin: https://github.com/ionic-team/rollup-plugin-node-polyfills
module.exports = {
  extends: "@snowpack/app-scripts-preact",
  scripts: {},
  plugins: [],
  exclude: ["**/*"],
  install: [
    "htm",
    "immer",
    "preact",
    "preact/hooks",
    "preact-render-to-string",
    "preact-router",
    "should/as-function.js",
    "simplestyle-js",
  ],
  installOptions: {
    rollup: {
      plugins: [require("rollup-plugin-node-polyfills")()],
    },
  },
};
