// @flow
//----------------------------------------------------------------------
// PREACT
//----------------------------------------------------------------------
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import { html } from "../web_modules/htm/preact.js";
//----------------------------------------------------------------------
// HELPERS
//----------------------------------------------------------------------
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
//----------------------------------------------------------------------
// COMPONENTS
//----------------------------------------------------------------------
import { AppContext } from "./AppContext.js";

const Counter = (props /*: {
  count?: number
} */) /*: string */ => {
  const [state, dispatch] /*: [ { count?: number}, Function ] */ = useContext(
    AppContext,
  );
  const [count, setCount] /*: [ number, Function ] */ = useState(props.count);

  useEffect(() => {
    if (typeof state.count !== "undefined") {
      setCount(state.count);
    }
  });

  return html`
    <div className="${styles.container}">
      <h1 data-cy="heading" className="${styles.heading}">
        No build step.
      </h1>
      <div>
        <h2 data-cy="number-display" className="${styles.counter}">${count}</h2>
        <button
          data-cy="minus"
          className="${styles.buttons}"
          onClick=${(e) => {
            dispatch({ type: "subtract", payload: count });
          }}
        >
          -
        </button>
        <button
          data-cy="plus"
          className="${styles.buttons}"
          onClick=${(e) => {
            dispatch({ type: "add", payload: count });
          }}
        >
          +
        </button>
      </div>
    </div>
  `;
};

export default Counter;

//----------------------------------------------------------------------
// STYLES
//----------------------------------------------------------------------
const seed /*: number */ = parseInt(
  "counter".split("").reduce(
    (acc /*: string */, letter /*: string */) /*: string */ => {
      const letterCode = letter.toLowerCase().charCodeAt(0) - 97 + 1;
      return acc + letterCode.toString();
    },
    "",
  ),
);
setSeed(seed);

rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

const [styles] = createStyles({
  container: {
    fontFamily: "sans-serif",
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  heading: {
    fontSize: "2em",
    color: "gold",
  },
  counter: {
    fontSize: "7em",
    color: "silver",
  },
  buttons: {
    fontSize: "2em",
  },
});
