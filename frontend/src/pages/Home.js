import Header from '../components/Header.js';
import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import {  signOut } from "firebase/auth"
import { Link } from 'react-router-dom';
import Documents from '../components/Documents.js'
import TeamMembers from '../components/TeamMembers.js';
import './home.css'
import Card from '../components/Card.js';


export default function Home() {
    return (
        <div>
            <div>
                <Documents/>
            </div>

            <div>
                <TeamMembers/>
            </div>
        </div>
    );
};

