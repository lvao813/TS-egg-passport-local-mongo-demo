import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/pass/login', controller.home.login); // 用户登录失败
  router.get('/pass/success', controller.home.success); // 用户登录成功
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/test/getuser',
  failureRedirect: '/test/pass/login'})); // 用户鉴权
  // router.resources('session', '/session', controller.session);
  router.post('/register', controller.pass.register); // 用户注册
  router.get('/logout', controller.pass.logout); // 用户登出
  router.get('/getuser', controller.login.out); // 获取用户信息
};
