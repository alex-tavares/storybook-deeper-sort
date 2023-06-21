module.exports = {
  extends: ["eslint:recommended", "prettier", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    jest: true
  }
};