/**
 * 获取 URL 参数
 * @param {String | Array} names `接收一个或一组键名，返回一个值或一组键值队`
 * 用法: $GetUrlParams('name' | ['name', 'age'])
 */
export default (names?: string[] | string, url?: string): string | { [key: string]: string } | undefined => {
  if (!names) throw 'names 字段未定义'
  const type = Object.prototype.toString.call(names)
  const search = url || window.location.search.substring(1) || window.location.hash.split('?')[1] || ''
  const searchArray = search.split('&')
  // 字符串
  if (type === '[object String]') {
    for (const index in searchArray) {
      const pair = searchArray[index].split('=')
      if (pair[0] === names) return pair[1]
    }
    return undefined
  }
  // 数组
  if (type === '[object Array]') {
    if (!names.length) throw 'names 数组段为空'
    const params = {}
    ;(names as string[]).forEach((key) => {
      for (const index in searchArray) {
        const pair = searchArray[index].split('=')
        if (pair[0] === key) {
          params[key] = pair[1]
        }
      }
    })
    return params
  }
  throw 'names 参数不合法'
}
