import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { Moralis, authenticate } = useMoralis();
  const ethereum = window.ethereum;

  const unlockMetaMask = async () => {
    if (ethereum) {
      const result = await ethereum._metamask.isUnlocked();
      if (!result) {
        try {
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
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      console.log("Eth browser not connected");
    }
  };
  unlockMetaMask();

  ethereum &&
    ethereum.on("accountsChanged", (accounts) => {
      if (accounts) {
        const changeAccount = async () => {
          try {
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
            navigate("/");
          } catch (error) {
            console.log(error);
          }
        };
        changeAccount();
      }
    });

  const logout = async () => {
    try {
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
      navigate("/");
    } catch (error) {
      console.log(error);
    }
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
  right: 0;
`;
