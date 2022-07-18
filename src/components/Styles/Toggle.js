import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Wrapper onClick={toggleTheme}>
      <>
        {theme === "light" ? (
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Icons>
              <LinkHeaders>
                <FaMoon style={{ marginTop: "0.5rem" }} />
              </LinkHeaders>
            </Icons>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            <Icons>
              <LinkHeaders>
                <FaSun style={{ marginTop: "0.5rem" }} />
              </LinkHeaders>
            </Icons>
          </motion.div>
        )}
      </>
    </Wrapper>
  );
};

export default Toggle;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  /* padding: 1rem; */
  display: flex;
  align-items: center;
  /* margin-right: 1rem; */
  text-transform: uppercase;
  /* letter-spacing: 4px; */
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  right: 0;
  bottom: 0;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const LinkHeaders = styled.div`
  padding: 0.25rem 0.75rem;
  margin: 1rem;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  transition: all 0.5s linear;
  background: ${({ theme }) => theme.buttonHover};
  color: ${({ theme }) => theme.textModals};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  @media screen and (max-width: 600px) {
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.3rem 0.5rem;
  }
`;
