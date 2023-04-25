/**
 * 数据递归处理
 * @param {Array} datasource 数据原
 * @param {Object | Function} maps 数据映射关系
 * @param {String} label 键
 * @param {String} value 值
 * @param {String} children 子集
 */
const GecursiveProcess = (datasource = [], maps = {}) => {
  const type = Object.prototype.toString.call(maps)

  if (type === '[object Function]') {
    return datasource.map((item) => {
      const { values, key } = maps(item)
      if (Array.isArray(item[key])) {
        return {
          ...values,
          children: GecursiveProcess(item[key], maps)
        }
      } else {
        return { ...values }
      }
    })
  } else {
    let { label, value, children } = maps
    label = label || 'label'
    value = value || 'value'
    children = children || 'children'

    return datasource.map((item) => {
      if (Array.isArray(item[children])) {
        return {
          ...item,
          label: item[label],
          value: item[value],
          children: GecursiveProcess(item[children], maps)
        }
      } else {
        return {
          ...item,
          label: item[label],
          value: item[value]
        }
      }
    })
  }
}

export default GecursiveProcess
