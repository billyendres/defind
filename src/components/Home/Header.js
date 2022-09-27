import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import mainLogoDarkTheme from "../images/mainLogoDarkThemeGlitch.png";
import WorldsBestCryptoBlog from "../images/WorldBestCryptoBlog.png";
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
  const [open, setOpen] = useState(false);

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
        <Logo src={WorldsBestCryptoBlog} alt="DeFind" />
        <H1 style={{ position: "absolute" }} className="main">
          crypto blog
        </H1>
        <Arrow whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSection(pageTwo)} />
        </Arrow>
        <ArrowSmall whileHover={{ scale: 1.1 }}>
          <FaAngleDown onClick={() => scrollToSectionSmall(pageTwoSmall)} />
        </ArrowSmall>
      </Wrapper>
      {/* <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0, y: "-100%" }}
            key="box"
            transition={{
              type: "spring",
              stiffness: "100",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100vw",
                textAlign: "center",
                background: "#040010",
                height: "10vh",
                borderTop: "2px solid #DAEFFF",
                alignItems: "center",
              }}
            >
              <Subheader>WTF is world's worst crypto blog?</Subheader>
            </div>
            <BlockTextBackground>
              <BlockTextWrapper>
                <H4>
                  <p>
                    <b>DISCLAIMER: </b>
                    This is not your typical crypto blog | If you like dull
                    reads and semi-plagarised rewrites then this may not be the
                    place for you.
                  </p>
                  <br />
                  <p>
                    I started world's worst crypto blog cause I'm sick of
                    traditional crypto articles, boring news coverage and clowns
                    talking sh!t on twitter.
                  </p>
                  <br />
                  <p>
                    I'm a software developer, crypto writer and trader - I'm not
                    the best at any of the above, but hey, you can't win em'
                    all!
                  </p>
                </H4>
                <H4>
                  Basically, the plan is to provide web3 content, trading guides
                  and project reviews that aren't completely mind numbing to
                  read.
                  <br />
                  <br />
                  Join me on my journey in talking about web3 sH*t, digging up
                  altcoin g3ms and trying not to lose money trading 1,000x
                  leverage :?
                </H4>
              </BlockTextWrapper>
            </BlockTextBackground>
          </motion.div>
        )}
      </AnimatePresence> */}

      <SubscribeWrapper>
        <Subscribe />
      </SubscribeWrapper>
      <div ref={pageTwo}></div>
      <div ref={pageTwoSmall}></div>
      <div style={{ minHeight: "100vh" }}>
        <Blog />
      </div>
    </>
  );
};

export default Header;

const SubscribeWrapper = styled.div`
  height: 10vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #040010;
  border-top: 2px solid #daefff;
  @media screen and (max-width: 1023px) {
    height: 7.5vh;
  }
  @media screen and (max-width: 600px) {
    height: 6vh;
  }
`;

const BlockTextWrapper = styled.div`
  padding: 2rem 0;
  height: 40vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
  justify-content: center;
  grid-gap: 2rem;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    height: 50vh;
    padding: 1rem 0;
    grid-gap: 1rem;
  }
  @media screen and (max-width: 600px) {
    height: 45vh;
  }
`;

const BlockTextBackground = styled.div`
  width: 100vw;
  border-top: 2px solid #daefff;
  display: flex;
  justify-content: center;

  background: linear-gradient(
    164deg,
    rgba(49, 242, 228, 1) 0%,
    rgba(255, 0, 248, 1) 100%
  );
`;

const H1 = styled.h1`
  font-family: "Phatt", sans-serif;
  text-transform: uppercase;
  font-size: 4rem;
  padding-top: 3rem;
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
    padding-top: 2rem;
    font-size: 2.45rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 1.5rem;
    font-size: 1.5rem;
  }
`;

const H4 = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.1rem;
  width: 35rem;
  color: #040010;
  /* color: #daefff; */

  @media screen and (max-width: 1200px) {
    font-size: 0.9rem;
    width: 27rem;
  }
  @media screen and (max-width: 1023px) {
    font-size: 0.9rem;
    width: 29rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 0.8rem;
  }
`;

const Subheader = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 2rem;
  width: 35rem;
  color: #040010;
  /* color: #daefff; */
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.75rem;
    width: 31rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 1.25rem;
  }
`;

const BackgroundMain = styled.img`
  height: 90vh;
  width: 100vw;
  object-fit: cover;
  position: absolute;
  @media screen and (max-width: 1023px) {
    height: 50vh;
  }
  @media screen and (max-width: 600px) {
    height: 35vh;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
  @media screen and (max-width: 1023px) {
    height: 50vh;
  }
  @media screen and (max-width: 600px) {
    height: 35vh;
  }
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
  bottom: 40vh;
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
    bottom: 50vh;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
    bottom: 65vh;
  }
`;

const Logo = styled.img`
  width: 60rem;
  position: absolute;
  /* z-index: 1; */
  @media screen and (max-width: 1023px) {
    width: 35rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 17.5vh;
  /* padding-top: 15rem; */
  @media screen and (max-width: 1023px) {
    bottom: 57.5vh;
  }
  @media screen and (max-width: 600px) {
    padding-top: 8rem;
  }
`;
