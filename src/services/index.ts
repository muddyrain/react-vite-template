import { message } from "antd";
import Request from "@/utils/request";
import codeList from "./codeList";
import whiteList from "./whiteList";

Request.whiteList = whiteList;
Request.codeList = codeList;
Request.maps = { code: "code", data: "data", msg: "msg" };
Request.Alert = ({ content }) => message.error(content);

export const fetch = new Request({
  baseURL: "/api",
  headers: (() => {
    const accountJSON = window.sessionStorage.getItem("accountInfo");
    const accountInfo = JSON.parse(accountJSON || "{}");
    return accountInfo?.token ? { Authorization: accountInfo.token } : {};
  })(),
});
