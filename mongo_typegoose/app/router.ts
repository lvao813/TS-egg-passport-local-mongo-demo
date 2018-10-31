import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/login', controller.home.login);
  router.get('/success', controller.home.success);
  router.post('/login', app.passport.authenticate('local', { successRedirect: '/success',
  failureRedirect: '/login' }));

};
