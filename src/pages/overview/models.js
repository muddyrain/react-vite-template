import { Model } from "@bees/ui";
import baseApi from "@/api/baseApi";

export default class Models extends Model {
  // 初始 State
  initialState = {
    datalist: [],
    page: 1,
    pageSize: 10,
    total: 0,
  };

  // 获取列表
  List = async (params = {}) => {
    this.dispatch({ loading: true });
    const DATA = await baseApi.List(params);
    this.dispatch({
      datalist: DATA?.result || [],
      total: DATA?.total || 0,
      loading: false,
    });
  };
}
