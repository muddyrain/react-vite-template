import { responseProps } from "./interface";

const { Random } = require("mockjs");

export default ((req) => {
  const data = {
    code: 200,
    msg: "",
    success: true,
    data: {
      name: Random.cname(),
      age: Random.integer(0, 100),
      sex: Random.pick(["男", "女", "保密"]),
      userId: Random.id(),
      token: Random.guid(),
    },
  };
  return data;
}) as responseProps;
