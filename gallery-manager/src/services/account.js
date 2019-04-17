import qs from 'qs';
import http from '@/utils/http';
import { account, userInfo } from '@/config/api';

export async function getAccountInfo() {
  const { data } = await http.get(account().accountInfo);
  return data;
}

// 获取账号信息

export async function getHealthsInfo(page, size) {
  const { data } = await http.get(userInfo().healthsInfo, {
    params: {
      page,
      size,
    },
  });
  return data;
}

// 提交账号信息

export async function postHealthsInfo(opt) {
  const rs = await http.post(userInfo().info, opt);
  return rs;
}

// 头像和昵称

export async function getUserInfo() {
  return await http.get(userInfo().userInfo);
}

export async function getThirdBinder() {
  const { data } = await http.get(userInfo().thirdBinder);
  return data;
}

// 校验是否是当前账号

export async function validateCurrentAccount(params) {
  return http.post(account().validateCurrentAccount, params);
}

// 校验账号是否已注册

export async function validateRegister(params) {
  return http.post(account().validateRegister, params);
}

// 校验账号是否关联三方

export async function validateBindOther(params) {
  return http.post(account().validateThirdBinder, params);
}

// sms登录

export async function smsLogin(params) {
  http.defaults.headers.organizationCode = 'jianke';
  return http.post(account().smsLogin, params);
}

// 账号登录

export async function accountLogin(params) {
  return http.post(account().login, params);
}

// 三方登录

export async function ohterLogin({
  backUrl,
  origin,
  thirdType,
  platform,
  appName,
}) {
  const params = {
    backUrl: backUrl || `${window.location.origin}/user`,
    origin,
    thirdType,
    platform,
    appName,
  };
  window.location.href = `${account().otherLogin}?${qs.stringify(params)}`;
}

// 三方注册
// async ohterRegistrey(option) {
//   const { data } = await http.put(`${api.user.binderRegistry}`, option);
//   return data;
// },

// 三方解绑

export async function ohterUnBind(token, type) {
  http.defaults.headers.Authorization = `Bearer ${token}`;
  return http.delete(`${account().thirdBinder}`, { params: type });
}

