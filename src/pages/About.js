import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaTelegram, FaTwitterSquare, FaMailBulk } from "react-icons/fa";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <motion.div
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <H1>WTF</H1>
        <H1 className="main">is WWCB?</H1>
        <br />
        <H4>
          DISCLAIMER: This is not your typical crypto blog. If you like dull
          reads and semi-plagarised rewrites, this may not be the place for you.
          <br />
          <br />
          Hi, I'm Billy :) I'm the founder, CEO, CFO and intern at world's worst
          crypto blog. I started this site cause I'm sick of traditional crypto
          articles, boring news coverage and clowns talking shit on twitter.
          <br />
          <br />
          Also, I need a place to vent cause my GFs sick of hearing my
          web3-related complaining.
          <br />
          <br />
          I'm a software developer, crypto writer and trader - I'm not the best
          at any of the above, but hey, I sometimes kind of know what I'm
          talking about.
          <br />
          <br />
          Basically, the plan is to provide crypto content, trading guides and
          project reviews that aren't completely mind numbing to read.
          <br />
          <br />
          Join me on my journey in talking about web3, digging up altcoin g3ms
          and trying not to lose money trading 1,000x leverage.
          <br />
          <br />
          PS. I coded the website instead of using a shithouse wordpress
          template. So if somethings broken tell me - like I said, sub par
          skills.
        </H4>
        <br />
      </motion.div>
    </Wrapper>
  );
};

export default About;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  /* flex-direction: column; */
  min-height: 75vh;
  text-align: left;
  padding: 4rem 0 2rem 0;
  background: #040010;
  transition: all 0.5s linear;
  @media screen and (max-width: 1023px) {
    min-height: 80vh;
    padding: 2rem 0 1rem 0;
  }
  @media screen and (max-width: 600px) {
    min-height: 85vh;
  }
`;

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 4rem;
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
    font-size: 3.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.25rem;
  }
`;

const H4 = styled.div`
  display: flex;
  align-items: center;
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.1rem;
  padding-left: 1rem;
  width: 45rem;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1rem;
    width: 30rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 0.9rem;
  }
`;

const Bold = styled.b`
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 1rem;
  @media screen and (max-width: 1023px) {
    margin-left: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0.5rem;
  }
`;

const IconWrapper = styled.div`
  color: #31f2e4;
  font-size: 1.75rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Anchor = styled.a`
  color: #080e57;
  text-decoration: none;
  cursor: pointer;
`;
