import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./Drawer";

export default {
  title: "components/Drawer(抽屉)",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
export const Basic = Template.bind({});
Basic.args = {
  children: "我是内容",
  title: "标题",
  openText: "点击打开",
  okText: "确定",
  cancelText: "取消",
};
Basic.argTypes = {
  placement: {
    options: ["top", "right", "bottom", "left"],
    control: { type: "inline-radio" },
    defaultValue: "right",
  },
};
