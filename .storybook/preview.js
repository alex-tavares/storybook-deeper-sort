/** @type { import('@storybook/react').Preview } */

const preview = {
  parameters: {
    options: {
      storySort: (a, b) => globalThis.deeperSort(a, b),
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
