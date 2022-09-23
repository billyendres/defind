import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import mainLogoDarkTheme from "../images/mainLogoDarkThemeGlitch.png";
import { FaAngleDown } from "react-icons/fa";
import backgroundMain from "../images/background.png";
import Button from "../Styles/Button";
import { Links } from "../Styles/Links";
import Blog from "../../pages/Blog";
import Footer from "./Footer";
import Subscribe from "../Subscribe/Subscribe";

const Header = () => {
  const pageTwo = useRef(null);
  const pageTwoSmall = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <BackgroundMain src={backgroundMain} alt={backgroundMain} />
        <Logo src={mainLogoDarkTheme} alt="DeFind" />
        <H1 style={{ position: "absolute" }} className="main">
          Web3 portal
        </H1>
        <Arrow whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSection(pageTwo)} />
        </Arrow>
        <ArrowSmall whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSectionSmall(pageTwoSmall)} />
        </ArrowSmall>
      </Wrapper>
      {/* <BlockTextWrapper ref={pageTwo}>
        <div ref={pageTwoSmall}></div>
        <H2 ref={pageTwoSmall}>The web3</H2>
        <H1 className="main">Revolution</H1>
        <H1>awaits</H1>
        <H3>CRYPTO - BLOCKCHAIN - WEB3 - DEFI</H3>
        <H4>
          <p>Decentralised technologies are often overcomplicated. </p>
          <br />
          <p>
            Our goal is to provide up-to-date educational resources and make{" "}
            <b style={{ color: "#31f2e4" }}>complex</b> -{" "}
            <b style={{ color: "#ff00ff" }}>simple.</b>
          </p>
          <br />
          <p>
            Reiventing <b style={{ color: "#31f2e4" }}>news</b> &
            <b style={{ color: "#ff00ff" }}> reviews</b>, for the world of web3.{" "}
          </p>
          <br />
        </H4>
      </BlockTextWrapper> */}
      <BlockTextWrapper>
        {/* <H1 className="main">Revolution</H1> */}
        <Subscribe />
      </BlockTextWrapper>
      <div ref={pageTwo}></div>
      <div ref={pageTwoSmall}></div>
      <div style={{ minHeight: "100vh" }}>
        <Blog />
      </div>
    </>
  );
};

export default Header;

const BlockTextWrapper = styled.div`
  width: 100vw;
  height: 10vh;
  border-top: 1px solid #daefff;
  display: flex;
  flex-direction: column;
  background: #040010;

  /* min-height: 100vh; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const H2 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 2rem;
  padding-left: 1rem;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const H1 = styled.h1`
  font-family: "Phatt", sans-serif;
  text-transform: uppercase;
  font-size: 3.85rem;
  padding-top: 1.5rem;
  color: #daefff;
  &.main {
    color: #31f2e4;
    filter: drop-shadow(0px 0px 14px #31f2e4);
    -webkit-animation: glow 2s ease-in-out infinite alternate;
    -moz-animation: glow 2s ease-in-out infinite alternate;
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from {
      filter: drop-shadow(0px 0px 14px #31f2e4);
      color: #31f2e4;
    }
    to {
      filter: drop-shadow(0px 0px 14px rgb(255, 0, 255));
      color: rgb(255, 0, 255);
    }
  }
  @media screen and (max-width: 1023px) {
    padding-top: 1rem;
    font-size: 2.65rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 0.75rem;
    font-size: 1.6rem;
  }
`;

const H3 = styled.div`
  font-family: "Phatt", sans-serif;
  text-transform: uppercase;
  font-size: 1.55rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1.162rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
`;

const H4 = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.1rem;
  padding-left: 1rem;
  width: 35rem;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 0.9rem;
    width: 27rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 0.8rem;
  }
`;

const BackgroundMain = styled.img`
  height: 90vh;
  width: 100vw;
  object-fit: cover;
  position: absolute;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  height: 90vh;
  /* position: relative; */
`;

const Arrow = styled(motion.div)`
  position: absolute;
  bottom: 10vh;
  text-decoration: none;
  cursor: pointer;
  font-size: 3rem;
  color: #31f2e4;
  filter: drop-shadow(0px 0px 14px #31f2e4);

  -webkit-animation: glow 2s ease-in-out infinite alternate;
  -moz-animation: glow 2s ease-in-out infinite alternate;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      filter: drop-shadow(0px 0px 14px #31f2e4);
      color: #31f2e4;
    }
    to {
      filter: drop-shadow(0px 0px 14px rgb(255, 0, 255));
      color: rgb(255, 0, 255);
    }
  }

  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const ArrowSmall = styled(motion.div)`
  position: absolute;
  bottom: 10vh;

  text-decoration: none;
  cursor: pointer;
  display: none;
  color: #31f2e4;
  filter: drop-shadow(0px 0px 14px #31f2e4);
  -webkit-animation: glow 2s ease-in-out infinite alternate;
  -moz-animation: glow 2s ease-in-out infinite alternate;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from {
      filter: drop-shadow(0px 0px 14px #31f2e4);
      color: #31f2e4;
    }
    to {
      filter: drop-shadow(0px 0px 14px rgb(255, 0, 255));
      color: rgb(255, 0, 255);
    }
  }

  @media screen and (max-width: 1023px) {
    display: inline;
    font-size: 2.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Logo = styled.img`
  width: 50rem;
  position: absolute;
  /* z-index: 1; */
  @media screen and (max-width: 1023px) {
    width: 35rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
  }
`;
