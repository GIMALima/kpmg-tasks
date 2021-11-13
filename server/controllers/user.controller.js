const User = require("../models/user.model");
const { signupErrors } = require("../utils/errors.utils");

module.exports.signup = (req, res) => {
  const userData = new User(req.body);

  User.createUser(userData, (err, user) => {
    if (err) {
      const errors = signupErrors(err);
      res.status(200).send({ errors });
    } else res.status(201).json({ user: user.insertId });
  });
};
