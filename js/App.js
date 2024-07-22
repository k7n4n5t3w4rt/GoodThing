// @flow
//----------------------------------------------------------------------
// PREACT
//----------------------------------------------------------------------
import { h } from "../web_modules/preact.js";
import Router from "../web_modules/preact-router.js";
import { html } from "../web_modules/htm/preact.js";
//----------------------------------------------------------------------
// COMPONENTS
//----------------------------------------------------------------------
import { AppProvider } from "./AppContext.js";
import Counter from "./Counter.js";

const App /*: Function */ = (props /*: {
  url: string
} */) => {
  return html`
    <${AppProvider} >
      <${Router} url="${props.url}">
        <${Counter} count="1" path="/" />
      </${Router}>
    </${AppProvider} >
  `;
};

export default App;
