'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/passport/signin', controller.passport.signIn);
  router.post('/passport/sheckUserSignStatus', controller.passport.checkUserSignStatus);
  router.get('/passport/getUserInfo', controller.passport.getUserInfo);

  router.get('/version/latest', controller.version.latest);
  router.get('/version/query', controller.version.query);
  router.post('/version/create', controller.version.create);
  router.post('/version/destroy', controller.version.destroy);
};
