/*eslint-disable*/

export function formatTime(time) {
  let timer = time;
  if (!(timer instanceof Date)) {
    timer = new Date(timer);
  }
  let y = '';
  let mm = '';
  let d = '';
  let h = '';
  let m = '';
  let s = '';
  y = timer.getFullYear();
  mm = (timer.getMonth() + 1) >= 10 ? (timer.getMonth() + 1) : `0${(timer.getMonth() + 1)}`;
  d = timer.getDate() >= 10 ? timer.getDate() : `0${timer.getDate()}`;
  h = timer.getHours() >= 10 ? timer.getHours() : `0${timer.getHours()}`;
  m = timer.getMinutes() >= 10 ? timer.getMinutes() : `0${timer.getMinutes()}`;
  s = timer.getSeconds() >= 10 ? timer.getSeconds() : `0${timer.getSeconds()}`;
  return `${y}-${mm}-${d} ${h}:${m}:${s}`;
}

/*
  * 日期格式化
  * date: 时间, fmt: yyyy-MM-dd hh-mm-ss
  * */
export function dateFormate(date, fmt) {
  let usedDate = new Date(date);
  let o = {
    "M+": usedDate.getMonth() + 1, //月份
    "d+": usedDate.getDate(), //日
    "h+": usedDate.getHours(), //小时
    "m+": usedDate.getMinutes(), //分
    "s+": usedDate.getSeconds(), //秒
    "q+": Math.floor((usedDate.getMonth() + 3) / 3), //季度
    "S": usedDate.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (usedDate.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
