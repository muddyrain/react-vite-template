/* ### 处理参数 ### */
const dealData = (method = 'GET', data = {}) => {
  const type = Object.prototype.toString.call(data);
  const UPMethod = method.toUpperCase();

  if (type === '[object Object]' && UPMethod === 'FORMDATA') {
    const formdata = new FormData();
    for (const key in data) {
      formdata.append([key], data[key]);
    }
    return { method: 'POST', data: formdata };
  }

  return { method, data };
};

/* ### 网络请求错误处理 ### */
const dealNetworkError = (response = {}, { codeList = {}, maps = {}, Alert = null } = {}) => {
  const type = Object.prototype.toString.call(codeList?.[response?.status]);
  if (type === '[object String]') {
    dealAlert(Alert, {
      type: 'error',
      content: codeList[response.status],
    });
  } else if (type === '[object Function]') {
    codeList[response.status]();
  } else {
    dealAlert(Alert, {
      type: 'error',
      content: response?.data?.[maps?.msg] || 'network error',
    });
  }
};

/* ### 业务请求错误处理 ### */
const dealBusinessError = (response = {}, { codeList = {}, maps = {}, Alert = null } = {}) => {
  if (!response?.code) return;
  const type = Object.prototype.toString.call(codeList?.[response?.[maps?.code]]);

  if (type === '[object String]') {
    dealAlert(Alert, {
      type: 'error',
      content: codeList[response[maps.code]],
    });
  } else if (type === '[object Function]') {
    codeList[response[maps.code]]();
  } else {
    dealAlert(Alert, {
      type: 'error',
      content: response?.[maps?.msg] || 'server error',
    });
  }
};

// 警告提示
const dealAlert = (Alert = null, ctx = {}) => {
  const type = Object.prototype.toString.call(Alert);

  if (type === '[object Function]') {
    Alert(ctx);
  } else {
    // eslint-disable-next-line no-console
    console.error(JSON.stringify(ctx));
  }
};

export { dealData, dealNetworkError, dealBusinessError, dealAlert };
