import React from "react";
import StoreCard from "./StoreCard";
import { db } from "../config/firebase";
import { collection, getData, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const StoresList = (props) => {

  const [stores, setStores] = useState([]);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "12px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#262134",
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "6px",
    color: "white",
    textAlign: "center",
  };

  const scrollableContainerStyle = {
    overflowX: "hidden", // Hide the horizontal scrollbar
    overflowY: "auto",   // Add vertical scrollbar if needed
    display: "flex",     // Use flex display for horizontal scrolling
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Center the content vertically
  };

  const chooseStore = (storeName) => {
    props.getStoreName(storeName);
  }

  useEffect(() => {
    var myParams = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
  };
    fetch('http://localhost:5000/getStoreNames', myParams)
      .then((response) => {return response.json()})
      .then((data) => {
        const items = data;
        setStores(items)
      })
  },[])
 
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{props.title || "My Stores"}</div>
      <div style={scrollableContainerStyle}>
        <div className="d-flex flex-row ">

          <StoreCard text="General" clickStore={chooseStore}/>
          <StoreCard text={stores[2]} clickStore={chooseStore}/>
          <StoreCard text={stores[1]} clickStore={chooseStore}/>
          <StoreCard text={stores[0]} clickStore={chooseStore}/>

          {/* Add more StoreCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default StoresList;
