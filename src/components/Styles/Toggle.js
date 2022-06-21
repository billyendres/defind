import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Wrapper onClick={toggleTheme}>
      <>
        {theme === "light" ? (
          <Icons>
            <FaMoon style={{ marginRight: "1rem" }} />
            Dark
          </Icons>
        ) : (
          <Icons>
            <FaSun style={{ marginRight: "1rem" }} />
            Light
          </Icons>
        )}
      </>
    </Wrapper>
  );
};

export default Toggle;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  bottom: 0;
`;
