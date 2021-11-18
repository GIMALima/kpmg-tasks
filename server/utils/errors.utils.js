module.exports.signupErrors = (err) => {
  let errors = { email: "", password: "", technical: "" };

  if (err.includes("email")) errors.email = "Email already exists.";
  else if (err.includes("password"))
    errors.password = "The password must be at least 6 characters.";
  else
    errors.technical = "A technical error has occured. Please try again later.";

  return errors;
};

module.exports.signinErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.includes("email")) errors.email = "Unkown email.";

  if (err.includes("password")) errors.password = "Incorrect password.";

  return errors;
};

module.exports.uploadErrors = (err) => {
  let errors = { format: "" };

  if (err.message.includes("invalid file"))
    errors.format = "Invalid file format.";

  return errors;
};
