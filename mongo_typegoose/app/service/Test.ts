import { Service } from 'egg';
import * as mongoose from 'mongoose';
import User from '../../entity/user';
// const moment = require('moment');
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    const UserModel = new User().getModelForClass(User);
    try {
      const u = new UserModel({ name: 'JohnDoe', password: '123456' });
      await u.save();
      const user = await UserModel.findById(mongoose.Types.ObjectId('5bd7c5862dcbed11effe4c05'));
      const user_t = await UserModel.findOne({name: 'JohnDoe'});
  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
      console.log('user_t', user_t);
      console.log('user', user);
    } catch (error) {
      console.log(error);
    }
    return `hi, ${name}`;
  }
}
