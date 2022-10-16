import { responseProps } from "./interface";

export default ((req) => {
  const data = {
    code: 200,
    msg: "",
    success: true,
    data: "退出成功",
  };

  return data;
}) as responseProps;
