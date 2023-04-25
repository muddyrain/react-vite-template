import { TableColumnType } from 'antd'

export default [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: '200px',
    ellipsis: true
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '200px',
    ellipsis: true
  }
] as TableColumnType<object>[]
