import React from "react";
import styled from "styled-components";
import { Twitter, Contact } from "../Styles/FooterStyles";
import { FaCopyright } from "react-icons/fa";
import Subscribe from "../Subscribe/Subscribe";

const Footer = () => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Twitter />
          <Contact />
          <Subscribe />
        </div>
      </div>
      <H3>
        World's worst crypto blog{" "}
        <FaCopyright style={{ color: "#31f2e4", margin: "0 0.5rem" }} /> 2022
      </H3>
      <H4>
        It's definitely not copyrighted - but everyone seems to do that so yea
      </H4>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #040010;
  border-top: 1px solid #daefff;
  height: 30vh;
  width: 100vw;
  @media screen and (max-width: 1023px) {
    height: 25vh;
  }
`;
const H4 = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.1rem;
  width: 30rem;
  /* color: #040010; */
  color: #daefff;

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

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 1.25rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
    padding: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
`;
