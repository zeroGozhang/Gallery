'use strict';

const Controller = require('egg').Controller;
const uuid = require('node-uuid');
const { version, name, description } = require('../../package.json');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      description,
      version,
      name,
      status: 'UP',
      uuid: uuid.v1(),
    };
  }
}

module.exports = HomeController;
