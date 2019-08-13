'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // 修改监听地址
  config.cluster = {
    listen: {
      path: '',
      port: 9023,
      hostname: '0.0.0.0',
    },
  };

  // 连接数据库
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'db.panda.core',
    host: '47.96.8.230',
    port: '3306',
    username: 'root',
    password: 'Iamaboy1.',
    logging: false,
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    define: {
      underscored: false,
      charset: 'utf8mb4',
      dialectOptions: {
        collate: 'utf8mb4_unicode_ci',
      },
      timestamps: true,
    },
  };


  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1542722031130_6360';

  // add your config here
  config.middleware = [];

  // 解决跨域问题
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ '*' ],
  };
  config.cors = {
    // origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };


  return config;
};
