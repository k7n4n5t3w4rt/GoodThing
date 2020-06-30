// @flow
import { h, render } from "../web_modules/preact.js";
import { useState } from "../web_modules/preact/hooks.js";
import htm from "../web_modules/htm.js";
import {
  rawStyles,
  createStyles,
  setSeed,
} from "../web_modules/simplestyle-js.js";

// Flow
/*::
import typeof { createStyles as CreateStylesType, rawStyles as RawStylesType, setSeed as SetSeedType } from "../web_modules/simplestyle-js.js";
import typeof HtmType from "../web_modules/htm.js";
import typeof { UseStateType } from "../web_modules/preact/hooks.js";
import typeof {
  h as HType,
  render as RenderType,
} from "../web_modules/preact.js";
*/

const html /*: HtmType */ = htm.bind(h);
rawStyles({
  html: {
    height: "100%",
  },
  body: {
    height: "100%",
  },
});

setSeed(1234);

const [styles] /*: CreateStylesType */ = createStyles({
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
    lineHeight: "0.05em",
  },
  buttons: {
    fontSize: "4em",
  },
});

/*::
type Props = {
  count: typeof Number
};
*/
const Counter = (props /*: Props */) /*: HtmType */ => {
  const [count, setCount] = useState(parseInt(props.count));
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
          onClick=${(e) => setCount(count - 1)}
        >
          -
        </button>
        <button
          className="${styles.buttons}"
          onClick=${(e) => setCount(count + 1)}
        >
          +
        </button>
      </div>
    </div>
  `;
};

export default Counter;
