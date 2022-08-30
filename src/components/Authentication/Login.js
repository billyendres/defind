import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";
import { ConnectButton } from "web3uikit";

const Login = () => {
  const { isAuthenticating, isAuthenticated } = useMoralis();

  return (
    <>
      {isAuthenticating ? (
        <Wrapper
          style={{ position: "absolute", width: "100vw", height: "100vh" }}
        >
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <>
          {!isAuthenticated && (
            <Wrapper>
              <ConnectButton signingMessage="DeFind authentication" />
            </Wrapper>
          )}
        </>
      )}
    </>
  );
};

export default Login;

const Wrapper = styled.div`
  margin-top: -2rem;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
