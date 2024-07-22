// @flow
import { install } from "esinstall";

install(
  [
    "htm",
    "htm/preact",
    "immer",
    "preact",
    "preact/hooks",
    "preact-router",
    "should/as-function.js",
    "simplestyle-js",
  ],
  {
    polyfillNode: false,
  },
);
// Result: Creates `preact.js` and `preact/hooks.js` inside a `web_modules/` directory in your current directory.
