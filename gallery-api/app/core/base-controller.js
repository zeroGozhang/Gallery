'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  validateParam(rule, value) {
    try {
      this.ctx.validate(rule, value);
    } catch (err) {
      console.log(err);
      const msg = Object.assign(
        this.config.error[400],
        { detail: `Parameter [${err.errors[0].field}] ${err.errors[0].message}` });
      this.ctx.throw(400, { msg });
    }
  }

  async jkttToken() {
    const token = this.ctx.request.header.authorization;
    if (!token) {
      this.returnError(401);
    }
    const result = await this.ctx.service.tokenfactory.check(token);
    return result;
  }

  returnSuccess(result, status) {
    status = status || 200;
    this.ctx.status = status;
    this.ctx.body = {
      success: true,
      data: result,
    };
  }

  returnError(code) {
    this.ctx.helper.throwError(code);
  }

  returnMessage(code, message) {
    const msg = Object.assign(
      this.config.error[code],
      { detail: message });
    this.ctx.throw(code, { msg });
  }

  returnBusinessError(code) {
    this.ctx.helper.throwError(code, 500);
  }

  isObjectEmpty(obj) {
    let isEmpty = false;
    if (!obj || Object.keys(obj).length === 0) { // 是否为null,undefined,或者空对象
      isEmpty = true;
    }
    return isEmpty;
  }

}

module.exports = BaseController;
