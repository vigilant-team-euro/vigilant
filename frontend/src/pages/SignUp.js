import Header from '../components/Header.js';
import { useState } from 'react';
import { googleAuth, auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Link } from 'react-router-dom';
import { func } from 'prop-types';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.email)

    const Register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err)
        }
    }

    const RegisterWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleAuth);
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

                < button>  <Link onClick={Register} to="/clientPage"> Register</Link> </button>
            </div>

            <div> 
                <button> <Link onClick={RegisterWithGoogle} to="/clientPage"> Register with Google</Link></button>
            </div>
        
            
        </div>
    );
};