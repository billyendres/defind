import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Header />
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #f7579c;
`;
