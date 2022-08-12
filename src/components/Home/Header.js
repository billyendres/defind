import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import mainLogo from "../images/mainLogo.png";
import mainLogoDarkTheme from "../images/mainLogoDarkTheme.png";

const Header = () => {
  const [theme, setTheme] = useState("dark");

  const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    setTheme(localTheme);
    console.log(theme);
  }, [theme, localTheme]);
  return (
    <Wrapper>
      {/* <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 7,
          duration: 1,
        }}
      >
        <HeaderText>DeFind</HeaderText>
        <div>Web3 Career Portal</div>
      </motion.div> */}
      <Logo
        // style={{ position: "absolute", top: "10%", bottom: 50 }}
        src={theme === "dark" ? mainLogoDarkTheme : mainLogo}
        alt="DeFind"
      />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  height: 40rem;
  @media screen and (max-width: 1023px) {
    height: 30rem;
  }
  @media screen and (max-width: 600px) {
    height: 20rem;
  }
`;
