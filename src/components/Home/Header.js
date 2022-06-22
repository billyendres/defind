import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <motion.div
        style={{ display: "flex" }}
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 7,
          duration: 1,
        }}
      >
        <HeaderText>Web3</HeaderText>
      </motion.div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const HeaderText = styled.h1`
  font-size: 3.5rem;
  font-family: "Bungee", cursive;
  background: -webkit-linear-gradient(
    161deg,
    rgba(239, 124, 142, 1) 50%,
    rgba(41, 243, 226, 1) 50%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media screen and (min-width: 768px) {
    font-size: 6rem;
  }

  @media screen and (min-width: 1200px) {
    font-size: 9rem;
  }
  @media screen and (max-height: 391px) {
    font-size: 3.5rem;
  }
`;
