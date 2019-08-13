'use strict';
// const moment = require('moment');
module.exports = app => {
  const { STRING, UUID, UUIDV1, BOOLEAN } = app.Sequelize.DataTypes;
  const Version = app.model.define('Version', {
    id: {
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV1, // 使用mac地址和时间戳还有随机数生成的唯一id
      type: UUID,
    },
    name: STRING, // 名称
    desc: STRING, // 描述
    version: STRING, // 版本号 字符串形式
    mac: STRING, // Mac 版下载地址
    win: STRING, // Win 版下载地址
    isDeleted: {
      defaultValue: false,
      type: BOOLEAN,
    },
  });
  return Version;
};
