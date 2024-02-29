import React from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import { Route, NavLink } from "react-router-dom";
import "./signin.css";

function LoginRouter() {
  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        

        <div className="formTitle">
          <NavLink
            to="/login"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign In
          </NavLink>{" "}
          or{" "}
          <NavLink
            exact
            to="/signup"
            activeClassName="formTitleLink-active"
            className="formTitleLink"
          >
            Sign Up
          </NavLink>
        </div>

        <Login/>
      </div>
    </div>
  );
}

export default LoginRouter;