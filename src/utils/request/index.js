/* eslint-disable no-console */
import { Random } from 'mockjs';
import axiosInstance from './axios-instance';
import { dealData, dealBusinessError, dealAlert } from './handles';

class Request {
  constructor(props = {}) {
    const codeList = { ...(Request?.codeList || {}), ...(props?.codeList || {}) };
    const whiteList = [...(Request?.whiteList || []), ...(props?.whiteList || [])];
    const maps = { ...(Request?.maps || {}), ...(props?.maps || {}) };

    this.fetch = axiosInstance(
      {
        ...props,
        codeList,
        whiteList,
        maps,
      },
      Request?.Alert
    );
    this.codeList = codeList;
    this.whiteList = whiteList;
    this.maps = maps;
  }

  static whiteList = [];
  static codeList = {};
  static maps = { code: 'code', data: 'data', msg: 'message' };
  static Alert = null;

  // 请求
  Http = async (url, { data = {}, params = {}, method = 'post' } = {}) => {
    const { codeList, whiteList, maps } = this;
    const isWhite = whiteList.some((item) => item.includes(url)); // 白名单

    try {
      const result = await this.fetch({
        url,
        params,
        ...dealData(method, data),
      })
        .then((response) => response)
        .catch((error) => error);

      if (isWhite) {
        return result;
      } else if (result?.[maps?.code] === 200) {
        return result?.[maps?.data] ?? {};
      } else {
        dealBusinessError(result, {
          codeList,
          maps,
          Alert: Request.Alert,
        });
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  // 下载
  DownLoad = (url, { data = {}, params = {}, method = 'get' } = {}) => {
    const { codeList, maps } = this;

    this.fetch({
      url,
      params,
      responseType: 'blob', // 返回的数据类型
      ...dealData(method, data),
    })
      .then((result) => {
        if (result?.data) {
          try {
            const content = result.data;
            const blob = new Blob([content], { type: 'application/octet-stream' });
            const fileName =
              result?.['headers']?.['content-disposition']?.split('filename=')?.[1] ||
              Random.guid();

            if ('download' in document.createElement('a')) {
              // 非IE
              const elink = document.createElement('a');
              elink.download = fileName;
              elink.style.display = 'none';
              elink.href = URL.createObjectURL(blob);
              document.body.appendChild(elink);
              elink.click();
              URL.revokeObjectURL(elink.href);
              document.body.removeChild(elink);
            } else {
              // IE10+
              navigator.msSaveBlob(blob, fileName);
            }
          } catch (err) {
            dealBusinessError(result, {
              codeList,
              maps,
              Alert: Request.Alert,
            });
          }
        }
      })
      .catch((error) => {
        dealAlert(Request.Alert, {
          type: 'error',
          content: error?.message || 'download error',
        });
      });
  };

  // 登录验证
  NeedLogin = () => {
    console.warn('登录验证，开发中...');
  };
}

export default Request;
