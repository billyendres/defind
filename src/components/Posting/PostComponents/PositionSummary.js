import React from "react";
import styled from "styled-components";

const PositionSummary = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Position Summary*</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        placeholder="Job Description."
        maxLength="450"
      />
    </>
  );
};

export default PositionSummary;

const SubHeader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.25rem 0;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  font-family: "Kdam Thmor Pro", sans-serif;
  max-width: 37rem;
  min-width: 37rem;
  max-height: 12rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
  @media screen and (max-width: 1023px) {
    max-width: 29rem;
    min-width: 29rem;
    max-height: 9rem;
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    max-width: 16rem;
    min-width: 16rem;
    max-height: 5rem;
    font-size: 0.75rem;
  }
`;
