# GoodThing

A simple Preact static website boilerplate.

  - No compiling
  - Global, Redux-like state store with `useReducer` and `Context`
  - Cypress for UI testing

## Getting Started

[1] Clone the repo

```
git clone git@github.com:k7n4n5t3w4rt/goodthing.git mysite
```

[2] Remove `/.git`

```
cd mysite && rm -rf .git
```

[3] Install NodeJS modules

```
npm i
```

[4] Update the ES modules in the `/web_modules` directory

```
npm run esinstall
```

[5] Preview your site dynamically at <http://localhost:3000> during development

```
npm start
```

[6] Test


Start the server:

```
npm start
````

Then:

```
npm run test
```

NOTE: Install Cypress with:

```
npx cypress install
```

## `htm` - "JSX-like syntax in plain JavaScript - no transpiler necessary"

```
import htm from '../web_modules/htm.js'
```

## To Do

  1. The "Testy" test runner needs an "only" option
