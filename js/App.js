// @flow
import { h, render } from "../web_modules/preact.js";
import htm from "../web_modules/htm.js";
import Counter from "./Counter.js";
import Router from "../web_modules/preact-router.js";
import { createHashHistory } from "../web_modules/history.js";
import { createBrowserHistory } from "../web_modules/history.js";

// Flow
/*::
import typeof { createHashHistory as CreateHashHistoryType } from '../web_modules/history.js';
import typeof { createBrowserHistory as CreateBrowserHistoryType } from '../web_modules/history.js';
import typeof { createStyles as CreateStylesType } from "../web_modules/simplestyle-js.js";
import typeof RouterType from "../web_modules/preact-router.js";
import typeof HtmType from "../web_modules/htm.js";
import typeof CounterType from "./Counter.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
*/

const html /*: HtmType */ = htm.bind(h);

/*::
type Props = {
  url?: string
};
*/
const App /*: function */ = (props /*: Props */) /*: HtmType */ => {
  return html`
    <${Router} url="${props.url}">
      <${Counter} count="0" path="/" />
      <${Counter} count="6" path="/this/is/a/test/of/the/cache/script" />
    </${Router}>
  `;
};

export default App;
