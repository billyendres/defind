import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import mainLogoDarkTheme from "../images/mainLogoDarkThemeGlitch.png";
import { FaAngleDown } from "react-icons/fa";
import backgroundMain from "../images/background.png";
import Button from "../Styles/Button";
import { Links } from "../Styles/Links";

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
        <Logo src={mainLogoDarkTheme} alt="DeFind" />
        <BackgroundMain src={backgroundMain} alt={backgroundMain} />
        <Arrow whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSection(pageTwo)} />
        </Arrow>
        <ArrowSmall whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSectionSmall(pageTwoSmall)} />
        </ArrowSmall>
      </Wrapper>
      <BlockTextWrapper ref={pageTwo}>
        <H2 ref={pageTwoSmall}>We're</H2>
        <H1 className="main">Reinventing</H1>
        <H1>Jobs</H1>
        <H3>Blockchain - crypto - defi - web3</H3>
        <H4>
          <p>Decentralised technologies are evolving rapidly.</p>
          <br />
          <p>
            The problem is that companies struggle to find candidates to fill
            positions, and job seekers have nowhere to advertise themselves.
          </p>
          <br />
          <p>
            We aim to <b>break</b> and <b>reinvent</b> traditional job boards to
            suit the web3 revolution.
          </p>
          <br />
          <p>
            DeFind's web3 Career Poral supports listings for <b>job posters </b>
            and <b>job seekers</b> - matching candidates with careers
            efficiently and effectively.
          </p>
          <br />
        </H4>
        <Links to="learn">
          <Button text="Learn More" />
        </Links>
      </BlockTextWrapper>
    </>
  );
};

export default Header;

const BlockTextWrapper = styled.div`
  width: 50rem;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  text-align: left;
  justify-content: center;
  @media screen and (max-width: 1023px) {
    width: 35rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
  }
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

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 4.5rem;
  padding-left: 1rem;
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
    padding-left: 0.5rem;
    font-size: 3.375rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.8rem;
  }
`;

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
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
  bottom: 0;

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
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Logo = styled.img`
  width: 50rem;
  position: absolute;
  z-index: 1;
  @media screen and (max-width: 1023px) {
    width: 35rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
  }
`;
