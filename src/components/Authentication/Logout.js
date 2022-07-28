import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis, useChain } from "react-moralis";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const {
    Moralis,
    account,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
  } = useMoralis();
  const ethereum = window.ethereum;

  // useEffect(() => {
  //   const unlockMetaMask = async () => {
  //     if (ethereum) {
  //       const result = await ethereum._metamask.isUnlocked();
  //       if (!result) {
  //         await Moralis.User.logOut();
  //         navigate("/");
  //         window.location.reload();
  //       }
  //       console.log(result);
  //     } else {
  //       console.log("Eth browser not connected");
  //     }
  //   };
  //   unlockMetaMask();
  // }, [Moralis, ethereum, navigate]);

  // useEffect(() => {
  //   ethereum &&
  //     ethereum.on("accountsChanged", (accounts) => {
  //       console.log(accounts);
  //       if (accounts) {
  //         const changeAccount = async () => {
  //           await Moralis.User.logOut();
  //           navigate("/");
  //           window.location.reload();
  //         };
  //         changeAccount();
  //       }
  //     });
  // }, [Moralis, ethereum, navigate]);
  const { switchNetwork, chainId, chain } = useChain();
  console.log(account);
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      Moralis.enableWeb3({ provider: connectorId });
    }
    if (chainId != 3) {
      switchNetwork(3);
    }
  }, [
    isAuthenticated,
    isWeb3Enabled,
    chain,
    Moralis,
    chainId,
    isWeb3EnableLoading,
    switchNetwork,
  ]);

  useEffect(() => {
    const logout = async () => {
      if (account !== Moralis.User.current().attributes.ethAddress) {
        await Moralis.User.logOut();
        navigate("/");
        window.location.reload();
      }
    };
    logout();
  }, [account, navigate, Moralis]);

  const logout = async () => {
    await Moralis.User.logOut();
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Wrapper>
        <Button
          onClick={logout}
          text={
            <>
              Logout <FaSignOutAlt style={{ marginBottom: "-0.2rem" }} />
            </>
          }
        />
      </Wrapper>
    </>
  );
};

export default Logout;

const Wrapper = styled.div`
  position: fixed;
  bottom: 1rem;
  left: 0.25rem;
`;
