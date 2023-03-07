import { FC, useEffect } from 'react'
import { Block, Tabler } from '@/components'
import Operation from './operation'
import columns from './columns'
import { useModels } from './models'
import { useNavigate } from 'react-router-dom'

const Fragment: FC = () => {
  const { del, update, add, state, getList, dispatch } = useModels({})
  const { loading, datalist, updater } = state
  useEffect(() => {
    getList()
  }, [updater])
  return (
    <Block className='flex flex-col'>
      <div>
        <Operation record={{ parentId: 0 }} onSubmit={(values, hide) => add(values, hide)} />
      </div>
      <Tabler
        className='flex-1'
        loading={loading}
        columns={columns}
        dataSource={datalist}
        key={datalist?.toString()}
        ordered={false}
        defaultExpandAllRows={true}
        expandable={{
          childrenColumnName: 'childrenList',
          indentSize: 80
        }}
        actionsWidth={120}
        rowKey='id'
        actions={[
          {
            key: 'add',
            content: (record) => (
              <Operation
                record={{ parentId: record.id }}
                parentOptions={[
                  {
                    value: record.id,
                    label: record.menuName
                  }
                ]}
                openButtonProps={{ type: 'link' }}
                onSubmit={(values, hide) => add(values, hide)}
              />
            )
          },

          {
            key: 'edit',
            content: (record) => (
              <Operation
                record={record}
                title='编辑组织'
                openText='编辑'
                openButtonProps={{ type: 'link' }}
                parentOptions={[
                  {
                    value: record.parentId || 0,
                    label: record.parentName || '顶级'
                  }
                ]}
                onSubmit={(values, hide) => update({ id: record.id, ...values }, hide)}
              />
            )
          },
          {
            key: 'delete',
            content: '删除',
            confirm: '确认删除？',
            props: { danger: true },
            onClick: ({ id }, index) => {
              del({ id })
            }
          }
        ]}
      />
    </Block>
  )
}
export default Fragment
