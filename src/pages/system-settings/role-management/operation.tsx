import { useState } from 'react'
import { Spin } from 'antd'
import Dialog from '@/components/dialog'
import Former from '@/components/former'

const Fragment = ({ record, title, openText, openButtonProps, onSubmit }) => {
  const [$form] = Former.useForm()
  const [loading, setLoading] = useState(false)

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
        $form.validateFields().then((values) => onSubmit({ ...record, ...values }, hide))
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
              label: '角色名称',
              key: 'roleName',
              required: true,
              view: 'Input'
            },
            {
              label: '备注',
              key: 'remark',
              view: 'TextArea'
            }
          ]}
        />
      </Spin>
    </Dialog>
  )
}

Fragment.defaultProps = {
  record: {},
  title: '添加角色',
  openText: '添加',
  openButtonProps: { type: 'primary', style: { marginBottom: 16 } },
  onSubmit: (values = {}, hide) => {}
}

export default Fragment
