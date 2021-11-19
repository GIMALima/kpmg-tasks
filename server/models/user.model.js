var con = require("../config/db.config");
const bcrypt = require("bcrypt");

// User entity.
var User = function (user) {
  this.firstname =
    user.firstname?.charAt(0).toUpperCase() + user.firstname?.slice(1); // Capitalize user firstname.
  this.lastname =
    user.lastname?.charAt(0).toUpperCase() + user.lastname?.slice(1); // Capitalize user lastname.
  this.email = user.email;
  this.password = user.password;
  this.profile = user.profile;
  this.created_at = new Date();
  this.updated_at = new Date();
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

// Check if user exists by email and password.
User.login = async (userReqData, result) => {
  con.query(
    "SELECT * FROM user WHERE email=?",
    [userReqData.email],
    async (err, res) => {
      if (err || res.length == 0) {
        result("email incorrect", null);
      } else {
        const auth = await bcrypt.compare(
          userReqData.password,
          res[0].password
        );

        if (auth) result(null, res[0]);
        else result("password incorrect", null);
      }
    }
  );
};

User.findUserById = (id, result) => {
  con.query("SELECT * FROM user WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching user by id", err);
      result(null, err.message);
    } else {
      result(null, res[0]);
    }
  });
};

User.findUsers = (result) => {
  con.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("Error while fetching user", err);
      result(null, err.message);
    } else {
      result(null, res);
    }
  });
};

module.exports = User;
