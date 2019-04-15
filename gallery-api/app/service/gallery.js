
'use strict';

const Service = require('../core/base-service');

class GalleryService extends Service {

  async list(page, size) {
    const [ totlaCount, list ] = await Promise.all([
      this.app.mysql.count('gallery', { disabled: 1 }),
      this.app.mysql.select('gallery', {
        where: { disabled: 1 },
        columns: [ 'id', 'name', 'description', 'cover', 'password' ],
        orders: [[ 'created_date', 'desc' ]],
        limit: size,
        offset: (page - 1) * size,
      }),
    ]);
    return {
      totlaCount,
      list,
    };
  }

  async photoList(galleryId, page, size) {
    const totlaCount = await this.app.mysql.count('photos', { galleryId, disabled: 1 });
    const list = await this.app.mysql.select('photos', {
      where: { galleryId, disabled: 1 },
      columns: [ 'id', 'name', 'galleryId', 'url' ],
      orders: [[ 'created_date', 'desc' ]],
      limit: size,
      offset: (page - 1) * size,
    });
    return {
      totlaCount,
      list,
    };
  }

  async createPhoto(photoModel) {
    const result = await this.app.mysql.insert('photos', photoModel);
    return result;
  }

  async create(galleryModel) {
    const result = await this.app.mysql.insert('gallery', galleryModel);
    return result;
  }

  async destroy(galleryId) {
    const result = await this.app.mysql.update('gallery', { disabled: 0 }, { where: { id: galleryId } });
    return result;
  }

}

module.exports = GalleryService;
