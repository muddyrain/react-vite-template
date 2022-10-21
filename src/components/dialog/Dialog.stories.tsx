import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./Dialog";

export default {
  title: "components/Dialog(弹框)",
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
const ButtonProps = {
  options: {
    primary: {
      type: "primary",
    },
    default: {
      type: "default",
    },
    danger: {
      type: "danger",
    },
    link: {
      type: "link",
    },
    disabled: {
      disabled: true,
    },
  },
  defaultValue: {
    type: "primary",
  },
  control: {
    type: "inline-radio",
  },
};
Basic.argTypes = {
  width: {
    options: ["small", "default", "medium", "large"],
    control: { type: "select" },
    defaultValue: "default",
  },
  okButtonProps: {
    ...ButtonProps,
  },
  cancelButtonProps: {
    ...ButtonProps,
    defaultValue: "default",
  },
  openButtonProps: {
    ...ButtonProps,
  },
};
