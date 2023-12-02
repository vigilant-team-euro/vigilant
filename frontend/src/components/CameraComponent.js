import React from "react";

const CameraComponent = ({ title, type, height, width }) => {
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
      
      <div className="container text-white">
        <div className="row flex-nowrap overflow-auto">
          <div className="col-md-4">123123</div>
          <div className="col-md-4">123123</div>
          <div className="col-md-4">123123</div>
          <div className="col-md-4">123123</div>
          <div className="col-md-4">123123</div>

        </div>
      </div>
    </div>
  );
};

export default CameraComponent;
