[![Codecov Coverage](https://codecov.io/gh/alex-tavares/storybook-deeper-sort/branch/main/graph/badge.svg)](https://codecov.io/gh/alex-tavares/storybook-deeper-sort)

# Storybook Deeper Sort

Provides more flexibility and more levels of control to story sort.

## Table of Contents

- [About](#about)
- [Commands](#commands)
  - [build](#build)
  - [test](#test)
  - [lint](#lint)

## About

This package provides a function to sort stories with an API similar to the storybooks' order array but providing more than two levels of control.

Using the built-in order array, you can have 2 levels of control:
```js
// .storybook/preview.js

export const parameters = {
  options: {
    storySort: {
      order: ['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
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

But what if I want all packages under **Components** to have **C** as their first story? You can achieve that using `deeperSort`:

```js
// .storybook/preview.js

import deeperSort from 'storybook-deeper-sort';

export const parameters = {
  options: {
    storySort: deeperSort(['Intro', 'Pages', ['Home', 'Login', 'Admin'], 'Components', ["*", ["C"]]]),
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
│  ├─ C
│  ├─ A
│  ├─ B
├─ PackageB/
│  ├─ C
│  ├─ A
│  ├─ B
```
## Commands

### test

```bash
# run tests
yarn test
```

### lint

```bash
# run linting
yarn lint
```
