import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import mainLogo from "../images/mainLogo.png";
import mainLogoDarkTheme from "../images/mainLogoDarkTheme.png";
import Button from "../Styles/Button";
import { Links } from "../Styles/Links";
import { FaBookReader } from "react-icons/fa";
import Login from "../Authentication/Login";
import theProblem from "../images/theProblem.png";
import theSolution from "../images/theSolution.png";

const Header = () => {
  const [theme, setTheme] = useState("dark");

  const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    setTheme(localTheme);
    console.log(theme);
  }, [theme, localTheme]);
  return (
    <>
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
          }}
        >
          <Logo
            src={theme === "dark" ? mainLogoDarkTheme : mainLogo}
            alt="DeFind"
          />
        </motion.div>
        <Login />
        <LearnMore>
          <Links to="/guide">
            <Button
              text={
                <>
                  <FaBookReader
                    style={{ marginBottom: "-0.1rem", marginRight: "0.5rem" }}
                  />
                  Guide
                </>
              }
            />
          </Links>
        </LearnMore>
      </Wrapper>
      <img src={theProblem} />
      <img src={theSolution} />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
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

const LearnMore = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100000;
  /* margin-bottom: 3rem; */
`;
