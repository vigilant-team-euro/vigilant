// OrderCard.js
import React from "react";
import imageSrc from '../images/docs.png';

function Document({ bgClass, title, deadline }) {
  return (
    <div className={`col-md-4 col-xl-3 h-100`}>
      <div className={`card ${bgClass} order-card `}>
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
    </div>
  );
}

export default Document;