import React from 'react'
import {  useNavigate } from 'react-router-dom';

function GraphSettings(props) {
    
    const navigate = useNavigate();
    const forecastClick = () =>{
        navigate(`/forecast/${props.id}`);
    }
  return (
    <div>
     <button>Choose Time</button>
        <button onClick={forecastClick}>Forecast</button>
    </div>
  )
}

export default GraphSettings