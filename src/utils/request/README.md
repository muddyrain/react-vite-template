## API

#### Request Static

| 参数      | 说明                                                          | 类型                               | 默认值                  |
| --------- | ------------------------------------------------------------- | ---------------------------------- | ----------------------- |
| maps      | Response 映射表，解析接口参数，作用全局                       | object<code, data, message>        | { code, data, message } |
| whiteList | 白名单，获取被捕获的错误，作用全局                            | array                              | []                      |
| codeList  | code 映射表，特殊 code 处理，作用全局                         | object<string, function>           | {}                      |
| Alert     | 警告提示。为 null 时不提示，但会 console.error 输出到控制台。 | null、 function({ type, content }) | null                    |

###### Alert `function`

| 参数    | 说明     | 类型                               | 默认值        |
| ------- | -------- | ---------------------------------- | ------------- |
| type    | 警告类型 | string<success, error, info, warn> | error         |
| content | 警告内容 | string                             | unknown error |

#### new Request(Params)

| 参数      | 说明                                              | 类型                        | 默认值                  |
| --------- | ------------------------------------------------- | --------------------------- | ----------------------- |
| axios     | axios 参数                                        | object                      | {}                      |
| maps      | Response 映射表，解析接口参数，作用单例           | object<code, data, message> | { code, data, message } |
| whiteList | 白名单，获取被捕获的错误，作用单例，和全局共存    | array                       | []                      |
| codeList  | code 映射表，特殊 code 处理，作用单例，和全局共存 | object<string, function>    | {}                      |

#### Request Instantiate `Http`、`NeedLogin(未实现)`、`DownLoad`

| 参数   | 说明         | 类型                                     | 默认值 |
| ------ | ------------ | ---------------------------------------- | ------ |
| method | 请求方案     | string<get, post, formdata, delete, ...> | get    |
| params | url 后缀参数 | object                                   | {}     |
| data   | body 参数    | object                                   | {}     |

## 示例

```js
import utils from '@/utils';

const Request = utils.Request;

Request.maps = { code: 'code', data: 'data', msg: 'message' };
Request.whiteList = [];
Request.codeList = {};
Request.Alert = ({ type, centent }) => alert(`【${type}】:${centent}`);

const fetch = new Request({
  baseURL: '/api',
  withCredentials: true,
  headers: { token: 'token' },
  maps: {},
  codeList: {},
  whiteList: [],
});

fetch.Http('/user/info', { method: 'get', params: {} });
fetch.DownLoad('/download/file.zip', { method: 'post', data: {} });
fetch.NeedLogin('/list', { method: 'formdata', params: {}, data: {} });
```
