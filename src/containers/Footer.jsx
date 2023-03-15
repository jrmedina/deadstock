import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="Footer">
      <a
        className="linkedinAnchor"
        href="https://www.linkedin.com/in/joshua-medina/"
      >
        <LinkedInIcon className="img" />
      </a>

      <a className="githubAnchor" href="https://github.com/jrmedina/deadstock">
        <GitHubIcon className="img" />
      </a>
    </div>
  );
};

export default Footer;
