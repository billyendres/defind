import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <div
      onClick={toggleTheme}
      style={{
        color: "black",
        paddingTop: "5rem",
        zIndex: 1000,
        position: "fixed",
        marginTop: "-2.5rem",
        left: "50%",
      }}
    >
      <h1>{theme === "light" ? <FaMoon /> : <FaSun />}</h1>
    </div>
  );
};

export default Toggle;
