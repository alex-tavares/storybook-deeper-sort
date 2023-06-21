/** @type { import('@storybook/react-vite').StorybookConfig } */
import deeperSortSetup from "../src/index";

deeperSortSetup([
  "Pages",
  ["Admin", "Login", "Home"],
  "Components",
  ["*", ["C", "*"]],
]);

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
