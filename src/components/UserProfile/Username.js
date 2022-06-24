import React from "react";
import styled from "styled-components";
import { FaGrin } from "react-icons/fa";

const Username = ({ onChange, value }) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Label>
            <FaGrin
              size={30}
              style={{
                marginRight: "1rem",
                marginBottom: "-0.5rem",
                marginLeft: "-3rem",
                marginTop: "1.5rem",
              }}
            />
            <Input value={value} onChange={onChange} placeholder="Username" />
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
  font-family: "Kdam Thmor Pro", sans-serif;
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
