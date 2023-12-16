import React from "react";
import "./storeCard.css";

const StoreCard = ({ type, text }) => {

  const cardStyle = {
    background: "linear-gradient(45deg, #2d404f, #2d404f)",
    borderRadius: "8px",
    padding: "16px",
    margin: "2px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const buttonStyle = {
    fontWeight: "bold",
    color: "white",
  };

  return (
    <div className="card card-body" style={cardStyle}>
      <button className={`store-button ${type}`} style={buttonStyle}>{text}</button>
    </div>
  );
};

export default StoreCard;
