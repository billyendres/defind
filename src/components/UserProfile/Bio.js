import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

const Bio = ({ onChange, value }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <label>Bio: {user.attributes.bio}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={value} onChange={onChange} placeholder="Bio" />
        </div>
      </Wrapper>
    </>
  );
};

export default Bio;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: ${({ theme }) => theme.textEditProfile};
`;
