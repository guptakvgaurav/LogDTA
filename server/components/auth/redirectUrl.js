/**
 * Created by sourabh on 27/7/17.
 */
const EmployeeSchema = require("../../api/employee/employee.model");
const jwt_token = require("jsonwebtoken");
const Network = require("../network");
const redirectUrl = (req, res) => {

  const hrmsToken = req.query.access_token;
  Network({url: "http://newers-world-oauth.qa2.tothenew.net/oauth/user?access_token=" + hrmsToken, method: 'GET'})
    .then(employeeData => {
      if (employeeData.statusCode === 200) {
        const employee = JSON.parse(employeeData.body);
        const employeeDetails = {
          employeeEmail: employee.email,
          employeeId: employee.employeeCode,
        };
        process.env.SECRET_KEY = 'NothingIsImpossible';

        const tsmsToken = jwt_token.sign(employeeDetails, process.env.SECRET_KEY, {
          expiresIn: 900000,
        });

        res.cookie('nw_dev_oauthToken', hrmsToken, {
          maxAge: 900000,
        });
        res.cookie('Tsms', tsmsToken, {
          maxAge: 900000,
        });

        EmployeeSchema.update({
          employeeId: employee.employeeCode,
          employeeEmail: employee.email
        }, {
          $set: {
            tsmsToken,
            hrmsToken,
          }
        }, {upsert: true}, (err, user) => {
          if (err) {
            console.log(err);
          }
        });
        res.sendFile("/home/sourabh/LogDTA/client/client.html")

      }
    })
    .catch(error => res.send("unable to fetch employee details"))

};

module.exports = redirectUrl;

