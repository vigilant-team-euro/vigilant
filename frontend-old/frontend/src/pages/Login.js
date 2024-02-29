import Header from "../components/Header.js";
import { AuthContext } from "../AuthContext.js";
import { useState, useContext } from "react";
import { auth, googleAuth } from "../config/firebase";
import { FacebookLoginButton, GoogleLoginButton, InstagramLoginButton } from "react-social-login-buttons";
import { NavLink, Link, redirect, label } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, useSignInWithEmailAndPassword } from "firebase/auth";
import "./signin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login, logout} = useContext(AuthContext)
  const navigate = useNavigate()

  console.log(auth?.currentUser?.email);

  const SignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then((user) =>
      {
        login()
        navigate("/clientPage")
      })
    } catch (err) {
      navigate("/login")
      alert(err)
    }
  };

  const SignInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
      login()
      navigate("/clientPage")
    } catch (err) {
      navigate("/login")
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
                
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="formField">
              <Link
                onClick={SignIn}
                className="formFieldButton"
              >
                Sign In
              </Link>
              <Link to="/signup" className="formFieldLink">
                Create an account
              </Link>
            </div>

            <div className="socialMediaButtons pt-5">
              <div className="facebookButton pb-2">
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
