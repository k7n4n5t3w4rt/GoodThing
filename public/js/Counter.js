// @flow
import { h, render } from "../web_modules/preact.js";
import {
  useContext,
  useEffect,
  useState,
} from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";
import { AppContext } from "./AppContext.js";

const html = htm.bind(h);
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

/*::
type Props = {
  count: number | typeof undefined
};
*/
const Counter = (props /*: Props */) => {
  const [state /*: AppState */, setState] = useContext(AppContext);
  const [count /*: number */, setCount] = useState(props.count);

  useEffect(() => {
    if (typeof state.count !== "undefined") {
      setCount(state.count);
    }
  });

  // console.log(props.count.isInteger());
  return html`
    <div className="${styles.container}">
      <h1 className="${styles.heading}">
        No script tags.<br />
        No build step.
      </h1>
      <div>
        <h2 className="${styles.counter}">${count}</h2>
        <button
          className="${styles.buttons}"
          onClick=${(e) => {
            let count = state.count || 1;
            count--;
            setState({ ...state, ...{ count } });
          }}
        >
          -
        </button>
        <button
          className="${styles.buttons}"
          onClick=${(e) => {
            let count = state.count || 1;
            count++;
            setState({ ...state, ...{ count } });
          }}
        >
          +
        </button>
      </div>
    </div>
  `;
};

export default Counter;
