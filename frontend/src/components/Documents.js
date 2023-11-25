// Documents.js
import React from "react";
import OrderCard from "./Document";
import "./documents.css";

function Documents() {
  return (
    <div className="container-fluid">
      <div className="row justify-content-around p-1">
        <OrderCard
          bgClass="bg-c-blue"
          title="Project Specification Report"
          deadline={"21.09.2001"}
        />
        <OrderCard
          bgClass="bg-c-green"
          title="Analysis and Requirements Report"
          deadline={"21.09.2001"}
        />

        <OrderCard
          bgClass="bg-c-pink"
          title="Detailed Design Report"
          deadline={"21.09.2001"}
        />

        <OrderCard
          bgClass="bg-c-purple"
          title="Final Report"
          deadline={"21.09.2001"}
        />

        
      </div>
    </div>
  );
}

export default Documents;
