import Header from '../components/Header.js';

import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth"
import { NavLink, Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const SignIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            
        } catch (err) {
            console.log(err)
        }
    }

    const SignInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuth)
            
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div>
            
            <div> 
                <input placeholder="email" 
                onChange={(e) => setEmail(e.target.value)}
                />

                <input placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                />

                < button > 
                    <Link onClick={SignIn} to="/clientPage"> Log in </Link>
                </button>
            </div>

            <div> 
                <button>
                    <Link onClick={SignInGoogle} to="/clientPage"> Sign In with Google</Link>
                </button>
            </div>

            <div> 
                <button>
                    <Link to="/signup"> Register</Link>
                </button>
            </div>
            
        </div>
    );
};