import Header from "../components/Header.js";
import { useState, useEffect } from "react";
import { auth, googleAuth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import Documents from "../components/Documents.js";
import TeamMembers from "../components/TeamMembers.js";
import "./home.css";
import Card from "../components/Card.js";
import Features from "../components/Features.js";
import image from "../images/mainPage.jpeg";
import Title from "../components/Title.js";

export default function Home() {
  const [imageOpacity, setImageOpacity] = useState(1);
  const [featuresOpacity, setFeaturesOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      // Adjust these values based on your preference
      const newImageOpacity = 1 - scroll / 700;
      const newFeaturesOpacity = 1 - scroll /2000;

      setImageOpacity(newImageOpacity > 0 ? newImageOpacity : 0);
      setFeaturesOpacity(newFeaturesOpacity > 0 ? newFeaturesOpacity : 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="back">
      <img
        src={image}
        className="img-fluid"
        alt="Your Image Alt Text"
        style={{ opacity: imageOpacity }}
      />

      <div class="pt-4" style={{ opacity: featuresOpacity }}>
        <Title title="Features" color="blue" boxSize="300px" />

        <Features />
      </div>
      <div class="pt-5">
        <Title title="Documents" color="blue" boxSize="300px" />
        <Documents />
      </div>

      <div class="pt-5">
        <Title title="Team Members" color="blue" boxSize="300px" />
        <TeamMembers />
      </div>
      
    </div>
  );
}
