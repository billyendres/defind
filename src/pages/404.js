import React from "react";
import styled from "styled-components";

const PageNotFound = () => {
  return (
    <Wrapper>
      <Header>Page not found</Header>
    </Wrapper>
  );
};

export default PageNotFound;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  text-transform: uppercase;
  font-size: 3rem;
  margin: 1rem;
`;
