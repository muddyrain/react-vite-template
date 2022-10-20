import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "./index";

export default {
  title: "Dialog",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  openText: "打开",
};
