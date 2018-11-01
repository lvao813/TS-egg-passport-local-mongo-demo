import 'egg';
import Passport from 'egg-passport';
declare module 'egg' {
    // 扩展你的配置
    interface Application {
        passport:Passport;

    }
}