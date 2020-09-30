import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const SocialMenu = () => {
  return (
    <ul className="social">
      <li>
        <a
          className="social-link no-select"
          href="https://www.google.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </li>
      <li>
        <a
          className="social-link no-select"
          href="https://www.google.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
      </li>
      <li>
        <a
          className="social-link no-select"
          href="https://www.google.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter />
        </a>
      </li>
    </ul>
  );
};
export default SocialMenu;
