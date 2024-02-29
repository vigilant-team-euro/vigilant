// OrderCard.js
import React from "react";
import imageSrc from '../images/docs.png';

function Document({ bgClass, title, deadline, link }) {
  const linkStyle = {
    textDecoration: 'none', // Removes underlining
    color: 'inherit', // Inherits the text color
  };

  return (
    <div className={`col-md-4 col-xl-3 h-100`}>
      <a href={link} target="_blank" rel="noopener noreferrer" style={linkStyle} className="card-link">
        <div className={`card ${bgClass} order-card text-white`}>
          <div className="card-block">
            <h6 className="text-center m-b-20"><strong>{title}</strong></h6>
            <h2 className="text-center">
              <img className="card-img-top mx-auto w-50 h-50" src={imageSrc} alt="Document" />
            </h2>
            <p className="m-b-0 text-center pt-2 ">
              <strong>Deadline:</strong> {deadline}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default Document;
