import React, { useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "../Styles/LoadingSpinner";
import { FaSignInAlt } from "react-icons/fa";
import Button from "../Styles/Button";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    authenticate,
    isAuthenticating,
    isAuthenticated,
    Moralis,
    authError,
  } = useMoralis();
  const navigate = useNavigate();

  const login = async () => {
    try {
      if (!isAuthenticated) {
        await authenticate({
          provider: "web3Auth",
          clientId:
            "BFNj6-GO2sCnBHQRLzxhr37jeUt0SavOaDxIf8opr7hDFxsypg1TJQX2_vMjlZ11tk7pQ2nDmWbq8Wq13sBVeDA",
          chainId: Moralis.Chains.ETH_ROPSTEN,
          loginMethodsOrder: [
            "facebook",
            "google",
            "github",
            "twitter",
            "apple",
            "reddit",
            "discord",
            "email_passwordless",
          ],
        });
      }
      setIsLoading(true);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      {isLoading || isAuthenticating ? (
        <LoadingSpinner />
      ) : (
        <>
          <Button
            onClick={login}
            disabled={isAuthenticating}
            text={
              <>
                Login
                <FaSignInAlt
                  style={{ marginBottom: "-0.2rem", marginLeft: "0.5rem" }}
                />
              </>
            }
          />
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
  min-height: 100vh;
`;
