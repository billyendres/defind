import React from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import { FaSignOutAlt } from "react-icons/fa";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();

  const logout = async () => {
    await Moralis.User.logOut();
    window.localStorage.removeItem("userLocal");
    window.localStorage.removeItem("walletconnect");
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
