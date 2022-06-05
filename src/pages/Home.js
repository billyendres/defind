import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import Subheader from "../components/Home/Subheader";
import Login from "../components/Home/Metamask";

const Home = () => {
  return (
    <>
      <Wrapper>
        <div>
          <Header />
          <Subheader />
          <Login />
        </div>
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
