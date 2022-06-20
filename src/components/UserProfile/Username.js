import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

const Username = ({ onChange, value }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <label>Change Username {user.attributes.username}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={value} onChange={onChange} placeholder="Username" />
        </div>
      </Wrapper>
    </>
  );
};

export default Username;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: ${({ theme }) => theme.textEditProfile};
  transition: all 0.5s linear;
`;
