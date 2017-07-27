/**
 * Created by sourabh on 26/7/17.
 */
const jwt_token = require("jsonwebtoken");
const compose = require("compose-middleware").compose;
const verifyTsmsToken = (req, res, next) => {
  //to verify token
  const token = req.headers.authorization;
  if (token) {
    jwt_token.verify(token, process.env.SECRET_KEY, (err, decode) => {
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

const authChecker = (req, res, next) => {
  const url = req.originalUrl;
  //exclude Callback url to check cookie existing condition
  if (url.indexOf('/api/oauthServerCallback') != -1) {
    return next();
  }
  //if cookie exists call employee detail API with token in cookie
  if (req.cookies['nw_dev_oauthToken']) {
    next();
  }//if employee sign in first time call authorize api for google sign in
  else {
    res.redirect("http://newers-world-oauth.qa2.tothenew.net/oauth/authorize?client_id=e6d6a83e-6c7a-11e7-9394-406186be844b")
  }
};

const composeMiddlewares = (compose([
  verifyTsmsToken,
  authChecker
]));

module.exports=composeMiddlewares;
