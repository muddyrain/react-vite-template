import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Block } from "./index";

export default {
  title: "a/Block",
  component: Block,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Block>;

const Template: ComponentStory<typeof Block> = (args) => <Block {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  loading: true,
};
