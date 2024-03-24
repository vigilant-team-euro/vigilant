import React from "react";
import { useNavigate } from "react-router-dom";
import "./graphsettings.scss";

function GraphSettings(props) {
  const navigate = useNavigate();
  const forecastClick = () => {
    navigate(`/forecast/${props.id}`);
  };
  return (

      <div onClick={forecastClick} className="half half2">
        <h2>Forecast</h2>
        <img  alt="logo" src="/logo.svg" />      </div>
  );
}

export default GraphSettings;
