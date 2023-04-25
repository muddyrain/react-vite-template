import { message } from 'antd'
import Request from '@/utils/request'
import codeList from './codeList'
import whiteList from './whiteList'
import { REQUEST_URL } from '@/constant'

Request.whiteList = whiteList
Request.codeList = codeList
Request.maps = { code: 'code', data: 'data', msg: 'msg' }
Request.Alert = ({ content }) => message.error(content)

export const fetch = new Request({
  baseURL: REQUEST_URL,
  headers: (() => {
    const accountJSON = window.sessionStorage.getItem('accountInfo')
    const accountInfo = JSON.parse(accountJSON || '{}')
    return accountInfo?.token ? { Authorization: accountInfo.token } : {}
  })()
})
