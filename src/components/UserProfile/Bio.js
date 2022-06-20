import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { FaBookReader } from "react-icons/fa";

const Bio = ({ onChange, value }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Label>
            <FaBookReader style={{ marginRight: "1rem" }} />
            {/* {user.attributes.bio} */}
            <input value={value} onChange={onChange} placeholder="Bio" />
          </Label>
        </div>
        <div style={{ width: "100%" }}></div>
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
  transition: all 0.5s linear;
`;

const Label = styled.h2`
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  text-transform: uppercase;
`;
