import { Recordable, RespThisType } from "vite-plugin-mock";

export type responseProps = (
  this: RespThisType,
  opt: {
    url: Recordable;
    body: Recordable;
    query: Recordable;
    headers: Recordable;
  }
) => any;
