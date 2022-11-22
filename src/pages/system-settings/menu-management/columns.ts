import { TableColumnType } from "antd";

export default [
  {
    title: "菜单名称",
    dataIndex: "menuName",
    width: "300px",
    ellipsis: true,
    align: "left",
  },
  {
    title: "url路径",
    dataIndex: "url",
    width: "200px",
    ellipsis: true,
    align: "left",
  },
  {
    title: "排序",
    dataIndex: "sort",
    width: "200px",
    ellipsis: true,
    align: "left",
  },
] as TableColumnType<any>[];
