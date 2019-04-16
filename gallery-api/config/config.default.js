/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123';
  config.gzip = {
    threshold: 1024, // 小于 1k 的响应体不压缩
  };
  // add your middleware config here
  config.middleware = [ 'errorHandler', 'gzip' ];
  config.error = {
    400: { code: 400, message: 'Invalid Param', detail: '' },
    401: { code: 401, message: 'Unauthorized', detail: '' },
    403: { code: 403, message: 'Forbidden', detail: '' },
    404: { code: 404, message: 'Not Found', detail: '' },
    500: { code: 500, message: 'Internal Server Error', detail: '' },
    502: { code: 502, message: 'Remote Error', detail: '' },
    10000: { code: 10000, message: '更新失败', detail: '' },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {
    domainWhiteList: [
    ],
    csrf: {
      enable: false,
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.cors = {
    origin: '*',
  };
  // mysql config
  config.mysql = {
    client: {
      // host: '172.17.250.112',
      // port: '3306',
      // user: 'ad_admin',
      // password: 'jianke@123',
      // database: 'info_ad',
      host: '45.62.108.63',
      port: '3306',
      user: 'gallery',
      password: 'gallery123456',
      database: 'gallery',
    },
    app: true,
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
