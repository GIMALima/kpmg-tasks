import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = ({ isSignup, setIsSignUp }) => {
  const handleClick = () => {
    setIsSignUp(!isSignup);
  };

  return (
    <div className="login__header">
      <NavLink exact to="/">
        <img
          src="./assets/logo.png"
          alt="KPMG TASKS"
          className="navbar__headerLogo"
        />
      </NavLink>
      <div className="login_headerContainer">
        <>
          {isSignup && (
            <>
              <span className="login_headerContainerText">
                I already have an account KPMG TASKS?
              </span>
              <button
                onClick={handleClick}
                className="login_headerContainerButton"
              >
                Sign in
              </button>
            </>
          )}

          {!isSignup && (
            <>
              <span className="login_headerContainerText">
                I don't have an account KPMG TASKS?
              </span>
              <button
                onClick={handleClick}
                className="login_headerContainerButton"
              >
                Sign up
              </button>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Header;
