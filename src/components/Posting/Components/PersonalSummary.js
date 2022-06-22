import React from "react";
import styled from "styled-components";

const NewPost = ({ value, onChange }) => {
  return (
    <>
      <Header>Personal Summary</Header>
      <Textarea
        style={{ padding: "1rem" }}
        cols="100"
        value={value}
        onChange={onChange}
        required
        placeholder="Highlight your unique experiences, ambitions and strengths."
      />
    </>
  );
};

export default NewPost;

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 1rem 0;
  text-transform: uppercase;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Russo One", sans-serif;
  color: #080e57;
  background: #bae1ff;
  letter-spacing: 2px;
  max-width: 40rem;
  max-height: 15rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;
