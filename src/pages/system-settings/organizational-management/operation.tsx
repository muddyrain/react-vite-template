import { useState } from 'react'
import { Spin } from 'antd'
import Dialog from '@/components/dialog'
import Former from '@/components/former'

const Fragment = ({ record, title, openText, openButtonProps, onSubmit, parentOptions }) => {
  const [$form] = Former.useForm()
  const [loading, setLoading] = useState(false)
  return (
    <Dialog
      title={title}
      width='small'
      openText={openText}
      openButtonProps={openButtonProps}
      onOpen={() => {
        if (record) {
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
              label: '父节点',
              key: 'parentId',
              required: true,
              view: 'Select',
              viewProps: {
                disabled: true,
                options: parentOptions
              }
            },
            {
              label: '组织名称',
              key: 'organizationName',
              required: true,
              view: 'Input'
            }
          ]}
        />
      </Spin>
    </Dialog>
  )
}

Fragment.defaultProps = {
  record: {},
  title: '添加组织',
  openText: '添加',
  parentOptions: [
    {
      label: '顶级',
      value: 0
    }
  ],
  openButtonProps: { type: 'primary', style: { marginBottom: 16 } },
  onSubmit: (values = {}, hide) => {}
}

export default Fragment
