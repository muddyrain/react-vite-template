// axios 实例
import axios from 'axios';
import { dealNetworkError } from './handles';

export default ({ codeList = [], maps = {}, ...options } = {}, Alert = null) => {
  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => {
      if (response?.status === 200) {
        return response?.data;
      } else {
        dealNetworkError(response, { codeList, maps, Alert });
      }
    },
    (error) => {
      // if (error?.message?.includes('timeout')) throw 'Request timeout';
      dealNetworkError(error?.response || {}, { codeList, maps, Alert });
      return Promise.reject(error);
    }
  );

  return instance;
};
