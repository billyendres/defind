import React from "react";
import styled from "styled-components";
import { Twitter, Contact } from "../Styles/FooterStyles";
import { FaCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <Wrapper>
      <H3>
        DeFind.tech{" "}
        <FaCopyright style={{ color: "#31f2e4", margin: "0 0.5rem" }} /> 2022
      </H3>
      <Twitter />
      <Contact />
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #040010;
  border-top: 1px solid #daefff;
  height: 10vh;
`;

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 1.55rem;
  padding: 1.75rem;
  display: flex;
  align-items: center;
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.162rem;
    padding: 1.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    padding: 1.5rem;
  }
`;
