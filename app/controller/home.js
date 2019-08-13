'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    
    this.ctx.body = { code: 0 };
  }
}

module.exports = HomeController;
