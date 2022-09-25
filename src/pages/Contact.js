import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaTelegram, FaTwitterSquare, FaMailBulk } from "react-icons/fa";

const Contact = () => {
  return (
    <Wrapper>
      <motion.div
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <H1>Get</H1>
        <H1 className="main">In touch</H1>
        <br />
        <H4>
          Blockchain, Web3 and trading can be complicated. <br />
          <br />
          Our goal is to make the complex - simple.
          <br />
          <br />
          If you have a suggestion for an article or would like to learn more,
          please feel free to reach out, we'd love to hear from you!
        </H4>
        <br />
        <H4>
          <IconWrapper>
            <FaMailBulk />
          </IconWrapper>
          <Bold>contact@defind.tech</Bold>
        </H4>
        <br />

        <H4>
          <IconWrapper>
            <FaTwitterSquare />
          </IconWrapper>
          <Anchor
            href="https://twitter.com/defind_web3"
            target="_blank"
            rel="noopener noreferrer"
            alt="Apply"
          >
            <Bold>https://twitter.com/defind_web3</Bold>
          </Anchor>
        </H4>
        <br />
        <H4>
          <IconWrapper>
            <FaTelegram />
          </IconWrapper>
          <Anchor
            href="https://t.me/defind_web3"
            target="_blank"
            rel="noopener noreferrer"
            alt="Apply"
          >
            <Bold>https://t.me/defind_web3</Bold>
          </Anchor>
        </H4>
      </motion.div>
    </Wrapper>
  );
};

export default Contact;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
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
  font-size: 1.25rem;
  padding-left: 1rem;
  width: 35rem;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1.15rem;
    width: 27rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 1rem;
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
