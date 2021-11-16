import React, { useState } from "react";
import Header from "../../components/Login/Header/Header";
import Signup from "../../components/Login/Form/Signup";
import Signin from "../../components/Login/Form/Signin";
import "./Login.css";
import Copyright from "../../components/Copyright/Copyright";

const Login = () => {
  const [isSignup, setIsSignUp] = useState(false);

  return (
    <div className="login">
      <Header isSignup={isSignup} setIsSignUp={setIsSignUp} />
      <div className="login__mainContainer">
        {!isSignup && <Signin />}
        {isSignup && <Signup />}
      </div>
      <div className="login__footer">
        <Copyright />
      </div>
    </div>
  );
};

export default Login;
