/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/**
 * 倒计时
 * @param {defaultCount} Number
 * @param {millisec} Number
 * @param {callback} Function return count
 */
export default (
  { defaultCount = 60, millisec = 1000 } = {},
  callback = (count = 0) => {}
) => {
  let stop = false;
  const timer = (count) => {
    if (count && !stop) {
      const _count = count - 1;
      setTimeout(() => {
        timer(_count);
      }, millisec);
      callback(_count);
    } else {
      callback(0);
    }
  };
  timer(defaultCount);
  return {
    stop: () => (stop = true),
  };
};
