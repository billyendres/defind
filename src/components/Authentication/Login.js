import React, { useEffect } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";

const Login = () => {
  const { authenticate, isAuthenticating, authError, enableWeb3 } =
    useMoralis();

  useEffect(() => {
    enableWeb3();
  }, [enableWeb3]);

  return (
    <Wrapper>
      <div style={{ height: "5rem" }}>
        {isAuthenticating && <LoadingSpinner />}
        {authError && <p>{JSON.stringify(authError.message)}</p>}
      </div>
      <button onClick={() => authenticate()} disabled={isAuthenticating}>
        <h1 style={{ fontSize: "2rem", padding: "0.75rem 1rem" }}>
          Login With MetaMask
        </h1>
      </button>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;
