module.exports.signupErrors = (err) => {
  let errors = { email: "", password: "", technical: "" };

  if (err.includes("email")) errors.email = "Email already exists.";
  else if (err.includes("password"))
    errors.password = "The password must be at least 6 characters.";
  else
    errors.technical = "A technical error has occured. Please try again later.";

  return errors;
};
