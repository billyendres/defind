import React from "react";
import styled from "styled-components";
import Header from "../components/Home/Header";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../components/Styles/LoadingSpinner";

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
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
