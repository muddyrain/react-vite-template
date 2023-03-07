import { FC, useEffect, useState } from 'react'
import { Block, ScrollTable } from '@/components'
import mockjs from 'mockjs'
import { Button } from 'antd'

const Fragment: FC = () => {
  const [labels, setLabels] = useState<
    {
      label: string
      key: string
    }[]
  >([])
  const [data, setData] = useState<any[]>([])
  useEffect(() => {
    let labels = Array.from({ length: 4 }).map((item) => ({
      label: '名称',
      key: 'name'
    }))
    let data = Array.from({ length: 20 }).map((item) => ({
      name: mockjs.Random.cname(),
      render(item) {
        return <Button type='primary'>{item.name}</Button>
      }
    }))
    setLabels(labels)
    setData(data)
  }, [])
  return (
    <Block>
      <div className='h-[320px] flex flex-col'>
        <ScrollTable duration={2000} labels={labels} data={data} />
      </div>
    </Block>
  )
}
export default Fragment
