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

  async destroy() {
    const id = this.ctx.params.id;
    await this.app.mysql.update('photos', { disabled: 0 }, { where: { id } });
    this.returnSuccess('', 200);
  }

  async createPhoto() {
    this.returnSuccess('', 201);
  }

  /**
   * 上传相册里的图片
   */
  async uploadPhotos() {
    const ctx = this.ctx;
    // egg-multipart 已经帮我们处理文件二进制对象
    // node.js操作文件流
    const stream = await ctx.getFileStream();
    const id = stream.fields.id;
    const url = await this.ctx.service.upload.index(stream);
    await this.app.mysql.insert('photos', {
      name: stream.filename,
      galleryId: id,
      url,
      created_date: new Date(),
      disabled: 1,
    });

    this.returnSuccess({
      imageUrl: url,
    }, 200);
  }

}

module.exports = PhotoController;
