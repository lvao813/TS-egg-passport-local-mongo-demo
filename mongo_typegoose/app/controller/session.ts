import { Controller } from 'egg';
export default class SessionController extends Controller {

  public async create() {
    try {
      const { ctx } = this;
      console.log(ctx.user);
      ctx.body = {code: 0};
    } catch (error) {
      console.log(error);
    }

  }
}
