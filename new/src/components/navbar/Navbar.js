import React from 'react'
import "./navbar.scss"
import logo from "../../logo.svg"
function Navbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img src={logo} className='logo'  alt="" />
        <span>VIGILANT</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="./noavatar.png"
            alt=""
          />
          <span>Onur</span>
        </div>
        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  )
}

export default Navbar