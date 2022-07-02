import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import LoadingSpinner from "../Styles/LoadingSpinner";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";

const Logout = () => {
  const { Moralis, authenticate } = useMoralis();
  const ethereum = window.ethereum;
  const [isLoading, setIsLoading] = useState(false);

  const unlockMetaMask = async () => {
    const result = await ethereum._metamask.isUnlocked();
    if (!result) {
      try {
        await authenticate({
          provider: "web3Auth",
          clientId:
            "BFNj6-GO2sCnBHQRLzxhr37jeUt0SavOaDxIf8opr7hDFxsypg1TJQX2_vMjlZ11tk7pQ2nDmWbq8Wq13sBVeDA",
          chainId: Moralis.Chains.ETH_RINKBEY,
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
        setIsLoading(true);
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
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
              chainId: Moralis.Chains.ETH_RINKBEY,
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
            setIsLoading(true);
          } catch (error) {
            alert(error);
          } finally {
            setIsLoading(false);
          }
        };
        changeAccount();
      }
    });

  return (
    <>
      <Wrapper>
        <Button
          onClick={() => {
            Moralis.User.logOut().then(() => {
              window.location.reload();
            });
          }}
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
