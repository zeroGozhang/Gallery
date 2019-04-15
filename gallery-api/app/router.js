'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // H5
  router.get('/m/gallery', controller.m.gallery.index);
  router.get('/m/gallery/:id/photoList', controller.m.gallery.photoList);

  // 管理后台
  router.post('/manager/gallery', controller.manager.photo.create);
};
