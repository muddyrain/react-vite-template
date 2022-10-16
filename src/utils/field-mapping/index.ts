/**
 * (标签)字段映射
 * @param {list} Array
 * @param {key} String
 */
export default (list: any[] = [], key?: number | string) => {
  if (Array.isArray(list) && (key || key === 0)) {
    const record = list.find((item) => {
      const dealKey = `00${key}`.slice(-2);
      const findKey =
        (item?.value || item.value === 0) && `00${item.value}`.slice(-2);
      return findKey === dealKey;
    });
    return {
      label: record?.label,
      record,
    };
  }
  return null;
};
