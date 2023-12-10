import React from "react";
import StoreCard from "./StoreCard";
import { db } from "../config/firebase";
import { collection, getData, getDocs } from "firebase/firestore";
import { useState } from "react";

const StoresList = ({ title, type, data, options, height }) => {
  const collectionRef = collection(db, 'branches')
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#262134",
  };

  const titleStyle = {
    fontSize: "18px",
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
 
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title || "My Stores"}</div>
      <div style={scrollableContainerStyle}>
        <div className="d-flex flex-row ">
          while (fetchDataFromFirestore) {
            
          }
          <StoreCard text="General" />
          <StoreCard text="branch1" />
          <StoreCard text="store2" />
          <StoreCard text="branches" />
          <StoreCard text="Store 4" />

          {/* Add more StoreCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default StoresList;
