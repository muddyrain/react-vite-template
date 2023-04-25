import { FC, useEffect, useState } from 'react'
import { Select, SelectProps } from 'antd'

export interface SelectSearchProps {
  fieldNames?: SelectProps['fieldNames']
  getData: (params: any) => any
  onSuccess: () => any
  searchKey: string
}
const SelectSearch: FC<SelectSearchProps> = ({ fieldNames, getData, searchKey = 'name', onSuccess, ...afterParams }) => {
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState([])
  useEffect(() => {
    if (options.length) {
      onSuccess?.()
    }
  }, [options])
  const getList = async (params = {}) => {
    setLoading(true)
    const DATA = await getData({
      pageNum: 1,
      pageSize: 10,
      ...params
    })
    setOptions(DATA?.records || [])
    setLoading(false)
    return DATA?.records || []
  }
  useEffect(() => {
    getList()
  }, [])
  const props = {
    options,
    showSearch: true,
    defaultActiveFirstOption: false,
    filterOption: false,
    loading: loading,
    onSearch: (newValue: string) => {
      if (newValue) {
        getList({ [searchKey]: newValue })
      } else {
        getList({ [searchKey]: '' })
      }
    }
  }
  return <Select {...afterParams} {...props} fieldNames={fieldNames} />
}
export default SelectSearch
