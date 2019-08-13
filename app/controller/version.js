'use strict';

const Controller = require('egg').Controller;
class VersionController extends Controller {
  async index() {
    this.ctx.body = { code: 0, msg: 'ok' };
  }

  async create() {
    const { name, desc, version, mac, win } = this.ctx.request.body;
    const params = {
      name,
      desc,
      version,
      mac,
      win,
    };
    if (await this.ctx.model.Version.create(params)) {
      this.ctx.body = {
        code: 0,
        msg: '创建成功',
        data: {},
      };
    } else {
      this.ctx.body = {
        code: -3,
        msg: '数据库操作错误',
        data: {},
      };
    }
  }
  async destroy() {
    const { id } = this.ctx.request.body;
    if (!id) {
      this.ctx.body = {
        code: -1,
        msg: '缺少必要参数',
        data: {},
      };
      return;
    }
    const currentItem = await this.ctx.model.Version.findById(id);
    if (!currentItem) {
      this.ctx.body = {
        code: 1,
        msg: '查无此版本',
        data: {},
      };
      return;
    }
    const param = {
      id,
      isDeleted: true,
    };
    if (await currentItem.update(param)) {
      this.ctx.body = {
        code: 0,
        msg: '删除成功',
        data: {},
      };
    } else {
      this.ctx.body = {
        code: -3,
        msg: '数据库操作错误',
        data: {},
      };
    }
  }

  async query() {
    const where = {
      isDeleted: false,
    };
    const order = [
      [ 'createdAt', 'DESC' ],
    ];
    const mix = await this.ctx.model.Version.findAll({ where, order });
    if (mix.length <= 0) {
      this.ctx.body = {
        code: 1,
        msg: '没有任何版本',
        data: {},
      };
      return;
    }
    this.ctx.body = {
      code: 0,
      message: 'query ok',
      data: {
        mix,
        count: mix.length,
      },
    };
  }

  async latest() {
    const { client_version } = this.ctx.query;
    if (!client_version) {
      this.ctx.body = {
        code: -1,
        msg: '缺少必要参数：client_version',
        data: {},
      };
      return;
    }
    const where = {
      isDeleted: false,
    };
    const order = [
      [ 'createdAt', 'DESC' ],
    ];
    const mix = await this.ctx.model.Version.findAll({ where, order });
    if (mix.length <= 0) {
      this.ctx.body = {
        code: 0,
        msg: '没有任何版本',
        data: {},
      };
      return;
    }
    // 比较有没有新版本
    const client = client_version.split('.');
    const latest = mix[0].version.split('.');
    let needUpdate = false;
    for (let i = 0; i < latest.length; i += 1) {
      if (latest[i] * 1 > client[i]) {
        needUpdate = true;
        break;
      }
    }
    if (needUpdate) {
      this.ctx.body = {
        code: 1,
        msg: '有新版本可更新',
        data: mix[0],
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: '您使用的是最新版本',
        data: {},
      };
    }
  }
}

module.exports = VersionController;
