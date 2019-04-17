const ToolsPlugin = {};

ToolsPlugin.install = function install(Vue) {

  Vue.prototype.$formatDate = (t) => {
    const date = new Date(parseInt(t, 10));
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    month = month > 9 ? month : `0${month}`;
    day = day > 9 ? day : `0${day}`;
    hour = hour > 9 ? hour : `0${hour}`;
    minutes = minutes > 9 ? minutes : `0${minutes}`;
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  };

  /*
   * 日期格式化
   * date: 时间, fmt: yyyy-MM-dd hh-mm-ss
   * */
  /*eslint-disable*/
  Vue.prototype.$dateFormate = (date, fmt) => {
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
  };
};

export default ToolsPlugin;
