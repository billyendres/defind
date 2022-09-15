import React from "react";
import logo from "../components/images/twitterlogo.png";
const Logo = () => {
  return (
    <div>
      <img
        style={{ maxHeight: "100vh", width: "auto" }}
        src={logo}
        alt="Twitter logo"
      />
    </div>
  );
};

export default Logo;
