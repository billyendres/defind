import React from "react";
import styled from "styled-components";
import Twitter from "../Styles/Twitter";

const Footer = () => {
  return (
    <Wrapper>
      <H3>DeFind.tech 2022</H3>
      <Twitter />
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
`;

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 1.55rem;
  padding: 1.5rem;

  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.162rem;
    padding: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    padding: 0.75rem;
  }
`;
