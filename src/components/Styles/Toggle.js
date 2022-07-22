import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Wrapper onClick={toggleTheme}>
      <>
        {theme === "light" ? (
          <div>
            <Icons>
              <LinkHeaders>
                <FaMoon style={{ marginBottom: "-0.15rem" }} />
              </LinkHeaders>
            </Icons>
          </div>
        ) : (
          <div>
            <Icons>
              <LinkHeaders>
                <FaSun style={{ marginBottom: "-0.15rem" }} />
              </LinkHeaders>
            </Icons>
          </div>
        )}
      </>
    </Wrapper>
  );
};

export default Toggle;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  right: 0;
  bottom: 0;
`;

const LinkHeaders = styled.div`
  padding: 0.2rem 0.5rem;
  margin: 1rem 0.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.textModals};
  background: ${({ theme }) => theme.button};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
  }
`;
