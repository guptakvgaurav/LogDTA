/**
 * Created by sourabh on 26/7/17.
 */
import jwt_token from "jsonwebtoken";
import config from "../../config/environment"
import { compose } from "compose-middleware"
// import { compose } from "compose-middleware";
const AUTHORIZE_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b";
const AUTH_HRMS_TOKEN_COOKIE = 'nw_dev_oauthToken';

/**
 * it extracts the token from headers
 * verifies the token received from client side in order to authenticate and authorize the user,
 * if authenticated decodes the employeeId from the token and adds it in req object
 * if token is not verified send an error otherwise calls the next middleware
 * if not token then also it calls the next middleware
 * @param req
 * @param res
 * @param next
 */
const verifyTsmsToken = (req, res, next) => {
  //to verify token
  const token = req.headers.authorization;
  if (token) {
    jwt_token.verify(token, config.token.SecretKey, (err, decode) => {
      if (err) {
        res.status(500).send("invalid token");
      }
      else {
        const decodeData = jwt_token.decode(token);
        req.ememployeeId = decodeData.employeeId;
        next();
      }
    })
  } else {
    next();
  }
};

/**
 *exclude Callback url to check cookie existing condition
 *if cookie exists call employee detail API with token in cookie
 *if employee sign in first time call authorize api for google sign in

 * @param req
 * @param res
 * @param next
 */
const authChecker = (req, res, next) => {
  const url = req.originalUrl;
  if (url.indexOf('/api/oauthServerCallback') != -1) {
    return next();
  }
  if (req.cookies[AUTH_HRMS_TOKEN_COOKIE]) {
    next();
  } else {
    res.redirect(AUTHORIZE_URL)
  }
};

const composeMiddlewares = (compose([
  verifyTsmsToken,
  authChecker
]));

module.exports = composeMiddlewares;
