import React from "react";
import StoreCard from "./StoreCard";

const StoresList = ({ title, type, data, options, height }) => {
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

 
  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title || "My Stores"}</div>
      <div style={scrollableContainerStyle}>
        <div className="d-flex flex-row ">
          <StoreCard text="General" />
          <StoreCard text="Store 1" />
          <StoreCard text="Store 2" />
          <StoreCard text="Store 3" />
          <StoreCard text="Store 4" />

          {/* Add more StoreCard components as needed */}
        </div>
      </div>
    </div>
  );
};

export default StoresList;
