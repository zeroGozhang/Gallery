'use strict';

// egg.js Controller
const Controller = require('egg').Controller;


// 还有我们这里使用了egg-multipart


class UploadController extends Controller {

  async index() {
    // egg-multipart 已经帮我们处理文件二进制对象
    // node.js操作文件流
    const stream = await this.ctx.getFileStream();
    const url = await this.ctx.service.upload.index(stream);
    // 文件响应
    this.ctx.body = {
      url,
    };
  }
}

module.exports = UploadController;
