import React from "react";

const StoreComponent = ({ title, type, data, options }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#262134", // Set the background color
    height: "88.8vh",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "white", // Set the font color to white
    textAlign: "center", // Center the title
  };

  return <div style={cardStyle}></div>;
};

export default StoreComponent;
