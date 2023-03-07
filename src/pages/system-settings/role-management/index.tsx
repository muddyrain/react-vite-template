import { FC, useEffect } from 'react'
import { Block, Tabler } from '@/components'
import Operation from './operation'
import columns from './columns'
import { useModels } from './models'
import { useNavigate } from 'react-router-dom'

const Fragment: FC = () => {
  const navigate = useNavigate()
  const { del, add, update, state, getList, dispatch } = useModels({})
  const { loading, datalist, pageNum, pageSize, total, updater } = state
  useEffect(() => {
    getList({ pageNum, pageSize })
  }, [updater, pageNum, pageSize])
  const query = (values = {}) => dispatch({ pageNum: 1, ...values })
  return (
    <Block className='flex flex-col'>
      <div>
        <Operation onSubmit={(values, hide) => add(values, hide)} />
      </div>
      <Tabler
        className='flex-1'
        loading={loading}
        columns={columns}
        dataSource={datalist}
        actionsWidth={120}
        rowKey='id'
        actions={[
          {
            key: 'detail',
            content: (record) => (
              <Operation
                openText='修改'
                openButtonProps={{ type: 'link' }}
                title='修改角色'
                record={record}
                onSubmit={(values, hide) => update(values, hide)}
              />
            ),
            onClick: () => navigate('/home')
          },
          {
            key: 'cat',
            content: '权限配置',
            onClick: ({ id }) => {
              navigate('/permission-quota?id=' + id)
            }
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
        pagination={{ current: pageNum, pageSize: pageSize, total }}
        onPageChange={({ page, size }) => query({ pageNum: page, pageSize: size })}
      />
    </Block>
  )
}
export default Fragment
