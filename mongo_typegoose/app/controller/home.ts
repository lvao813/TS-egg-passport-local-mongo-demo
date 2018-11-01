import { Controller } from 'egg';

export default class HomeController extends Controller {

  public async index() {
    try {
      const { ctx } = this;
      console.log('home_ctx', ctx.user);
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
    ctx.body = JSON.stringify({
      code: 1,
      msg: '成功',
    });
  }
  public async login(){
    const { ctx } = this;
    ctx.body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>LoginPage</title>
    </head>
    <body>
        <form action="/login" method="post">
            <input type="hidden" name="_csrf" value="${this.ctx.csrf}">
            <label for="username">
                Username:
                <input type="text" value="JohnDoe" id="username" name="username">
            </label>
            <label for="password">
                Password:
                <input type="text" value="123456" id="password" name="password">
            </label>
    
            <input type="submit" value="Submit">
        </form>
    </body>
    </html>`;
  }
}
