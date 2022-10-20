import { ComponentMeta, ComponentStory } from "@storybook/react";
import Dialog from "./index";

export default {
  titile: "Block盒子",
  component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

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
// Basic.argTypes = {
//   width: {
//     options: ["small", "default", "medium", "large"],
//     control: { type: "select" },
//     description: "设置弹框的盒子宽度",
//     defaultValue: "default",
//   },
//   onOk: {
//     description: `(hide:() => void) => false <br />参数: hide:Function类型(手动关闭弹框) <br /> 返回值: boolean类型(是否自动关闭)`,
//   },
//   openText: {
//     description: "打开按钮文字",
//   },
//   okText: {
//     description: "确定显示文字",
//   },
//   cancelText: {
//     description: "取消显示文字",
//   },
//   onOpen: {
//     description: `() => void <br />打开之前做的一些操作`,
//   },
//   onCancel: {
//     description: `() => void <br />关闭之后做的一些操作`,
//   },
//   afterClose: {
//     description: `() => void <br />关闭之前做的一些操作`,
//   },
//   footer: {},
//   okButtonProps: {
//     description: "确认按钮选项 - button类型",
//     ...ButtonProps,
//   },
//   cancelButtonProps: {
//     description: "取消按钮选项 - button类型",
//     ...ButtonProps,
//     defaultValue: "default",
//   },
//   openButtonProps: {
//     description: "打开按钮选项 - button类型",
//     ...ButtonProps,
//   },
// };
