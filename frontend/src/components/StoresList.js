import React from "react";
import StoreCard from "./StoreCard";
import { db } from "../config/firebase";
import { collection, getData, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const StoresList = (props) => {

  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('http://localhost:5000/getStoreNames', myParams)
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
        setLoading(false);

        setError(null);
      })
      .catch((error) => {
        setLoading(false);

        setError(error.message);
      });
  }, []);
 
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{props.title || "My Stores"}</div>
      <div style={scrollableContainerStyle}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="d-flex flex-row ">
            <StoreCard text="General" clickStore={chooseStore} />
            {stores.map((store, index) => (
              <StoreCard key={index} text={store} clickStore={chooseStore} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoresList;
