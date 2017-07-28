/**
 * Created by sourabh on 27/7/17.
 */
const AUTH_TSMS_TOKEN_COOKIE='Tsms';

/**
 *this function clears the TSMS Auth  cookie as soon as employee clicks on the logout button
 * @params req ,res
 */

const logout=(req,res)=>{
    res.clearCookie(AUTH_TSMS_TOKEN_COOKIE).send("logout successful");
};

module.exports=logout;
