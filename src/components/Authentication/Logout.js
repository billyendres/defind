import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
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
        text="Logout"
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
