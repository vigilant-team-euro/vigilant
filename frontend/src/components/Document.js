import React from "react";
import DocsImage from "../images/docsimage.png";
function Document() {
  return (
    <div class="col-8 col-md-4 col-lg-3">
      <div class="card border-0 shadow-lg my-5 position-relative">
        <div class="card-body ">
          <div class="card-text pt-1">
            <h5 class="member-name mb-0 text-center text-primary font-weight-bold">
              Project Specifaction Report
            </h5>
            <div class="member-profile w-100 text-center">
              <img class=" mx-auto d-inline-block " src={DocsImage} alt="" />
            </div>
          </div>
        </div>
        <div class="card-footer theme-bg-primary border-0 text-center">
          Deadline: 31.62.2069
        </div>
      </div>
    </div>
  );
}

export default Document;
