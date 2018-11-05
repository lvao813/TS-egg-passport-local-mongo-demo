// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Home from '../../../app/controller/home';
import Login from '../../../app/controller/login';
import Pass from '../../../app/controller/pass';
import Session from '../../../app/controller/session';

declare module 'egg' {
  interface IController {
    home: Home;
    login: Login;
    pass: Pass;
    session: Session;
  }
}
