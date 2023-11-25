import React from "react";
import "./TeamMembers.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamMember from "./TeamMember";

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
        <div class="container">
          <div class="row justify-content-center">
            <TeamMember
              name="Recep Uysal"
              image="https://omerfaikanli.files.wordpress.com/2017/12/celal-sengor-2466-400x400.png"
              role="Adnan Oktar"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <TeamMember
              name="Uygar Onat"
              image="https://omerfaikanli.files.wordpress.com/2017/12/celal-sengor-2466-400x400.png"
              role="Kedicik"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <TeamMember
              name="Efe Erkan"
              image="https://omerfaikanli.files.wordpress.com/2017/12/celal-sengor-2466-400x400.png"
              role="Kedicik"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <TeamMember
              name="Onur Asım İlhan"
              image="https://omerfaikanli.files.wordpress.com/2017/12/celal-sengor-2466-400x400.png"
              role="Kedicik"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default TeamMembers;
