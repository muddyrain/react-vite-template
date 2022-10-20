import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "./index";

export default {
  titile: "Block盒子",
  component: Dialog,
  id: "Dialog",
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Basic = Template.bind({});
