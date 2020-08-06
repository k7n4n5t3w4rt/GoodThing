// @flow
import { h, render } from "../web_modules/preact.js";
import Setup from "./Setup.js";
import Adhoc from "./Adhoc.js";
import LogOut from "./LogOut.js";
import Message from "./Message.js";
import Router from "../web_modules/preact-router.js";
import htm from "../web_modules/htm.js";
import { useContext } from "../web_modules/preact/hooks.js";
import { AppProvider } from "./AppContext.js";
const html = htm.bind(h);

/*::
type Props = {
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    <${Router} url="${props.url}">
      <${Counter} count="0" path="/" />
      <${Counter} count="6" path="/this/is/a/test/of/the/cache/script" />
    </${Router}>
    </${AppProvider} >
  `;
};

export default App;
