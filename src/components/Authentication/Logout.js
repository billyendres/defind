import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis, useChain } from "react-moralis";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "web3uikit";

const Logout = () => {
  const navigate = useNavigate();
  const {
    Moralis,
    account,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    user,
  } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  const ethereum = window.ethereum;

  console.log(chainId, "chainID");
  useEffect(() => {
    if (chainId !== "0x3") {
      switchNetwork(3);
    }
  }, [
    isAuthenticated,
    isWeb3Enabled,
    Moralis,
    chainId,
    isWeb3EnableLoading,
    switchNetwork,
  ]);

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
