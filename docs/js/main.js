// @flow
import { h, hydrate, render } from "../web_modules/preact.js";
import App from "./App.js";
import htm from "../web_modules/htm.js";

// Flow
/*::
import typeof HtmType from "../web_modules/htm.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
import typeof AppType from "./App.js";
*/

const html = htm.bind(h);

// NOTE: `hydrate()` doesn't work with `simplestyle-js` - the
// class names don't match when the page is hydrated
hydrate(html` <${App} /> `, document.getElementById("goodthing"));
