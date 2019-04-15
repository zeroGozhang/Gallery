'use strict';

const Controller = require('../../core/base-controller');

// 相册相关
class GalleryController extends Controller {

  async index() {
    const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    const size = this.ctx.query.size ? parseInt(this.ctx.query.size) : 20;
    const result = await this.ctx.service.gallery.list(page, size);
    this.returnSuccess(result);
  }

  async photoList() {
    const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    const size = this.ctx.query.size ? parseInt(this.ctx.query.size) : 20;
    const galleryId = this.ctx.params.id;
    const result = await this.ctx.service.gallery.photoList(galleryId, page, size);
    this.ctx.body = { result };
  }
}

module.exports = GalleryController;
