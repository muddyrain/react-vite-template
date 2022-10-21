import { ComponentMeta, ComponentStory } from "@storybook/react";
import Component from "./Former";
export default {
  title: "components/Former(表单)",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
export const Basic = Template.bind({});
Basic.args = {
  labelCol: 4,
  wrapperCol: 20,
  column: 1,
  datasource: [
    {
      label: "用户名",
      key: "username",
      required: true,
      view: "Input",
    },
    {
      label: "用户名",
      key: "password",
      required: true,
      view: "Password",
    },
    {
      label: "手机号",
      key: "phone",
      required: true,
      rules: [{ type: "mobile" }],
      view: "Input",
    },
    {
      label: "价格",
      key: "price",
      required: true,
      rules: [{ type: "amount" }],
      view: "Input",
    },
    {
      label: "日期",
      key: "date",
      required: true,
      view: "DatePicker",
    },
    {
      label: "时间",
      key: "time",
      required: true,
      view: "TimePicker",
      viewProps: {},
    },
    {
      label: "选择日期",
      key: "range_date",
      required: true,
      view: "RangePicker",
    },
    {
      label: "上传文件",
      key: "UploaderFile",
      required: true,
      view: "UploaderFile",
    },
    {
      label: "上传照片",
      key: "UploaderImage",
      required: true,
      view: "UploaderImage",
      viewProps: {
        onSubmit: (e) => {
          console.log("UploaderFile", e);
        },
      },
    },
    {
      label: "开关",
      key: "switch",
      required: true,
      view: "Switch",
      width: 40,
    },
    {
      label: "备注",
      key: "remark",
      required: true,
      view: "TextArea",
    },
  ],
};
