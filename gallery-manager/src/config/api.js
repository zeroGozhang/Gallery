/* eslint-disable */

window.jkenv = window.jkenv || {
// window.jkenv = {
  // JLD_API: 'http://jld-api.dev.jianke.com',
  JLD_API: 'http://127.0.0.1:7001',
  WEBGATEWAY: 'http://web-gateway.dev.jianke.com',
};

function resolveApi(configName, path = '') {
  window.jkenv['JLD_API'] = 'http://127.0.0.1:7001';
  // console.log(process.env.VUE_ENV)
  // process.jkenv['JLD_API'] = 'http://127.0.0.1:7225';
  if (process.env.VUE_ENV === 'server') {
    return `${process.jkenv[configName]}/${path}`;
  }
  return `${window.jkenv[configName]}/${path}`;
}

// 闯关测试数据
export function levelTest() {
  return {
    base: resolveApi('JLD_API', 'manager'),
    url: resolveApi('JLD_API', 'manager/breakthrough'),
    // url: resolveApi('JLD_API', 'manager/breakthrough'),
    statistics: resolveApi('JLD_API', 'manager/statistics'),
    signinStatistics: resolveApi('JLD_API', 'v/userCheckin'),
  };
}

// 会议管理
export function meetingManage() {
  return {
    base: resolveApi('JLD_API', 'manager'),
    articleUrl: resolveApi('JLD_API', 'manager/meet/articleList'),
    toBindArticle: resolveApi('JLD_API', 'manager/meet/bindArticle'),
    galleryUrl: resolveApi('JLD_API', 'manager/gallery'),
    list: resolveApi('JLD_API', 'm/gallery'),
  };
}


// 相片管理
export function photoManage() {
  return {

    list: resolveApi('JLD_API', 'm/gallery/:id/photoList'),
  };
}

export function userInfo() {
  return {
    // token: resolveApi('JLD_API', 'produce/healths/Authorization'),
    // healthsInfo: resolveApi('JLD_API', 'produce/oauth/healths'),
    // info: resolveApi('JLD_API', 'produce/healths'),
    userInfo: resolveApi('WEBGATEWAY', 'v2/member/vo'),
  };
}

export function account() {
  return {
    thirdBinder: resolveApi('WEBGATEWAY', 'v2/member/account/thirdBinder'),
    validateThirdBinder: resolveApi('WEBGATEWAY', 'v2/member/account/validate/sameThirdBinder'),
    validateRegister: resolveApi('WEBGATEWAY', 'v2/member/account/validate'),
    smsLogin: resolveApi('WEBGATEWAY', 'passport/account/smsLogin/v2'),
    login: resolveApi('WEBGATEWAY', 'passport/account/login/v2'),
    otherLogin: resolveApi('WEBGATEWAY', 'passport/account/third/oauth2/login'),
    accountInfo: resolveApi('WEBGATEWAY', 'v2/member/account'),
    validateCurrentAccount: resolveApi('WEBGATEWAY', 'v2/member/account/current'),
  };
}

// 验证码

export function captcha() {
  return {
    sms: resolveApi('WEBGATEWAY', 'captcha/sms/captchas'),
    image: resolveApi('WEBGATEWAY', 'captcha/image/captchas'),
    // image: `${apiUrl('WEBGATEWAY')}/captcha/image/captchas`,
    // sms: `${apiUrl('WEBGATEWAY')}/captcha/sms/captchas`,
  };
}
