import http from '../utils/http';
import { captcha } from '@/config/api';

// 获取图形验证码

export async function getImageCode() {
  return http.post(captcha().image);
}

// 变更图形验证

export async function getTicket(option) {
  return http.put(`${captcha().image}/${option.id}`, option, {
    withCredentials: false,
  });
}

// 请求短信验证码

export async function getSms(params) {
  return http.post(captcha().sms, params);
}

// 校验短信验证码

export async function validatePhone(option) {
  return http.put(`${captcha().sms}`, option, {
    withCredentials: false,
  });
};
