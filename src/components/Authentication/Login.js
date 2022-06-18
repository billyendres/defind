import React, { useEffect } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";

const Login = () => {
  const { authenticate, isAuthenticating, enableWeb3 } = useMoralis();

  useEffect(() => {
    enableWeb3();
  }, [enableWeb3]);

  return (
    <Wrapper>
      {isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <Button
          onClick={() => authenticate()}
          disabled={isAuthenticating}
          text="Login with MetaMask"
        />
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
`;
