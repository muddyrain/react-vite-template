## API

#### 入参

| 参数         | 说明           | 类型     | 默认值 |
| ------------ | -------------- | -------- | ------ |
| defaultCount | 总时长(秒)     | Number   | 60     |
| millisec     | 计时时隔(毫秒) | Number   | 1000   |
| callback     | 回调           | Function | 0      |

#### callback `function`

| 参数  | 说明             | 类型   | 默认值 |
| ----- | ---------------- | ------ | ------ |
| count | 返回剩余秒数(秒) | Number | 0      |

#### 出参 Object< stop >

| 参数 | 说明           | 类型     | 默认值 |
| ---- | -------------- | -------- | ------ |
| stop | 提前终止倒计时 | Function | -      |

## 示例

```js
import utils from '@/utils';

let value = 60;

const timer = utils.Downcount(
  {
    defaultCount: 60,
    millisec: 1000,
  },
  (count) => {
    value = count;
  }
);

/**
 * value -> 60
 * value -> 59
 * value -> 58
 * value -> 56
 * ...
 */

timer.stop();
```
