import { Controller } from 'egg';
import * as mongoose from 'mongoose';
import User from '../../entity/user';
import * as enums from '../common/core/enum';
import assert = require('power-assert');
import * as IF from '../common/interface';
export default class Login extends Controller {
    public async out () {
        const { ctx } = this;
        try {
      console.log('===============out.', ctx.isAuthenticated());
      const UserModel = new User().getModelForClass(User);
      const user = await UserModel.findById(mongoose.Types.ObjectId(ctx.user._id));
      assert(ctx.isAuthenticated(), '用户登录失败');
      console.log('===============.', ctx.user);
      let _user: IF.SqlUser = {
      id: user._id,
      nickname: user.nickname,
    };
      let suss = new enums.Failure( 0, '登录成功', _user);
      console.log('suss', _user);
      ctx.body = suss;
    } catch (error) {
      console.log(error);
      let fail = new enums.Failure(1, '登录失败');
      ctx.body = fail;
    }
    }
}
