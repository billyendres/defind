import React from "react";
import styled from "styled-components";
import { FaRegSurprise } from "react-icons/fa";
import Button from "../components/Styles/Button";
import { Links } from "../components/Styles/Links";

const PageNotFound = () => {
  return (
    <Wrapper>
      <Header>
        <span>
          4<FaRegSurprise />4
        </span>
        <br />
        Page not found
      </Header>
      <Links to="/">
        <Button text="Home" />
      </Links>
    </Wrapper>
  );
};

export default PageNotFound;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Header = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;
