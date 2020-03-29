# &lt;dc-dashboard&gt;

&lt;dc-dashboard&gt; is a Web Component providing a dashboard and widgets based
on CSS Grid.

![Node.js CI](https://github.com/DiegoCardoso/dc-dashboard/workflows/Node.js%20CI/badge.svg)



```html
<dc-dashboard>
  ...
</dc-dashboard>
```

<img src="https://raw.githubusercontent.com/diegocardoso/dc-dashboard/master/screenshot.png" width="200" alt="Screenshot of dc-dashboard">


## Installation

Install `dc-dashboard`:

```sh
npm i dc-dashboard --save
```

Once installed, import it in your application:

```js
import 'dc-dashboard/dc-dashboard.js';
```

## Getting started

This component use the Vaadin Lumo theme by default.

To use the Material theme, import the correspondent file from the `theme/material` folder.

## Entry points

- The component with the Lumo theme:

  `theme/lumo/dc-dashboard.js`

- The component with the Material theme:

  `theme/material/dc-dashboard.js`

- Alias for `theme/lumo/dc-dashboard.js`:

  `dc-dashboard.js`


## Running demos and API docs in a browser

1. Fork the `dc-dashboard` repository and clone it locally.

1. Make sure you have [npm](https://www.npmjs.com/) installed.

1. When in the `dc-dashboard` directory, run `npm install` to install dependencies.

1. Run `npm start`, browser will automatically open the component API documentation.

## Running tests from the command line

- When in the `dc-dashboard` directory, run `npm test`

- To debug tests in the browser, run `npm run test:debug`


## Following the coding style

We are using [ESLint](http://eslint.org/) for linting TypeScript code. You can check if your code is
following our standards by running `npm run lint`, which will automatically lint all `.ts` files.

## License

Apache License 2.0

