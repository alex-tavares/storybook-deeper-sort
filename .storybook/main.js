import { fileURLToPath } from "node:url";
/** @type { import('@storybook/react-vite').StorybookConfig } */
import deeperSortSetup from "../src/index.js";

deeperSortSetup(
  ["Pages", ["Admin", "Login", "Home"], "Components", ["*", ["C", "*"]]],
  { docsFirst: false }
);

const docsShimPath = fileURLToPath(
  new URL(
    "../node_modules/@storybook/addon-docs/dist/mdx-react-shim.js",
    import.meta.url
  )
);

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-docs"],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    mdxPluginOptions: {
      mdxCompileOptions: {
        providerImportSource: "@mdx-js/react",
      },
    },
  },
  viteFinal: (config) => ({
    ...config,
    resolve: {
      ...(config?.resolve || {}),
      alias: {
        ...(config?.resolve?.alias || {}),
        "file://./node_modules/@storybook/addon-docs/dist/mdx-react-shim.js":
          docsShimPath,
      },
    },
    plugins: [
      ...(config?.plugins || []),
      {
        name: "storybook-mdx-shim-alias",
        enforce: "pre",
        resolveId(source) {
          if (source.includes("mdx-react-shim")) {
            // Map any MDX shim import to the actual file path so Vite/Rollup can find it.
            return docsShimPath;
          }
          return null;
        },
      },
    ],
  }),
};
export default config;
