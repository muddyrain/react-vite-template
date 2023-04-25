import { useTimeout } from 'ahooks'
import { useEffect, useState } from 'react'
import { ScrollTableProps } from '.'
let timer
let transtionTimer
let currentIndex = 0
interface TypeProps extends ScrollTableProps {
  element: HTMLElement
}
export const useScrollTable = ({ element, headHeight = 45, rowNum = 5, transitionDuration = 300, duration = 2000, data = [] }: TypeProps) => {
  const [tableData, setTableData] = useState<any[]>([])
  useEffect(() => {
    if (!element) return
    const rowHeight = element.clientHeight / rowNum
    for (const [index, item] of [...element.children].entries()) {
      const nItme = item as HTMLDivElement
      nItme.style.height = rowHeight + 'px'
      nItme.style.lineHeight = rowHeight + 'px'
    }
    transtionTimer = setTimeout(() => {
      if (!element) return
      const firstElement = element.firstChild
      if (!firstElement) return
      ;(firstElement as HTMLDivElement).style.height = 0 + 'px'
      ;(firstElement as HTMLDivElement).style.lineHeight = 0 + 'px'
      timer = setTimeout(() => {
        if (element.firstChild) {
          element.removeChild(element.firstChild!)
        }
        if (currentIndex > data.length - 1) {
          currentIndex = 0
        }
        setTableData([...tableData, { ...data[currentIndex], $index: currentIndex }])
        currentIndex += 1
      }, duration)
    }, transitionDuration)
  }, [tableData])
  const handleScroll = async () => {
    currentIndex = rowNum + 1
    setTableData(data.slice(0, currentIndex).map((item, index) => ({ ...item, $index: index })))
  }
  const loadTableElement = () => {
    element.style.height = `calc(100% - ${headHeight}px)`
    handleScroll()
  }
  useEffect(() => {
    element && loadTableElement()
  }, [element])
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer)
      if (transtionTimer) clearTimeout(transtionTimer)
      currentIndex = -1
      if (element) {
        element.innerHTML = ''
      }
    }
  }, [])
  return {
    data: tableData
  }
}
