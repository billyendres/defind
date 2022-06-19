import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <Wrapper>
      <Spinner>
        <Container></Container>
      </Spinner>
    </Wrapper>
  );
};

export default LoadingSpinner;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const spinner = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid rgba(239, 124, 142, 1);
  border-top: 10px solid #100b3c;

  border-radius: 50%;
  animation-name: ${spinner};
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
`;

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
`;
