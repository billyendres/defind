import React from "react";
import styled from "styled-components";

export const PositionSummary = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Job Title*</SubHeader>
      <Input
        value={value}
        onChange={onChange}
        // placeholder="Job Title"
        maxLength="50"
      />
    </>
  );
};

export const Company = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>About the company</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        // placeholder="Position Summary."
        maxLength="1000"
      />
    </>
  );
};

export const PositionSummary1 = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Position Summary</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        // placeholder="Position Summary."
        maxLength="2000"
      />
    </>
  );
};

export const Responsibilities = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Responsibilities</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        // placeholder="Responsibilities."
        maxLength="2000"
      />
    </>
  );
};

export const Requirements = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Requirements</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        // placeholder="Requirements."
        maxLength="2000"
      />
    </>
  );
};

export const Benefits = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Benefits</SubHeader>
      <Textarea
        value={value}
        onChange={onChange}
        required
        // placeholder="Benefits."
        maxLength="2000"
      />
    </>
  );
};

export const Salary = ({ value, onChange }) => {
  return (
    <>
      <SubHeader>Salary</SubHeader>
      <Input
        value={value}
        onChange={onChange}
        // placeholder="Salary"
        maxLength="50"
      />
    </>
  );
};

const SubHeader = styled.div`
  color: #080e57;
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

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
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
  textarea {
    white-space: pre-wrap !important;
  }
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
