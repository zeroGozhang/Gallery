'use strict';

const Service = require('egg').Service;
class BaseService extends Service {

  async request(method, params, url) {
    const { ctx } = this;
    try {
      const result = await ctx.curl(url, {
        method,
        data: params,
        dataType: 'json',
        contentType: 'json',
      });
      // 在此处处理api返回的result，返回给controller，在controller中处理成客户端需要的数据和格式
      return result;
    } catch (err) {
      this.ctx.helper.throwError(502);
    }
  }

  isObjectEmpty(obj) {
    let isEmpty = false;
    if (!obj || Object.keys(obj).length === 0) { // 是否为null,undefined,或者空对象
      isEmpty = true;
    }
    return isEmpty;
  }
}

module.exports = BaseService;
