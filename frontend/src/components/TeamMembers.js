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

      <section class="team-section py-5">
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
              image="https://media.licdn.com/dms/image/C4E03AQGu_xlquvcsTw/profile-displayphoto-shrink_800_800/0/1647302699268?e=1700697600&v=beta&t=u5lmzX2nrtSs3-aT-kzuoYeU1YAKSjhz3Qal6TtE9GU"
              role="Kedicik"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <TeamMember
              name="Efe Erkan"
              image="https://media.licdn.com/dms/image/C4D03AQGcl6Irh9xwTQ/profile-displayphoto-shrink_800_800/0/1651777364038?e=1700697600&v=beta&t=zHy0W_KqD0GwMB8y5onGt2gCPS2jvO0c_fZxLN2-Kvk"
              role="Kedicik"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            />
            <TeamMember
              name="Onur Asım İlhan"
              image="https://media.licdn.com/dms/image/C5603AQHw_cCLgYggCA/profile-displayphoto-shrink_800_800/0/1659453623119?e=1700697600&v=beta&t=8dI2FGQ8NttDfUdOapIQd7C2V-GpLZ5rr_cHdbi_yf8"
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
