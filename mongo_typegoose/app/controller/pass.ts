import { Controller } from 'egg';
import * as enums from '../common/core/enum';
import assert = require('power-assert');
export default class PassController extends Controller {

  public async register() {

      const { ctx } = this;
      console.log('ctx.user:====', ctx.user);
      // ctx.response.type = 'json';

      ctx.body = await ctx.service.usercenter.register(ctx.req.body);

  }

  public  logout() {
    const { ctx } = this;
    try {

      console.log('ctx.user:', ctx.user);
      console.log('ctx.req:==============>');
      assert(ctx.user != null, '用户未登录');
      ctx.logout();
      // console.log('ctx.req:', ctx.req);
      console.log('ctx.user', ctx.user);
      ctx.body = new enums.Success(0, '注销成功');
    } catch (error) {
      console.log('error', error.message);
      ctx.body = new enums.Failure(1, '注销失败');
    }

}

}
