// import Cookies from 'js-cookie';

/*eslint-disable*/
export default {
  isLogin() {
    const accountCookie = window.localStorage.getItem('tokenInfo');
    return !!accountCookie;
  },
  objParseUrl(obj) {
    let urlStr = '';
    Object.entries(obj).forEach((item) => {
      urlStr += `${item[0]}=${item[1]}&`;
    });
    return urlStr.slice(0, urlStr.length - 1);
  },
  filterNullObj(obj) {
    let tempObj = {};
    for (let item in obj) {
      if (item && obj[item] !== null && obj[item] !== '' && obj[item] !== -1) {
        tempObj[item] = obj[item];
      }
    }

    return tempObj;
  },
  getMonthBefore(mm) {
    let resultDate, year, month, date, hms;
    const currDate = new Date();
    year = currDate.getFullYear();
    month = currDate.getMonth() + 1;
    date = currDate.getDate();
    hms = currDate.getHours() + ':' + currDate.getMinutes() + ':' + (currDate.getSeconds() < 10 ? '0' + currDate.getSeconds() : currDate.getSeconds());
    if(month <=mm ){
      month += 12 - mm;
      year--;
    } else {
      month -= mm;
    }
    month = (month < 10) ? ('0' + month) : month;
    resultDate = year + '-' + month + '-' + date + ' ' + hms;
    return resultDate;
  },
  formatDate(date, fmt) {
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
  },
  /**
   * 三方类型对应的loginType
   */
  getThirdTypeToLoginType(type) {
    const thirdTypeToLoginType = {
      1: 2,
      2: 3,
      3: 4,
      4: 5,
    };
    return thirdTypeToLoginType[type];
  },

  // 三方类型对应名称
  getThirdTypeToTxt(type) {
    const obj = {
      1: 'qq',
      2: 'weixin',
      3: 'alipay',
      4: 'weibo'
    };
    return obj[type] || '';
  },
  // 将base64的图片url数据转换为Blob
  convertBase64UrlToBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
};
