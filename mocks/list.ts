import { MockMethod, Recordable, RespThisType } from "vite-plugin-mock";
import { responseProps } from "./interface";

const { Random } = require("mockjs");

const total = Random.integer(0, 999);

export default ((req) => {
  const { page, pageSize } = req.query;
  const data = {
    code: 200,
    msg: "",
    success: true,
    data: {
      result: [...new Array(Number(pageSize || 10))].map(() => ({
        id: Random.id(),
        name: Random.cname(),
        sex: Random.pick([0, 1, 2]),
        age: Random.integer(0, 99),
      })),
      page: Number(page || 1),
      pageSize: Number(pageSize || 10),
      total,
    },
  };
  return data;
}) as responseProps;
