import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import "./login.css";
import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { AuthContext } from "../../context/AuthContext";
import {doc, setDoc,addDoc,collection} from "firebase/firestore"
import { db } from '../../utils/firebase';

function Login() {
  const [loginClicked, setLoginClicked] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Use the user's UID to create a unique folder in Firestore
      const userFolderRef = doc(db, "users", user.uid);
  
      // Create the user folder with initial data (optional)
      await setDoc(userFolderRef, { /* Your initial data */ });
      const employeesCollectionRef = collection(userFolderRef, "employees");
      const storesCollectionRef = collection(userFolderRef, "stores");
      const reportsCollectionRef = collection(userFolderRef, "reports")
      
      const employeeDocRef = await addDoc(employeesCollectionRef, {});
      const storeDocRef = await addDoc(storesCollectionRef, {});
      const reportDocRef = await addDoc(reportsCollectionRef, {});
      console.log("User created successfully with UID:", user.uid);
      console.log("Employee folder created with ID:", employeeDocRef.id);
      console.log("Store folder created with ID:", storeDocRef.id);
      console.log("Report folder created with ID:", reportDocRef.id);
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error creating user:", errorCode, errorMessage);
    }
  };

  return (
    <div className="App">
      <div className="appAside" />
      <div className="appForm">
        <div className="formTitle">
          <div
            activeClassName="formTitleLink-active"
            className="formTitleLink"
            onClick={() => setLoginClicked(true)}
          >
            Sign In
          </div>{" "}
          or{" "}
          <div
            activeClassName="formTitleLink-active"
            className="formTitleLink"
            onClick={() => setLoginClicked(false)}
          >
            Sign Up
          </div>
        </div>

        <div>
          <div>
            {loginClicked ? (
              <div className="formCenter">
                <form className="formFields" onSubmit={handleLogin}>
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
                    <button type="submit" className="formFieldButton">
                      Sign In
                    </button>
                    <div
                      onClick={() => setLoginClicked(false)}
                      className="formFieldLink"
                    >
                      Create an account
                    </div>
                  </div>

                  <div className="socialMediaButtons pt-5">
                    <div className="facebookButton pb-2">
                      <GoogleLoginButton />
                    </div>

                    <div className="instagramButton">
                      <FacebookLoginButton />
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="formCenter">
                <form className="formFields" onSubmit={handleSignUp}>
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
                    <button type="submit" className="formFieldButton">Sign Up</button>{" "}
                    <Link to="/login" className="formFieldLink">
                      I'm already member
                    </Link>
                  </div>

                  <div className="socialMediaButtons pt-5">
                    <div className="facebookButton pb-2"></div>

                    <div className="instagramButton"></div>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
