import React from "react";
import Document from "./Document.js";
import DocsImage from "../images/docsImage.jpeg";

function Documents() {
  return (
    <div>
      <section class="team-section py-2">
        <div class="container">
          <div class="row justify-content-center">
            <Document title="Project Specifaction Report" imageUrl={DocsImage} deadline="31.62.2069" />
            <Document title="Project Specifaction Report" imageUrl={DocsImage} deadline="31.62.2069" />
            <Document title="Project Specifaction Report" imageUrl={DocsImage} deadline="31.62.2069" />
            <Document title="Project Specifaction Report" imageUrl={DocsImage} deadline="31.62.2069" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Documents;
