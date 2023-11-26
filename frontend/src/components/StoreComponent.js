import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faLock, faUnlock, faDesktop } from "@fortawesome/free-solid-svg-icons";

const Card2 = ({ cardTitle, cardContent, opacity, type }) => {
  const cardStyle = {
    position: "relative",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#2d404f",
    opacity: opacity || 1,
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#fff",
  };

  const contentStyle = {
    fontSize: "14px",
    color: "#fff",
  };

  const iconStyle = {
    position: "absolute",
    top: "50%",
    right: "16px",
    transform: "translateY(-50%)",
    color: "#fff",
    fontSize: "2em"
  };

  return (
    <div style={cardStyle}>
      
      <div style={titleStyle}>{cardTitle || "Card Title"}</div>
      <div style={contentStyle}>{cardContent || "Card Content"}</div>
      <FontAwesomeIcon icon={type} style={iconStyle} />
      
    </div>
  );
};

const StoreComponent = ({ title, type, height }) => {
  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#262134",
    height: height,
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "16px",
    color: "white",
    textAlign: "center",
  };

  return (
    <div style={cardStyle}>
      <div style={titleStyle}>{title || "Default Title"}</div>
      <Card2 cardTitle="Heatmap Analysis" cardContent="Detailed analysis of customers walking path, visualized in heatmap" type={faCheck}/>
      <Card2 cardTitle="Camera Settings" cardContent="Adding, removing cameras and video footage" type={faDesktop} />
      <Card2 cardTitle="Employee List" cardContent="Adding, removing employees to system" type={faDesktop} />
      <Card2 cardTitle="Forcasting" cardContent="Forecasting the future" type={faLock} opacity={0.5} />
      <Card2 cardTitle="Payment Records" cardContent="Records of payments obtained from shop" type={faLock} opacity={0.5} />
    </div>
  );
};

export default StoreComponent;
