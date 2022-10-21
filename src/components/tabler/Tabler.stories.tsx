import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Random } from "mockjs";
import Component from "./Tabler";

export default {
  title: "components/Tabler(表格)",
  component: Component,
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => (
  <Component {...args} />
);
export const Basic = Template.bind({});
Basic.args = {
  dataSource: Array.from({ length: 100 }).map((item) => ({
    name: Random.cname(),
    date: Random.date(),
    id: Random.id(),
  })),
  columns: [
    {
      title: "id",
      dataIndex: "id",
    },
    {
      title: "名字",
      dataIndex: "name",
    },
    {
      title: "日期",
      dataIndex: "date",
    },
  ],
  actions: [
    {
      content: "修改",
      key: "edit",
    },
    {
      content: "删除",
      props: {
        danger: true,
      },
      key: "delete",
    },
  ],
};
