import React, { useEffect } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import LoadingSpinner from "../Styles/LoadingSpinner";
import { FaSignInAlt } from "react-icons/fa";
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
          text={
            <>
              Login with MetaMask
              <FaSignInAlt
                style={{ marginBottom: "-0.2rem", marginLeft: "0.5rem" }}
              />
            </>
          }
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
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
  min-height: 100vh;
`;
