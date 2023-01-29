import React, { useState, useEffect, FC } from 'react'
import { Button } from 'antd'
import { Title, Icon } from '@bees/ui'
import { Block, Former } from '@/components'
import { SEX } from '@/constant'
import dayjs from 'dayjs'
const Fragment: FC = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])
  const [$form] = Former.useForm()
  return (
    <Block loading={loading}>
      <Title level={1} strong title='首页' icon={<Icon type='function' />}>
        <Button type='link' size='small' icon={<Icon type='more' />} />
      </Title>
      <Former
        onSubmit={(e) => {
          console.log(e)
        }}
        form={$form}
        datasource={[
          {
            label: '输入框',
            view: 'Input',
            key: 'input',
            required: true,
            viewProps: {
              onInput(e) {
                console.log(e)
              }
            }
          }
        ]}
      />
    </Block>
  )
}

export default Fragment
