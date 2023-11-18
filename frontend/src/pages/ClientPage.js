import Header from '../components/Header.js';
import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {  signOut } from "firebase/auth"
import { Link } from 'react-router-dom';

export default function ClientPage(){
    const LogOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err)
        }     
    }

    console.log(auth.currentUser)

    return(
        <div>
            <h2> Client Page </h2>
            <button >
                <Link onClick={LogOut} to="/login"> LogOut</Link>
            </button>
        </div>
    )
}