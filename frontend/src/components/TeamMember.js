import React from "react";
import "./TeamMembers.css";
import "bootstrap/dist/css/bootstrap.min.css";

function TeamMember(props) {
  const { name, image, role, description } = props;

  return (
    <div className="col-8 col-md-4 col-lg-3">
      <div className="card border-0 shadow-lg pt-5 my-5 position-relative">
        <div className="card-body p-4">
          <div className="member-profile position-absolute w-100 text-center">
            <img
              className="rounded-circle mx-auto d-inline-block shadow-sm"
              src={image}
              alt={name}
            />
          </div>
          <div className="card-text pt-1">
            <h5 className="member-name mb-0 text-center text-primary font-weight-bold">
              {name}
            </h5>
            <div className="mb-3 text-center">{role}</div>
            <div>{description}</div>
          </div>
        </div>
        <div className="card-footer theme-bg-primary border-0 text-center">
          <ul className="social-list list-inline mb-0 mx-auto">
            <li className="list-inline-item">
              <a className="text-dark" href="#/">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li className="list-inline-item">
              <a className="text-dark" href="#/">
                <i class="fa-brands fa-github"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
