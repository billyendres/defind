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
            <FaBookReader
              size={30}
              style={{
                marginRight: "1rem",
                marginBottom: "-0.5rem",
                marginLeft: "-3rem",
              }}
            />
            {/* {user.attributes.bio} */}
            <Input value={value} onChange={onChange} placeholder="Bio" />
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
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
`;

const Label = styled.h2`
  padding: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  color: #080e57;
  background: #bae1ff;
  letter-spacing: 2px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;
