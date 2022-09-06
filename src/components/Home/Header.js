import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import mainLogo from "../images/mainLogo.png";
import mainLogoDarkTheme from "../images/mainLogoDarkThemeGlitch.png";
import { FaAngleDown } from "react-icons/fa";
import Login from "../Authentication/Login";
import theProblem from "../images/theProblem.png";
import theProblemDarkTheme from "../images/theProblemDarkTheme.png";
import theProblemSmall from "../images/theProblemSmall.png";
import theProblemSmallDarkTheme from "../images/theProblemSmallDarkTheme.png";
import theSolution from "../images/theSolution.png";
import theSolutionDarkTheme from "../images/theSolutionDarkTheme.png";
import theSolutionSmall from "../images/theSolutionSmall.png";
import theSolutionSmallDarkTheme from "../images/theSolutionSmallDarkTheme.png";
import backgroundMain from "../images/background.png";

// background: ${({ theme }) => theme.button};
// color: ${({ theme }) => theme.textModals};

const Header = () => {
  const [theme, setTheme] = useState("dark");
  const problemElement = useRef(null);
  const problemElementSmall = useRef(null);

  const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    setTheme(localTheme);
  }, [theme, localTheme]);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const scrollToSectionSmall = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Wrapper>
        <Logo
          src={theme === "dark" ? mainLogoDarkTheme : mainLogo}
          alt="DeFind"
        />
        <BackgroundMain src={backgroundMain} alt={backgroundMain} />
        <Login />
        <Arrow whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSection(problemElement)} />
        </Arrow>
        <ArrowSmall whileHover={{ scale: 1.1 }}>
          <FaAngleDown
            onClick={() => scrollToSectionSmall(problemElementSmall)}
          />
        </ArrowSmall>
      </Wrapper>
      <TheProblem
        ref={problemElement}
        src={theme === "dark" ? theProblemDarkTheme : theProblem}
        alt="The Problem"
      />
      <TheProblemSmall
        ref={problemElementSmall}
        src={theme === "dark" ? theProblemSmallDarkTheme : theProblemSmall}
        alt="The Problem"
      />
      <TheSolution
        src={theme === "dark" ? theSolutionDarkTheme : theSolution}
        alt="The Solution"
      />
      <TheSolutionSmall
        src={theme === "dark" ? theSolutionSmallDarkTheme : theSolutionSmall}
        alt="The Problem"
      />
    </>
  );
};

export default Header;

const BackgroundMain = styled.img`
  height: 100vh;
  width: 100vw;
  object-fit: cover;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Arrow = styled(motion.div)`
  position: absolute;
  bottom: 0;
  color: #daefff;
  text-decoration: none;
  cursor: pointer;
  font-size: 3rem;

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const ArrowSmall = styled(motion.div)`
  position: absolute;
  bottom: 0;
  color: #daefff;
  text-decoration: none;
  cursor: pointer;
  display: none;

  @media screen and (max-width: 1023px) {
    display: inline;
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Logo = styled.img`
  height: 40rem;
  position: absolute;
  z-index: 1;
  @media screen and (max-width: 1023px) {
    height: 30rem;
  }
  @media screen and (max-width: 600px) {
    height: 20rem;
  }
`;

const TheProblem = styled.img`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const TheProblemSmall = styled.img`
  display: none;
  width: 100%;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;

const TheSolution = styled.img`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const TheSolutionSmall = styled.img`
  display: none;
  width: 100%;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;
