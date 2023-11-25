import Header from "../components/Header.js";
import { useState } from "react";
import { googleAuth, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  InstagramLoginButton,
} from "react-social-login-buttons";
import "./signin.css";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const Register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };

  const RegisterWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
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
          <button
            onClick={Register}
            to="/clientPage"
            className="formFieldButton"
          >
            Sign Up
          </button>{" "}
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
