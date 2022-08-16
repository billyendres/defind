import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";
import { ConnectButton } from "web3uikit";

const Login = () => {
  const { isAuthenticating, isAuthenticated } = useMoralis();

  return (
    <Wrapper>
      {isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <>
          {!isAuthenticated && (
            <div>
              <ConnectButton />
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  margin-bottom: -2rem;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
