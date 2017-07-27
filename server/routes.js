/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
const authMiddlewares=require("./components/auth");
const redirectUrlFunction = require("./components/auth/redirectUrl");

export default function (app) {
  // Insert routes below
  app.use('/api/users', require('./api/employee'));
  //route for logout
  app.use(authMiddlewares);
  app.route("/logout")
    .get((req, res) => {
      res.clearCookie('Tsms').send("logout successfull");
    });

  app.route("/")
    .get((req,res)=>{
      res.send("hello everyone");
    });
  //Route to call redirect url from oAuth when sign in first time
  app.route("/api/oauthServerCallback")
    .get((req, res) => {
      redirectUrlFunction(req,res)
    });

  // app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`../../client/index.html`));
    });
}
