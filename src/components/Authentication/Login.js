import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";
import { ConnectButton } from "web3uikit";

const Login = () => {
  const { isAuthenticating } = useMoralis();

  return (
    <Wrapper>
      {isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <>
          <ConnectButton />
        </>
      )}
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
  min-height: 50vh;
`;
