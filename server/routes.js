/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import authMiddlewares from "./components/auth";
import redirectUrlFunction from "./components/auth/redirectUrl";
import logout from "./components/auth/logout";
export default function (app) {

  //middlewares
  app.use(authMiddlewares);
  // Insert routes below
  app.use('/api/employees', require('./api/employee'));
  //route for logout
  app.route("/logout")
    .get(logout);

  app.route("/")
    .get((req,res)=>{
      res.send("hello everyone");
    });
  //Route to call redirect url from oAuth when sign in first time
  app.route("/api/oauthServerCallback")
    .get(redirectUrlFunction);

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
