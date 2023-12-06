// Card.js
import React from "react";

function Card({ title, text, imageSrc }) {
  return (
    <div className="card m-3 p-0" style={{ borderRadius: "10px" }}>
      <img className="card-img-top p-1" style={{ borderRadius: "10px", height: "300px", objectFit: "cover" }} src={imageSrc} alt="Card image cap" />
     
        <h5 className="card-title text-center mt-2">{title}</h5>
        <p className="card-text p-2 mb-2">{text}</p>
        
    </div>
  );
}

export default Card;