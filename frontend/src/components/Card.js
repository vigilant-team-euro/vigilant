import React from 'react'
import "./card.css";


function Card() {
    return (
    <div className="component">
      <p className="text-wrapper">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.
      </p>
      <img className="image" alt="Image" src="market.png" />
    </div>
  );
};
export default Card
