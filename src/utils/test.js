import moment from 'moment';

// 时间格式化
const FormatTime = (date = undefined, format = 'YYYY-MM-DD') => {
  if (date) {
    if (/^[0-9]{10,13}$/.test(date)) {
      return moment(Number.parseInt(date)).format(format);
    } else if (moment(date).format(format) === 'Invalid date') {
      console.error('date 参数不合法');
      return '-';
    } else {
      return moment(date).format(format);
    }
  } else {
    return '-';
  }
};

export default { FormatTime };
