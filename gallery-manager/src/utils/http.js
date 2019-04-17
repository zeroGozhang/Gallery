import axios from 'axios';
import Cookie from 'js-cookie';

let tokenData = {};
try {
  tokenData = JSON.parse(localStorage.getItem('tokenInfo')).token;
} catch (e) {
  if (window) { window.console.log(e); }
}

const httpRequest = axios.create({
  timeout: 5e3,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `bearer ${tokenData.access_token}`,
  },
});

const errRes = {
  status: 'network error',
  data: {
    message: '网络错误，请稍后再试',
  },
};

/**
 * 请求拦截
 * 添加token
 */

// httpRequest.interceptors.request.use((res) => {

//   const accessToken = Cookie.get('MemberToken');

//   // window.console.log(JSON.parse(localStorage.getItem('tokenInfo')).token.access_token);

//   debugger;

//   // const accessToken = JSON.parse(localStorage.getItem('tokenInfo')).token.access_token;

//   if (accessToken) {
//     res.headers.Authorization = `bearer ${accessToken}`;
//   }
//   return res;
// }, err => err);

httpRequest.interceptors.response.use((response) => {
  // 响应

  response.data = response.data || response.data === 0 ? response.data : true;
  return response;
}, (error) => {
  const { response = errRes } = error;

  // 请求错误

  if (response && /401/.test(response.status.toString())) {

    window.localStorage.removeItem('tokenInfo');

    Cookie.remove('MemberCookie', { path: '/', domain: 'jianke.com' });
    Cookie.remove('MemberCookieV2', { path: '/', domain: 'jianke.com' });
    Cookie.remove('MemberToken', { path: '/', domain: 'jianke.com' });

    window.location.href = `${window.location.origin}/login`;

  } else if (response && /^5/.test(response.status.toString())) {
    // window.location.href = `${window.location.origin}/error`;
  }

  const { status, data } = response;
  return { status, data };
});

export default httpRequest;
