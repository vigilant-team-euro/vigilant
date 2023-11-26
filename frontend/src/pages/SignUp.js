import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext.js";
import { googleAuth, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import "./signin.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, logout} = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(auth?.currentUser?.email);

  const Register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      login()
      navigate("/clientPage")
    } catch (err) {
      alert(err);
      navigate("/signup")
    }

  };

  const RegisterWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      login()
      navigate("/clientPage")
    } catch (err) {
      console.log(err);
      navigate("/login")
    }
  };

  return (
    <div className="formCenter">
      <form className="formFields">
        <div className="formField">
          <label className="formFieldLabel" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="formFieldInput"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="formField">
          <label className="formFieldLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="formFieldInput"
            placeholder="Enter your password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="formField">
          <label className="formFieldCheckboxLabel">
            <input
              className="formFieldCheckbox"
              type="checkbox"
              name="hasAgreed"
            />{" "}
            I agree all statements in{" "}
            <a href="null" className="formFieldTermsLink">
              terms of service
            </a>
          </label>
        </div>

        <div className="formField">
          <NavLink
            onClick={Register}
            className="formFieldButton"
          >
            Sign Up
          </NavLink>{" "}
          <Link to="/login" className="formFieldLink">
            I'm already member
          </Link>
        </div>

        <div className="socialMediaButtons pt-5">
          <div className="facebookButton pb-2">
            <GoogleLoginButton onClick={RegisterWithGoogle} />
          </div>

          <div className="instagramButton">
            <FacebookLoginButton onClick={() => alert("Hello")} />
          </div>
        </div>
      </form>
    </div>
  );
}
