/**
 * Created by sourabh on 27/7/17.
 */
const AUTH_TSMS_TOKEN_COOKIE = 'Tsms';
const AUTH_HRMS_TOKEN_COOKIE = 'nw_dev_oauthToken';
const INVALIDATE_TOKEN_URL = "http://newers-world-oauth.qa2.tothenew.net/oauth/invalidateToken?access_token=";
import Network from "../network";
import logger from "../logger"

/**
 *this function clears the TSMS Auth  cookie as soon as employee clicks on the logout button
 * @params req ,res
 */

const logout = (req, res) => {
  const hrmstoken = req.cookies[AUTH_HRMS_TOKEN_COOKIE];

  res.clearCookie(AUTH_TSMS_TOKEN_COOKIE).send("logout successful");
  //
  // res.clearCookie(AUTH_HRMS_TOKEN_COOKIE).send("logout successful");
  // Network({url: INVALIDATE_TOKEN_URL + hrmstoken})
  //   .then(res => {
  //     logger.silly(res)
  //   })
  //   .catch(error => {
  //     logger.silly(error)
  //   })

};

module.exports = logout;
