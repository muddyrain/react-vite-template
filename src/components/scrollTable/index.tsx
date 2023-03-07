import { FC, useRef } from 'react'
import { useScrollTable } from './useScrollTable'

export interface ScrollTableProps {
  data: { [key: string]: any }[]
  headHeight?: number
  rowNum?: number
  transitionDuration?: number
  duration?: number
  textColor?: '#fff'
}
const Fragment: FC<ScrollTableProps & { labels: { label: string; key: string }[] }> = ({
  labels,
  data: _data,
  headHeight = 45,
  rowNum = 5,
  transitionDuration,
  duration
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const { data } = useScrollTable({
    element: elementRef.current!,
    data: _data,
    headHeight,
    rowNum,
    transitionDuration,
    duration
  })

  return (
    <div className={`w-full h-full flex-col bg-zinc-400`}>
      <div className='head z-10 py-2 relative flex items-center bg-blue-400 text-white' style={{ height: headHeight }}>
        <span className='flex-1 mx-2 text-[1.5vh]'>序号</span>
        {labels.map((label, key) => (
          <span className='flex-1 mx-2 text-[1.5vh]' key={key}>
            {label.label}
          </span>
        ))}
      </div>
      <div className='overflow-hidden' ref={elementRef}>
        {data.map((item, index) => (
          <div key={index} className='row flex items-center text-white overflow-hidden' style={{ transition: 'all 0.3s' }}>
            <div className='flex-1 mx-2 flex-shrink-0 text-[1.5vh] truncate'>{item.$index + 1}</div>
            {labels.map((label, cIndex) => (
              <div className='flex-1 mx-2 flex-shrink-0 text-[1.5vh] truncate ' key={cIndex}>
                {typeof item.render === 'function' ? item.render(item) : item[label?.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
export default Fragment
