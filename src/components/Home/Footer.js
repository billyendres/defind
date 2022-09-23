import React from "react";
import styled from "styled-components";
import { Twitter, Contact } from "../Styles/FooterStyles";
import { FaCopyright } from "react-icons/fa";
import Subscribe from "../Subscribe/Subscribe";

const Footer = () => {
  return (
    <Wrapper>
      <div style={{ display: "flex", alignItems: "center" }}>
        <H3>
          DeFind.tech{" "}
          <FaCopyright style={{ color: "#31f2e4", margin: "0 0.5rem" }} /> 2022
        </H3>
        <Twitter />
        <Contact />
      </div>
      <Subscribe />
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #040010;
  border-top: 1px solid #daefff;
  height: 25vh;
  width: 100vw;
  @media screen and (max-width: 1023px) {
    height: 20vh;
  }
`;

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 1.85rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
    padding: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    padding: 0.5rem;
  }
`;
