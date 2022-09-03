import React, { useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { isAuthenticating, isAuthenticated, Moralis } = useMoralis();
  const [openLogin, setOpenLogin] = useState(false);

  const loginMetamask = async () => {
    if (!isAuthenticated) {
      try {
        if (window.ethereum) {
          const user = await Moralis.authenticate({
            signingMessage: "DeFind Auth",
          });
          await Moralis.enableWeb3();
          window.localStorage.setItem("userLocal", user.get("ethAddress"));
          window.location.reload();
        } else {
          return toast.error(
            "Web3 browser not recognised, please login via WalletConnect.",
            {
              position: "bottom-left",
              toastId: "custom-id",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            }
          );
        }
      } catch (e) {
        console.log(e);
        window.localStorage.removeItem("walletconnect");
      }
    }
  };

  const loginWalletConnect = async () => {
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
        return toast.error("Please connect and sign your web3 wallet.", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setTimeout(() => {
          window.localStorage.removeItem("walletconnect");
          window.location.reload();
        }, [4000]);
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
          <ToastContainer />

          {!isAuthenticated && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                zIndex: 100000,
              }}
            >
              {" "}
              <>
                <LoginWrapper>
                  <Button
                    onClick={() => setOpenLogin(!openLogin)}
                    text="Login"
                  />
                </LoginWrapper>
                <AnimatePresence>
                  {openLogin && (
                    <motion.div
                      initial={{ opacity: 0, y: "-5%" }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: "-5%" }}
                      key="box"
                      transition={{
                        type: "spring",
                        stiffness: "100",
                      }}
                      style={{ height: "12rem", marginBottom: "-12rem" }}
                    >
                      <DropdownMenu>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <DropdownSearch
                            onClick={() => {
                              setOpenLogin(false);
                              loginMetamask();
                            }}
                          >
                            MetaMask
                          </DropdownSearch>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <DropdownSearch
                            onClick={() => {
                              setOpenLogin(false);
                              loginWalletConnect();
                            }}
                          >
                            WalletConnect
                          </DropdownSearch>
                        </motion.div>
                      </DropdownMenu>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* <Button onClick={loginMetamask} text="metamask" />
                  <Button onClick={loginWalletConnect} text="walletconnect" /> */}
              </>
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

const DropdownMenu = styled.div`
  background: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.textModals};
  border-radius: 0.5rem;
  padding: 0.5rem 0.25rem;
  width: 10.5rem;
  margin-right: 0.75rem;
  margin-top: 3.75rem;
  @media screen and (max-width: 1023px) {
    width: 8.25rem;
    margin-right: 0.5rem;
    margin-top: 3rem;
    padding: 0.25rem 0;
  }
  @media screen and (max-width: 600px) {
    width: 7rem;
    margin-top: 2.5rem;

    font-size: 0.7rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.textModals};
  }
`;

const DropdownSearch = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.25rem 0rem;
  }
`;

const LoginWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100000;
  @media screen and (max-width: 1023px) {
    margin-right: 0.5rem;
    margin-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    margin-right: 1rem;
    margin-top: 0;
  }
`;
