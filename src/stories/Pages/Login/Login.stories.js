import Login from "./Login";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Pages/Login",
  component: Login,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const A = {
  args: {
    children: "A",
  },
};

export const B = {
  args: {
    children: "B",
  },
};

export const C = {
  args: {
    children: "C",
  },
};
