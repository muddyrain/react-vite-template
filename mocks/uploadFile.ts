import { responseProps } from "./interface";

export default ((req) => {
  const data = {
    code: 200,
    msg: "",
    success: true,
    data: "上传成功",
  };

  return data;
}) as responseProps;
