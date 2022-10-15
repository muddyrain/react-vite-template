import getList from "./list";
import userInfo from "./userInfo";
import userLogin from "./userLogin";
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
    url: "/api/list",
    response: getList,
  },
  {
    url: "/api/test",
    response: ({}) => {
      return 1;
    },
  },
];
export default list;
