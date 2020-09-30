import React from "react";
import Image from './image'
import SocialMenu from "./SocialMenu";

const Header = () => {
  return (
    <div id="header">
      <Image />
      <p id="bio">
        Computational physicist and absolutely fascinated by natural phenomena.
      </p>
      <SocialMenu />
    </div>
  );
};

export default Header;
