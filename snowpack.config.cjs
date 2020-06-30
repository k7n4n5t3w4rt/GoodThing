// snowpack.config.js
// Plugin: https://github.com/ionic-team/rollup-plugin-node-polyfills
module.exports = {
  installOptions: {
    rollup: {
      plugins: [require("rollup-plugin-node-polyfills")()],
    },
  },
};
