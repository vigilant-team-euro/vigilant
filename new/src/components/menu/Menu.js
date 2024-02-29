import { Link ,useNavigate} from "react-router-dom";
import "./menu.scss";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext } from "react";

const Menu = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT", payload: null });
    navigate("/login");
  }
  return (
    <div className="menu">
      <div className="inner">
        <div className="item">
          <span className="title">General</span>
          <Link to="/" className="listItem">
            <img src="/home.svg" alt=""></img>
            <span className="listItemTitle">Home</span>
          </Link>
          <Link to="/" className="listItem">
            <img src="/notifications.svg" alt=""></img>
            <span className="listItemTitle">Notifications</span>
          </Link>
          <Link to="/" className="listItem">
            <img src="/profile.svg" alt=""></img>
            <span className="listItemTitle">Profile</span>
          </Link>
        </div>
        <div className="item">
          <span className="title">Lists</span>
          <Link to="/employees" className="listItem">
            <img src="/user.svg" alt=""></img>
            <span className="listItemTitle">Employees</span>
          </Link>
          <Link to="/stores" className="listItem">
            <img src="/product.svg" alt=""></img>
            <span className="listItemTitle">Stores</span>
          </Link>

          <Link to="/reports" className="listItem">
            <img className="report" src="/reports.svg" alt=""></img>
            <span className="listItemTitle">Reports</span>
          </Link>
        </div>
      </div>
      <div>
        <div className="item">
          <span className="title"></span>
          <Link onClick={handleLogout} to="/" className="listItem">
            <img src="/logout.svg" className="logout" alt=""></img>
            <span className="listItemTitle">Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
