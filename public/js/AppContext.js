// @flow
import conf from "./config.js";
import { h, render, createContext } from "../web_modules/preact.js";
import { useState } from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import stateStorage from "./state_storage.js";
import Router from "../web_modules/preact-router.js";
import { createHashHistory } from "../web_modules/history.js";
import { createBrowserHistory } from "../web_modules/history.js";

const html = htm.bind(h);

// A context for the state global management
const AppContext = createContext([{}, () => {}]);

/*::
type Props = {
	children: Array<function>;
};
*/
const AppProvider /*: function */ = (props /*: Props */) => {
  const [state /*: AppState */, setState /*: function */] = useState({});

  // Browser only
  if (typeof process === "undefined" || process.release.name !== "node") {
    // If this is the first reload, load the state from the stateStorage.
    if (JSON.stringify(state) === JSON.stringify({})) {
      //
      // Load data from stateStorage
      // https://developer.mozilla.org/en-US/docs/Web/API/Storage
      let sessionStateString /*: string | null | typeof undefined */ = stateStorage.getItem(
        "state",
        state.rememberme,
      );
      if (
        JSON.stringify(state) === JSON.stringify({}) &&
        (typeof sessionStateString === "undefined" ||
          sessionStateString === null)
      ) {
        // The state is, as yet, unset and there
        // was nothing in the session state, so
        // try the localStorage
        sessionStateString = stateStorage.getItem("state", true);
      }

      // To stop Flow complaining about potentially passing
      /// `null` or `typeof undefined` to JSON.parse()
      if (
        typeof sessionStateString !== "undefined" &&
        sessionStateString !== null
      ) {
        // The string coming from sessionStateStorage might
        // not be JSON.
        try {
          setState({ ...state, ...JSON.parse(sessionStateString) });
        } catch (e) {
          stateStorage.clear(state.rememberme);
        }
      }
    }

    if (JSON.stringify(state) !== JSON.stringify({})) {
      // Store the state in stateStorage on every render-loop
      stateStorage.setItem("state", JSON.stringify(state), state.rememberme);
    }
  }

  return html`
      <${AppContext.Provider} value=${[state, setState]}>
				${props.children}
      </${AppContext.Provider}>
  `;
};

export { AppContext, AppProvider };
