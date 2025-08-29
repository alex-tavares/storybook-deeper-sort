[![Codecov Coverage](https://codecov.io/gh/alex-tavares/storybook-deeper-sort/branch/main/graph/badge.svg)](https://codecov.io/gh/alex-tavares/storybook-deeper-sort)

![npm](https://img.shields.io/npm/dm/storybook-deeper-sort)

# Storybook Deeper Sort

Fine-grained control of Storybook's story navigation.

Storybook's built-in `options.storySort.order` stops at two levels of nesting.
`storybook-deeper-sort` lets you keep nesting arrays and even use wildcards, so
large libraries can maintain a predictable, hand-crafted order.

> Requires Storybook v7+. For Storybook v6 support install
> `storybook-deeper-sort@0.x`.

## Table of Contents

- [Why](#why)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Options](#options)
- [License](#license)

## Why

Storybook's native order array provides only two levels of control:

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

The example above renders the following tree:

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

## Installation

```bash
# npm
npm install --save-dev storybook-deeper-sort

# yarn
yarn add --dev storybook-deeper-sort
```

## Quick start

1. Register your desired order in `.storybook/main.js`.

```js
// .storybook/main.js
import deeperSortSetup from "storybook-deeper-sort";

deeperSortSetup([
  "Intro",
  "Pages",
  ["Home", "Login", "Admin"],
  "Components",
  ["*", ["C"]],
]);
```

2. Use the generated sort function in `.storybook/preview.js`.

```js
// .storybook/preview.js
const preview = {
  parameters: {
    options: {
      storySort: (a, b) => globalThis.deeperSort(a, b),
    },
  },
};

export default preview;
```

This setup produces the following ordering:

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

> Storybook v7 limits `storySort` to inline functions; exposing the function on
> `globalThis` allows us to reuse the configuration defined in `main.js`.

## Options

`deeperSortSetup(orderArray, config)` accepts an optional `config` object.

### `docsFirst` (default: `true`)

Docs stories are listed before other story types. Disable this behaviour:

```js
deeperSortSetup(
  ["Pages", ["Admin", "Login", "Home"], "Components", ["*", ["C", "*"]]],
  { docsFirst: false }
);
```

With `{ docsFirst: false }` all stories are sorted solely by the provided
`orderArray` without prioritising docs.

## License

MIT

