import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import Dialog from '@/components/dialog'
import Former from '@/components/former'
const Fragment = ({ record, title, openText, openButtonProps, onSubmit, organizationList, roleList: defaultRoleList, getRoleList, roleLoading }) => {
  const [$form] = Former.useForm()
  const [loading, setLoading] = useState(false)
  const [roleList, setRoleList] = useState([])
  useEffect(() => {
    setRoleList(defaultRoleList)
  }, [defaultRoleList])
  return (
    <Dialog
      title={title}
      width='small'
      openText={openText}
      openButtonProps={openButtonProps}
      onOpen={() => {
        if (record?.id) {
          // 详情
          $form.setFieldsValue(record)
        }
      }}
      onOk={(hide) => {
        const { roleName, organizationName, ...afterRecord } = record
        $form.validateFields().then((values) => onSubmit({ ...afterRecord, ...values }, hide))
        return true
      }}
      afterClose={() => $form.resetFields()}
    >
      <Spin spinning={loading}>
        <Former
          form={$form}
          column={1}
          labelCol={6}
          wrapperCol={16}
          resetText={null}
          submitText={null}
          datasource={[
            {
              label: '用户名称',
              key: 'userName',
              required: true,
              view: 'Input'
            },
            {
              label: '用户账号',
              key: 'account',
              required: true,
              view: 'Input'
            },
            {
              label: '密码',
              key: 'passWord',
              visible: !record.id,
              required: true,
              view: 'Password',
              rules: [{ type: 'password' }]
            },
            {
              label: '用户角色',
              key: 'roleId',
              required: true,
              view: 'SelectSearch',
              viewProps: {
                getData: () => {},
                searchKey: 'roleName',
                fieldNames: {
                  label: 'roleName',
                  value: 'id'
                }
              }
            },
            {
              label: '用户组织',
              key: 'organizationId',
              required: true,
              view: 'TreeSelect',
              viewProps: {
                treeData: organizationList,
                fieldNames: {
                  label: 'organizationName',
                  children: 'childrenList',
                  value: 'id'
                }
              }
            },
            {
              label: '手机号',
              key: 'phone',
              required: true,
              view: 'Input',
              rules: [{ type: 'mobile' }]
            }
          ]}
        />
      </Spin>
    </Dialog>
  )
}

Fragment.defaultProps = {
  record: {},
  title: '添加用户',
  openText: '添加',
  openButtonProps: { type: 'primary', style: { marginBottom: 16 } },
  onSubmit: (values = {}, hide) => {},
  getRoleList: () => {},
  organizationList: [],
  roleList: [],
  roleLoading: false
}

export default Fragment
