import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { isLoggedIn, login, logout} = useContext(AuthContext)
  // Function to handle logout
  const handleLogout = () => {
    logout()
    
  };

  return (
    <nav className="navbar">
      <div className="container-fluid px-5">
        <div className="logo">VIGILANT</div>
        <div className="nav-elements pt-2">
          <ul>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/">My Stores</NavLink>
                </li>
                <li>
                  <NavLink to="/">Demographics</NavLink>
                </li>
                <li>
                  <NavLink to="/">Forecasting</NavLink>
                </li>
                <li>
                  <NavLink onClick={handleLogout} to="/">
                    Logout
                  </NavLink>
                </li>
                
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
