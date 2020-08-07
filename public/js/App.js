// @flow
import { h } from "../web_modules/preact.js";
import Counter from "./Counter.js";
import Router from "../web_modules/preact-router.js";
import htm from "../web_modules/htm.js";
import { AppProvider } from "./AppContext.js";
const html = htm.bind(h);

/*::
type Props = {
  url: string
};
*/
const App /*: function */ = (props /*: Props */) => {
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Counter} count="1" path="/" />
        <${Counter} count="6" path="/this/is/a/test/of/the/cache/script" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
