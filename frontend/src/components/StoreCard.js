import React from "react";
import "./storeCard.css";
import { db } from "../config/firebase";
import { collection, getData, getDocs, listCollections, doc } from "firebase/firestore";
import { useState } from "react";

const StoreCard = ({ type, text }) => {
  const collectionRef = collection(db, 'store2')
  const [ages, setAges] = useState([]);
  const [genders, setGenders] = useState([]);
  const [emotions, setEmotions] = useState([]);

  const cardStyle = {
    background: "linear-gradient(45deg, #2d404f, #2d404f)",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    fontWeight: "bold",
    color: "white",
  };

  const fetchDataFromFirestore = async () => {
    const agesArr = [];
    const gendersArr = [];
    const emotionsArr = [];
    const querySnapshot = getDocs(collectionRef).then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        agesArr.push(doc.get("age"))
        gendersArr.push(doc.get("gender"))
        emotionsArr.push(doc.get("emotion"))
      })
    });
    setAges(agesArr)
    setGenders(gendersArr)
    setEmotions(emotionsArr)

};

  return (
    <div className="card card-body" style={cardStyle}>
      <button className={`store-button ${type}`} onClick={fetchDataFromFirestore} style={buttonStyle}>{text}</button>
    </div>
  );
};

export default StoreCard;
