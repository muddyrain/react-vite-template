import { fetch } from "@/services";

const Login = async (data = {}) => await fetch.Http("/user/login", { data }); // 登录
const Logout = async (data = {}) => await fetch.Http("/user/logout", { data }); // 登录
const getUserInfo = async (params = {}) =>
  await fetch.Http("/user/info", { method: "get", params }); // 获取用户信息
const List = async (params = {}) =>
  await fetch.Http("/list", { method: "get", params }); // 列表

export default {
  Login,
  Logout,
  getUserInfo,
  List,
};
