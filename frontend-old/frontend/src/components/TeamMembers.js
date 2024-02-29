import React from "react";
import "./TeamMembers.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamMember from "./TeamMember";
import team from "../images/team.jpg";
function TeamMembers() {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/svg-with-js.min.css"
        integrity="sha512-W3ZfgmZ5g1rCPFiCbOb+tn7g7sQWOQCB1AkDqrBG1Yp3iDjY9KYFh/k1AWxrt85LX5BRazEAuv+5DV2YZwghag=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />

      <section class="team-section py-1">
        <div class="container-fluid">
          <div class="row justify-content-center p-4">
          
            <TeamMember
            bgClass="bg-c-blue"
              name="Onur Asım İlhan"
              image="https://media.licdn.com/dms/image/C5603AQHw_cCLgYggCA/profile-displayphoto-shrink_800_800/0/1659453623119?e=1707350400&v=beta&t=c0ALUq420HDxe2UQaOC0Wm9OWJktEbJjJi73Q8FUIQ0"
            />
            <TeamMember
            bgClass="bg-c-blue"
              name="Efe Erkan"
              image="https://media.licdn.com/dms/image/C4D03AQGcl6Irh9xwTQ/profile-displayphoto-shrink_100_100/0/1651777364038?e=1707350400&v=beta&t=2njRSwGxCC31cK-LtRvBAPYl2R8z9JrrUmhflFU1CL4"
            />
            <TeamMember
            bgClass="bg-c-blue"
              name="Recep Uysal"
              image="https://ideacdn.net/idea/ft/16/myassets/blogs/blog-33.jpeg?revision=1678278416"
            />
            <TeamMember
            bgClass="bg-c-blue"
              name="Uygar Onat"
              image="https://media.licdn.com/dms/image/C4E03AQGu_xlquvcsTw/profile-displayphoto-shrink_400_400/0/1647302699268?e=1707350400&v=beta&t=iBkyPJP1TMF-lCJiO5BQsj12XwRAY_VPFcHfeZRgn1A"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamMembers;
