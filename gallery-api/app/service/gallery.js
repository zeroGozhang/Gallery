
'use strict';

const Service = require('egg').Service;

class GalleryService extends Service {

  async list() {
    await this.app.mysql.get('gallery');
  }

}

module.exports = GalleryService;
