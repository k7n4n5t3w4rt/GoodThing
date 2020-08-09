# GoodThing

Preact static website generator boilerplate.

  - No WebPack
  - No compiling during development
  - Global, Redux-like state store with `useReducer` and `Context`
  - Cypress

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

[4] Update the ES modules with [Snowpack](https://www.snowpack.dev/)

```
npm run snowpack
```

NOTE: Currently you need to remove this line from `package.json` before running `npm run snowpack` - and then restore the line to `package.json`.

```
"type": "module"
```

[5] Preview your site dynamically at <http://localhost:4000> during development

```
npm start
```

NOTE: Ctrl+C will stop the NodeJS server.

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

[7] Code (or don't if you're just trying it out)

```
...
```

[8] Generate your static site in the `/public` folder for GitHub pages, S3, etc.

```
npm run generate
```

[9] Test it locally on port :3000 with Browsersync

```
npm run browsersync
```

[10] `git init` etc. and push your code up to GitHub or somewhere with great, free hosting for static sites.

For [GitHub Pages](https://pages.github.com/), duplicate the `public` directory as `docs`:

```
npm run github-pages
```

[11] Clean up your static files

```
npm run ungenerate
```

[12] Local cache

You can keep the static files updated as you access the different routes during development. This is a bit like a cache. Just change the setting in `/server/static_config.js` to something like 10 seconds

```
...
export const cacheTtl /*: number */ = 10; // Seconds
...
```

## Preact w/ ES Modules

I'm using Preact because it already has ES modules and [Snowpack](https://www.snowpack.dev/) to copy them up to the `/web_modules` directory for accessibility from the front end.

```
  "scripts": {

	...

    "snowpack": "snowpack install",

	...

  },

  ...

```

Importing them in the client component scripts from `/web_modules`:


```
import { h, render } from '../web_modules/preact.js'
import { useState } from '../web_modules/preact/hooks.js'
```

## `htm` - "JSX-like syntax in plain JavaScript - no transpiler necessary"

```
import htm from '../web_modules/htm.js'
```

## To Do

  1. A production build with Snowpack2
  2. The "Testy" test runner needs an "only" option
