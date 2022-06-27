import React from "react";
import styled from "styled-components";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion } from "framer-motion";

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Wrapper onClick={toggleTheme}>
      <>
        {theme === "light" ? (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Icons>
              <LinkHeaders>
                <FaMoon
                  style={{ marginRight: "1rem", marginBottom: "-0.2rem" }}
                />
                Dark
              </LinkHeaders>
            </Icons>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Icons>
              <LinkHeaders>
                <FaSun
                  style={{ marginRight: "1rem", marginBottom: "-0.2rem" }}
                />
                Light
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
  padding: 1rem;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  text-transform: uppercase;
  /* letter-spacing: 4px; */
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const LinkHeaders = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  border-radius: 0.25rem;
  letter-spacing: 5px;
  font-size: 1.25rem;

  &:hover {
    transition: all 0.5s linear;
    background: ${({ theme }) => theme.buttonHover};
    color: ${({ theme }) => theme.textModals};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;
