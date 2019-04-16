'use strict';
const conditional = require('koa-conditional-get');

module.exports = () => {
  return async function(ctx, next) {
    await next();
    await conditional();
    ctx.set('Cache-Control', ctx.app.config.cacheControl);
  };

};
