/**
 * Created by sourabh on 27/7/17.
 */

const logout=(req,res)=>{
    res.clearCookie('Tsms').send("logout successful");
};

module.exports=logout;
