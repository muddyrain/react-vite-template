import { ComponentMeta, ComponentStory } from "@storybook/react";
import Block from "./index";

export default {
  title: "components/Block",
  component: Block,
} as ComponentMeta<typeof Block>;

const Template: ComponentStory<typeof Block> = (args) => <Block {...args} />;
export const Basic = Template.bind({});
Basic.args = {
  loading: true,
  children: "我是内容",
  style: { padding: "50px" },
  backgroundColor: "#fff",
};
