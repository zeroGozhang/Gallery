'use strict';

const Controller = require('egg').Controller;

class GalleryController extends Controller {
  async index() {
    const result = await this.ctx.service.gallery.list();
    this.ctx.body = { result };
  }
}

module.exports = GalleryController;
