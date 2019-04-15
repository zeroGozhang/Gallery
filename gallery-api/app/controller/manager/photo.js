'use strict';

const Controller = require('../../core/base-controller');

// 相册管理后台相关
class PhotoController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.createRule = {
      name: { type: 'string', required: true },
      description: { type: 'string', required: false },
      cover: { type: 'string', required: true },
    };
  }

  async index() {
    const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    const size = this.ctx.query.size ? parseInt(this.ctx.query.size) : 20;
    const result = await this.ctx.service.gallery.list(page, size);
    this.ctx.status = 200;
    this.ctx.body = { result };
  }

  async photoList() {
    const page = this.ctx.query.page ? parseInt(this.ctx.query.page) : 1;
    const size = this.ctx.query.size ? parseInt(this.ctx.query.size) : 20;
    const galleryId = this.ctx.params.id;
    const result = await this.ctx.service.gallery.photoList(galleryId, page, size);
    this.ctx.body = { result };
  }

  async create() {
    this.validateParam(this.createRule, this.ctx.request.body);
    const gallery = this.ctx.request.body;
    const galleryModel = {
      name: gallery.name,
      cover: gallery.cover,
      created_date: new Date(),
      update_date: new Date(),
      disabled: 1,
    };
    if (gallery.description) {
      galleryModel.description = gallery.description;
    }
    const result = await this.ctx.service.gallery.create(galleryModel);
    this.returnSuccess(result, 201);
  }

  async createPhoto() {
    this.returnSuccess('', 201);
  }
}

module.exports = PhotoController;
