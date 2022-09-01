import React, { useEffect } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";

const Login = () => {
  const { isAuthenticating, isAuthenticated, Moralis } = useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      try {
        const user = await Moralis.authenticate();
        await Moralis.enableWeb3();
        window.localStorage.setItem("userLocal", user.get("ethAddress"));
        window.location.reload();
      } catch (e) {
        console.log("auth failed", e);
      }
    }
  };

  const loginWc = async () => {
    if (!isAuthenticated) {
      try {
        const user = await Moralis.authenticate({
          provider: "walletconnect",
          signingMessage: "DeFind Auth",
          mobileLinks: ["metamask", "rainbow", "argent", "trust"],
        });
        await Moralis.enableWeb3({ provider: "walletconnect" });
        window.localStorage.setItem("userLocal", user.get("ethAddress"));
        window.location.reload();
      } catch (e) {
        console.log("auth failed", e);
      }
    }
  };

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
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                marginRight: "12rem",
                marginTop: "1.1rem",
                zIndex: 100000,
              }}
            >
              {window.innerWidth > 100 && (
                <>
                  <Button onClick={login} text="metamask" />
                  <Button onClick={loginWc} text="walletconnect" />
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Login;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
