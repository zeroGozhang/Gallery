'use strict';
const conditional = require('koa-conditional-get');

module.exports = () => {
  return async function(ctx, next) {
    await next();
    await conditional();
    ctx.set('Cache-Control', 'max-age=5'); // 5秒内不会再去访问服务器
  };

};
