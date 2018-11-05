import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1540813609323_4824';

  // add your egg config in here
  config.middleware = [];
  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
  };
  config.proxy = {
    enable: true,
  };
  config.passportLocal = {
    usernameField: 'name',
    passwordField: 'password',
  };
  config.grpc = {
    endpoint: 'localhost:50051',
    // dir: 'app/proto', // proto files dir, relative path
    // property: 'grpc', // default attach to `ctx.grpc.**`
    // loadOpts: { convertFieldsToCamelCase: true, }, // message field case: `string user_name` -> `userName`
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
