import { message } from 'antd';
import Request from '@/utils/request';
import codeList from './codeList';
import whiteList from './whiteList';

Request.whiteList = whiteList;
Request.codeList = codeList;
Request.maps = { code: 'code', data: 'data', msg: 'msg' };
Request.Alert = ({ content }) => message.error(content);

const fetch = new Request({
  baseURL: '/api',
  headers: (() => {
    const accountJSON = window.sessionStorage.getItem('accountInfo');
    const accountInfo = JSON.parse(accountJSON || '{}');
    return accountInfo?.token ? { Authorization: accountInfo.token } : {};
  })(),
});

const Login = async (data = {}) => await fetch.Http('/user/login', { data }); // 登录
const getUserInfo = async (params = {}) => await fetch.Http('/user/login', { method: 'get', params }); // 登录
const List = async (params = {}) => await fetch.Http('/list', { method: 'get', params }); // 列表

export default {
  Login,
  getUserInfo,
  List,
};
