// const passReg = /^(?![0-9]+$)(?![a-zA-Z]+$).{8,20}$/;
const passReg = /^(?=.*[a-z])(?=.*\d).{8,20}$/i;
const emailReg = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
const phoneCodeReg = /[\d]{6}/;

// 1：字母+数字
// 2：大小写字母+数字
// 3：小写字母+数字+特殊符号、大写字母+数字+特殊符号
export function checkPassword(text) {
  if (passReg.test(text)) {
    if (/^.*[^0-9a-zA-Z].*$/.test(text)) return 3;
    if (/^.*[a-z].*$/.test(text) && /^.*[A-Z].*$/.test(text)) return 2;
    return 1;
  }
  return 0;
}

export function checkEmail(text) {
  return emailReg.test(text);
}

export function checkPhoneCode(text) {
  return phoneCodeReg.test(text);
}

export function formatDate(time, fmt) {
  const now = new Date();
  let date = new Date(time);
  if (date === 'Invalid Date') {
    date = now;
  }
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  return fmt;
}
