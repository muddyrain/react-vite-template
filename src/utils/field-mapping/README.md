## API

#### 入参

| 参数 | 说明   | 类型   | 默认值 |
| ---- | ------ | ------ | ------ |
| list | 源数据 | Array  | []     |
| key  | 映射键 | String | null   |

#### 出参 Object<label, record> | null(入参错误时)

| 参数   | 说明     | 类型                    | 默认值 |
| ------ | -------- | ----------------------- | ------ |
| label  | 映射结果 | String                  | -      |
| record | 映射记录 | Object<label, key, ...> | {}     |

## 示例

```js
import utils from '@/utils';

const const SEX = [
  { label: '保密', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
];

const { label, record } = utils.FieldMapping(SEX, 0);

/**
 * label -> 保密
 * record -> { label: '保密', value: 0 }
*/
```
