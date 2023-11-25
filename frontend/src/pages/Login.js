import Header from "../components/Header.js";

import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { NavLink, Link } from "react-router-dom";
import "./signin.css";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const SignInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        
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
              <button
                onClick={SignIn}
                to="/clientPage"
                className="formFieldButton"
              >
                Sign In
              </button>{" "}
              <Link to="/signup" className="formFieldLink">
                Create an account
              </Link>
            </div>

            <div className="socialMediaButtons">
              <div className="facebookButton">
                <GoogleLoginButton onClick={SignInGoogle} />
              </div>

              <div className="instagramButton">
                <FacebookLoginButton onClick={() => alert("Hello")} />
              </div>
            </div>
          </form>
        </div>
      </div>


      <div>
     
      </div>
    </div>
  );
}
