import Header from "../components/Header.js";
import { useState } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Documents from "../components/Documents.js";
import TeamMembers from "../components/TeamMembers.js";
import "./home.css";
import Card from "../components/Card.js";
import Features from "../components/Features.js";
import image from "../images/mainPage.jpeg";

export default function Home() {
  return (
    <div class="back">
      <img src={image} className="img-fluid " alt="Your Image Alt Text" />

      <div>
        <Features />
      </div>
      <div>
        <Documents />
      </div>

      <div>
        <TeamMembers />
      </div>
    </div>
  );
}
