import React from "react";
import Document from "./Document.js";

function Documents() {
  return (
    <div>
      <section class="team-section py-5">
        <div class="container">
          <div class="row justify-content-center">
            <Document />
            <Document />
            <Document />
            <Document />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Documents;
