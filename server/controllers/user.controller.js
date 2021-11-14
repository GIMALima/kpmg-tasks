const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { signupErrors, signinErrors } = require("../utils/errors.utils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signup = (req, res) => {
  const userData = new User(req.body);

  User.createUser(userData, (err, user) => {
    if (err) {
      const errors = signupErrors(err);
      res.status(200).send({ errors });
    } else res.status(201).json({ user: user.insertId });
  });
};

module.exports.signin = (req, res) => {
  const userData = new User(req.body);

  User.login(userData, (err, user) => {
    if (err) {
      const errors = signinErrors(err);
      res.status(200).send({ errors });
    } else {
      const token = createToken(user.id);
      res.cookie("jwt", token, { httpOnly: true, maxAge });
      res.status(200).json({ user: user.id });
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
