[![Codecov Coverage](https://codecov.io/gh/alex-tavares/storybook-deeper-sort/branch/main/graph/badge.svg)](https://codecov.io/gh/alex-tavares/storybook-deeper-sort)

# Storybook Deeper Sort

Provides more flexibility and more levels of control to story sort.

> Note: This package is compatible with Storybook v7 and above. If you need compatibility with older versions of Storybook, please use deeperSort prior to v1.0.0.

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Options](#options)

## About

This package provides a function to sort stories with an API similar to the storybooks' order array but providing more than two levels of control.

Using the Storybook's built-in order array, you can have 2 levels of control:

```js
// .storybook/preview.js

export const parameters = {
  options: {
    storySort: {
      order: ["Intro", "Pages", ["Home", "Login", "Admin"], "Components"],
    },
  },
};
```

The code above would generate:

```
Intro/
├─ Welcome
Pages/
├─ Home
├─ Login
├─ Admin
Components/
├─ PackageA/
│  ├─ A
│  ├─ B
│  ├─ C
├─ PackageB/
│  ├─ A
│  ├─ B
│  ├─ C
```

To achieve deeper control over the story sort order, you can use the `deeperSort` function provided by this package.

Using `deeperSort`, the following levels of control become possible:

```js
// .storybook/preview.js

import deeperSortSetup from "storybook-deeper-sort";

deeperSortSetup([
  "Intro",
  "Pages",
  ["Home", "Login", "Admin"],
  "Components",
  ["*", ["C"]],
]);
```

Here's an example of the sort order achieved using `deeperSort`:

```
Intro/
├─ Welcome
Pages/
├─ Home
├─ Login
├─ Admin
Components/
├─ PackageA/
│  ├─ C
│  ├─ A
│  ├─ B
├─ PackageB/
│  ├─ C
│  ├─ A
│  ├─ B
```

## Installation

```bash
# npm
npm i -D storybook-deeper-sort

# yarn
yarn add -D storybook-deeper-sort
```

## Usage

1. In your `.storybook/main.js` file, import `deeperSortSetup` function and call it with the desired order array. For example:

```js
import deeperSortSetup from "storybook-deeper-sort";

deeperSortSetup([
  "Intro",
  "Pages",
  ["Home", "Login", "Admin"],
  "Components",
  ["*", ["C"]],
]);
```

2. In your `.storybook/preview.js` file, assign the `storySort` option to a function that uses `globalThis.deeperSort` for sorting the stories. For example:

```js
const preview = {
  parameters: {
    options: {
      storySort: (a, b) => globalThis.deeperSort(a, b),
    },
  },
};

export default parameters;
```

The `deeperSort` function takes into account the order array provided in `deeperSortSetup` to determine the sort order of your stories. It enables more levels of control, allowing you to specify custom sorting for different sections and even individual stories.

> Please note that due to restrictions in Storybook v7, it's not possible to define the `storySort` function externally. The use of `globalThis` allows us to access the `deeperSort` function from the `preview.js` file.

## Options

The `deeperSortSetup` function accepts an optional `config` parameter that allows you to customize its behavior.

Currently, the only available option is `docsFirst`. By default, `deeperSort` prioritizes `docs`, placing them before other story types.

To disable the prioritization of `docs`, you can set`docsFirst`to`false`:

```js
// .storybook/main.js

import deeperSortSetup from "storybook-deeper-sort";

deeperSortSetup(
  ["Pages", ["Admin", "Login", "Home"], "Components", ["*", ["C", "*"]]],
  { docsFirst: false }
);
```

By setting `{ docsFirst: false }`, `deeperSort` will sort all story types based on their order in the provided order array without giving special priority to `docs` stories.
