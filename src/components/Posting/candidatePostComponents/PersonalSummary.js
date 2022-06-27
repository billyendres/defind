import React from "react";
import styled from "styled-components";

const NewPost = ({ value, onChange }) => {
  return (
    <>
      <Subheader>Personal Summary*</Subheader>
      <Textarea
        style={{ padding: "1rem" }}
        value={value}
        onChange={onChange}
        required
        placeholder="Highlight your unique experiences, ambitions and strengths."
      />
    </>
  );
};

export default NewPost;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 1rem 0;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #080e57;
  /* letter-spacing: 2px; */
  max-width: 37rem;
  min-width: 37rem;
  max-height: 15rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;
