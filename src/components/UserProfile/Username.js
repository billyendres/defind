import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { FaUserEdit } from "react-icons/fa";

const Username = ({ onChange, value }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Label>
            <FaUserEdit style={{ marginRight: "1rem" }} />
            {/* {user.attributes.username} */}
            <input value={value} onChange={onChange} placeholder="Username" />
          </Label>
        </div>
        <div style={{ width: "100%" }}></div>
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

const Label = styled.h2`
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  text-transform: uppercase;
`;
