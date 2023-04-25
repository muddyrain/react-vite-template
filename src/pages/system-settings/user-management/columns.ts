import { TableColumnType } from 'antd'

export default [
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: '150px',
    ellipsis: true
  },
  {
    title: '用户账号',
    dataIndex: 'account',
    width: '150px',
    ellipsis: true
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    width: '200px',
    ellipsis: true
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: '150px',
    ellipsis: true
  },
  {
    title: '职务',
    dataIndex: 'position',
    width: '200px',
    ellipsis: true
  },
  {
    title: '警号',
    dataIndex: 'warningSignal',
    width: '200px',
    ellipsis: true
  },
  {
    title: '组织名称',
    dataIndex: 'organizationName',
    width: '200px',
    ellipsis: true
  }
] as TableColumnType<object>[]
