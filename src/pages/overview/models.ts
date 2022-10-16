import baseApi from "@/api/baseApi";
import {
  defaultValue,
  defaultValueProps,
  InitReducer,
  ModalReducer,
} from "@/utils/model";
import { useReducer } from "react";

interface initialStateProps extends defaultValueProps {
  list?: string[];
}
export const useModels = (initialState: initialStateProps = {}) => {
  const [state, dispatch] = useReducer<ModalReducer<typeof initialState>>(
    InitReducer,
    Object.assign(defaultValue, initialState)
  );

  const getList = async (params: any = {}) => {
    console.log(params);
    dispatch({ loading: true });
    const DATA = await baseApi.List(params);
    dispatch({
      datalist: DATA?.result || [],
      total: DATA?.total || 0,
      loading: false,
    });
  };
  return { state, dispatch, getList };
};
