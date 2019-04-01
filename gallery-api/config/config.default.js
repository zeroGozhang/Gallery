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

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
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
