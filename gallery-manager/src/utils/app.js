import axios from 'axios';

// import { name } from '../../package.json';

/* eslint-disable */

const isServer = process.env.VUE_ENV === 'server';
const isProd = process.env.NODE_ENV === 'production';

async function getConfigs() {
  if (isProd) {
    return axios.get('/configs');
  }
  // return axios.get('http://localhost:8080/configs');
  return axios.get(`http://${window.location.hostname}:8080/configs`);
}

export default async function setClientJkenv() {
  const { data, status } = await getConfigs();
  if (/20\d/.test(status)) {
    if (isServer) {
      console.error('setClientJkenv只能在客户端调用'); // eslint-disable-line no-console
    } else if (window) {
      window.jkenv = data;
    }
  }
}
