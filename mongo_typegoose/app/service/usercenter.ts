import { Service } from 'egg';
import User from '../../entity/user';
import assert = require('power-assert');
import MD5 = require('md5');
import * as enums from '../common/core/enum';
import * as IF from '../common/interface';
export default class UserCenter extends Service {
    public async register (obj) {
    const UserModel = new User().getModelForClass(User);
    try {
        assert(obj.username != null, 'username不能为空');
        assert(obj.password != null, 'password不能为空');
        assert(obj.nickname != null, 'nickname不能为空');
        let pass_md5 = MD5(obj.password);
        const check_user = await UserModel.find({name: obj.username});
        console.log('check_user', check_user);
        assert(JSON.stringify(check_user) === '[]', '用户名重复');
        const u = new UserModel({ name: obj.username, password: pass_md5, nickname: obj.nickname });
        const user = await u.save();
        let _user: IF.SqlUser = {
            id: user._id,
            nickname: user.nickname,
        };
        return new enums.Success(0, '注册成功', _user);
    } catch (error) {
      console.log(error.message);
      return new enums.Failure(1, error.message);
    }
    }
}
