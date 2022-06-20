import React from "react";
import styled from "styled-components";
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
      <>
        {theme === "light" ? (
          <Icons>
            <FaMoon />
          </Icons>
        ) : (
          <Icons>
            <FaSun />
          </Icons>
        )}
      </>
    </div>
  );
};

export default Toggle;

const Icons = styled.h1`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
`;
