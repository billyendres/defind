import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { Moralis, authenticate } = useMoralis();
  const ethereum = window.ethereum;

  // const unlockMetaMask = async () => {
  //   if (ethereum) {
  //     const result = await ethereum._metamask.isUnlocked();
  //     if (!result) {
  //       await Moralis.User.logOut();
  //       navigate("/");
  //       window.location.reload();
  //     }
  //   } else {
  //     console.log("Eth browser not connected");
  //   }
  // };
  // unlockMetaMask();

  ethereum &&
    ethereum.on("accountsChanged", (accounts) => {
      if (accounts) {
        const changeAccount = async () => {
          await Moralis.User.logOut();
          navigate("/");
          window.location.reload();
        };
        changeAccount();
      }
    });

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
  bottom: 0;
  left: 0;
`;
