import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";

const Logout = () => {
  const { Moralis } = useMoralis();

  return (
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
  );
};

export default Logout;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
`;
