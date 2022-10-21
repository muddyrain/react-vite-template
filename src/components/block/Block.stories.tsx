import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./Block";

export default {
  title: "components/Block(盒子)",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
export const Basic = Template.bind({});
Basic.args = {
  loading: true,
  children: "我是内容",
  style: { padding: "50px" },
  backgroundColor: "#fff",
};
