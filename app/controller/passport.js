'use strict';

const Controller = require('egg').Controller;

class PassportController extends Controller {
  async index() {
    this.ctx.body = { code: 0 };
  }
  async signIn() {
    this.ctx.body = { code: 0 };
  }
  async checkUserSignStatus() {
    // 检查用户是否已经登录
    // 传来 code
    const { code } = this.ctx.request.body;

    const app_id = 'cli_9dbc613a9d7f510c';
    const app_secret = 'sYd8DoGq26o5oSJEdyXKLd6fcfD1Qi2A';
    const grant_type = 'authorization_code';

    if (!code) {
      this.ctx.body = {
        code: -1,
        msg: '缺少参数: code',
        data: {},
      };
      return;
    }

    // https://open.feishu.cn/connect/qrconnect/oauth2/access_token/
    const result = await this.ctx.curl(
      'https://open.feishu.cn/connect/qrconnect/oauth2/access_token/',
      {
        method: 'POST',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          app_id,
          app_secret,
          grant_type,
          code,
        },
      }
    );
    if (result.status !== 200) {
      this.ctx.body = {
        code: -result.data.code,
        msg: result.data.message,
        data: {},
      };
      return;
    }
    this.ctx.body = {
      code: 0,
      message: 'ok',
      data: result.data,
    };
  }
  async getUserInfo() {
    // 验证
    const { user_access_token } = this.ctx.query;
    if (!user_access_token) {
      this.ctx.body = {
        code: -1,
        msg: '缺少必要参数',
        data: {},
      };
      return;
    }
    const result = await this.ctx.curl(
      'https://open.feishu.cn/connect/qrconnect/oauth2/user_info/',
      {
        method: 'GET',
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user_access_token}`,
        },
      }
    );
    if (result.status !== 200) {
      // 未成功
      this.ctx.body = {
        code: -result.status,
        msg: result.data.message,
        data: {},
      };
      return;
    }
    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data: result.data,
    };
    console.log(result);
  }
}

module.exports = PassportController;
