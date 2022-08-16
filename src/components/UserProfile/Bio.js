import React from "react";
import styled from "styled-components";
import { FaRegListAlt } from "react-icons/fa";

const Bio = ({ onChange, value }) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Label>
            <FaRegListAlt
              // size={30}
              style={{
                marginRight: "1rem",
                marginBottom: "-0.5rem",
                marginLeft: "-3rem",
              }}
            />
            <Input
              value={value}
              onChange={onChange}
              placeholder="Bio"
              maxLength="30"
            />
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

const Label = styled.div`
  padding: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  @media screen and (max-width: 1023px) {
    padding: 0;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  /* background: #bae1ff; */
  font-family: "Kdam Thmor Pro", sans-serif;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }

  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
`;
