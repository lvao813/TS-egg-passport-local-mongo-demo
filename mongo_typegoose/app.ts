import { Application } from 'egg';
import * as mongoose from 'mongoose';
import 'reflect-metadata';
import User from './entity/user';
import MD5 = require('md5');
const UserModel = new User().getModelForClass(User);
import newLocal = require('passport-local');
const LocalStrategy = newLocal.Strategy;
export default (app: Application) => {
    app.beforeStart(async () => {
        try {
            mongoose.connect('mongodb://test:123456@127.0.0.1:27017/test');

            console.log('初始化成功');
        } catch (error) {
            console.log(error);
        }

        // console.log('appstart');
    });

    app.passport.use(new LocalStrategy({
        passReqToCallback: true,
      }, (ctx, _name, _password, done) => {
            let pass_md5 = MD5(_password);
            console.log('passmd5==========>', pass_md5);
            console.log('ctx.body:', ctx.body);
            console.log('name', _name);
            console.log('password', _password);
            UserModel.findOne({name: _name}, (err, request) => {
                if (err){ return done(err); }
                if (!request){

                    // return done(new Error('用户不存在，请重新输入'));

                }
                // let passmd5 = MD5(_password);
                // console.log('passmd5==========>', passmd5);
                UserModel.findOne({name: _name, password: pass_md5}, (error, user) => {
                    if (err){ return done(error); }
                    if (!request){
                        console.log('密码错误');
                        // return done(new Error('密码错误，请重新输入'));
                    }
                    console.log('passport======>', user);
                    return done(undefined, user);
                    });
            });
        // format user
      }));
    // app.passport.verify(async (ctx, user) => {
    //     console.log('========================>');
    //     console.log('verify_ctx', ctx);
    //     console.log('verify_user', user);
    //     });
    app.passport.serializeUser(async (ctx, user) => {
        console.log('serializeUser');
        console.log(ctx.user);
        console.log('uuuuu');
        console.log(user);
        if (user) {
          return {
            _id: user._id,
          };
        }
      });
    app.passport.deserializeUser(async (ctx, user) => {
        console.log('deserializeUser');
        console.log(user);
        console.log(ctx.user);
        if (user && user._id) {
        //   const exist = await UserModel.findById(mongoose.Types.ObjectId());
          console.log('exist');
        //   console.log(exist);
        //   return exist;
          return user;
        }
        return user;
      });

    console.log('appstart');
};
