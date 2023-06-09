import getList from "./list";
import userInfo from "./userInfo";
import userLogin from "./userLogin";
import userLogout from "./userLogout";
import uploadFile from "./uploadFile";
import { MockMethod } from "vite-plugin-mock";
const list: MockMethod[] = [
  {
    url: "/api/user/login",
    response: userLogin,
  },
  {
    url: "/api/user/info",
    response: userInfo,
  },
  {
    url: "/api/user/logout",
    response: userLogout,
  },
  {
    url: "/api/list",
    response: getList,
  },
  {
    url: "/api/file/uploadFile",
    response: uploadFile,
  },
];
export default list;
