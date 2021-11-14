var con = require("../config/db.config");
const bcrypt = require("bcrypt");

// User entity.
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.password = user.password;
  this.profile_type = user.profile_type;
  this.creation_date = user.creation_date;
  this.updated_at = user.updated_at;
};

// Create a new user.
User.createUser = async (userReqData, result) => {
  // hash password.
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userReqData.password, salt);

  if (userReqData.password.length < 6) {
    result("password incorrect", null);
  } else {
    // Check if email is already used.
    con.query(
      'SELECT email FROM user WHERE email = "' + userReqData.email + '"',
      (err, res) => {
        if (err) {
          result(err.message, null);
        } else if (res[0] && res[0].email.length > 0) {
          result("email already taken", null);
        } else {
          userReqData.password = hashedPassword;

          // Insert new user.
          con.query("INSERT INTO user SET ? ", userReqData, (err, res) => {
            if (err) {
              console.log(`Error while inserting user data: ${err}`);
              result(err.message, null);
            } else {
              console.log("User created successfully");
              result(null, res);
            }
          });
        }
      }
    );
  }
};

module.exports = User;
