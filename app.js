'use strict';

module.exports = app => {
  app.beforeStart(async function() {
    if (app.config.env === 'local' || app.config.env === 'test') {
      await app.model.sync({ force: false }); // false的时候不会重启数据库。
    }
  });
};
