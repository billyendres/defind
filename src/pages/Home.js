import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";

const Home = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <Header />
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Container = styled.div``;
