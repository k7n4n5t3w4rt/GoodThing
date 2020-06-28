module.exports = {
  // The only relevant change there from v1->v2 is that it now scans your source code for import statements to automatically detect which packages to install (this existed in v1 as well, but its now the default. to disable, set exclude: ["**/*"] in your config. ~ https://www.pika.dev/npm/snowpack/discuss/383#comment-7552
  exclude: ['**/*'],
  install: [
    'history',
    'htm',
    'preact',
    'preact/hooks',
    'preact-render-to-string',
    'preact-router',
    'should/as-function.js',
    'simplestyle-js',
  ],
  // Some packages are written with dependencies on Node.js built-in modules. This is a problem on the web, since Node.js built-in modules don’t exist in the browser... To solve this issue: you can... add Node.js polyfill support: ~ https://www.snowpack.dev/#node-built-in-could-not-be-resolved
  installOptions: {
    rollup: {
      plugins: [require('rollup-plugin-node-polyfills')()],
    },
  },
  extends: '@snowpack/app-scripts-preact',
  scripts: {},
  plugins: [],
};
