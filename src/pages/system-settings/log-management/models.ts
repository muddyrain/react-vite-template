import baseApi from '@/api/baseApi'
import { defaultValue, defaultValueProps, InitReducer, ModalReducer } from '@/utils/model'
import { useReducer } from 'react'

interface initialStateProps extends defaultValueProps {
  datalist?: any[]
}
export const useModels = (initialState: initialStateProps = {}) => {
  const [state, dispatch] = useReducer<ModalReducer<typeof initialState>>(InitReducer, Object.assign(defaultValue, initialState))
  const getList = async (params: any = {}) => {
    dispatch({ loading: true })
    const DATA = await baseApi.List(params)
    dispatch({
      datalist: DATA?.records || [],
      total: DATA?.total || 0,
      loading: false
    })
  }
  const add = async (values, hide) => {}
  const update = async (values, hide) => {}
  const del = async (values) => {}
  return { state, dispatch, getList, add, del, update }
}
