'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const conditional = app.middleware.conditional();
  const etag = app.middleware.etag();
  router.get('/', controller.home.index);

  // H5
  router.get('/m/gallery', conditional, etag, controller.m.gallery.index);
  router.get('/m/gallery/:id', conditional, etag, controller.m.gallery.show);

  router.get('/m/gallery/:id/photoList', conditional, etag, controller.m.gallery.photoList);

  // 管理后台
  router.post('/manager/gallery', controller.manager.photo.create);

  router.delete('/manager/photos/:id', controller.manager.photo.destroy);

  // 图片上传相关
  router.post('/upload/image', controller.manager.upload.index);
  router.post('/upload/photos', controller.manager.photo.uploadPhotos);
};
