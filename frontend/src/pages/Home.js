import Header from '../components/Header.js';
import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {  signOut } from "firebase/auth"
import { Link } from 'react-router-dom';
import Documents from '../components/Documents.js'
import TeamMembers from '../components/TeamMembers.js';

export default function Home() {
    return (
        <div>
            <div>
                Documents
                <Documents/>
            </div>

            <div>
                Team Members
                <TeamMembers/>
            </div>


            
        </div>
    );
};