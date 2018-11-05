import { Controller } from 'egg';
import * as mongoose from 'mongoose';
import User from '../../entity/user';
import assert = require('power-assert');
import * as enums from '../common/core/enum';
import * as IF from '../common/interface';
export default class HomeController extends Controller {

  public async index() {
    try {
      const { ctx } = this;
      console.log('home_ctx', ctx);
      const client = ctx.grpc.egg.share.showCase;
      const result = await client.echo({ code: '200' });
      console.log('grpc_result', result);
      ctx.body = await ctx.service.test.sayHi('egg');
    } catch (error) {
      console.log(error);
    }

  }
  public async success(){
    const { ctx } = this;
    try {
      console.log('===============.', ctx.user);
      assert(ctx.isAuthenticated(), '用户未登录');
      const UserModel = new User().getModelForClass(User);
      const user = await UserModel.findById(mongoose.Types.ObjectId(ctx.user._id), 'nickname');

      console.log('===============.', user);

      let _user: IF.SqlUser = {
      id: user._id,
      nickname: user.nickname,
    };
      ctx.body = new enums.Success(0, '查找成功', _user);
    } catch (error) {
      ctx.body = new enums.Failure(-5, error.message);
    }
  }
  public async login(){
    const { ctx } = this;
    console.log('log========');
    ctx.body = new enums.Failure(1, '登录失败');
  }

}
