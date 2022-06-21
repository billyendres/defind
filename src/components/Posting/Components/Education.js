import React from "react";
import styled from "styled-components";

const Education = ({
  changeCourse,
  changeInstitution,
  inputValueCourse,
  inputValueInstitution,
}) => {
  return (
    <>
      <Wrapper>
        <h2>Education</h2>
        <div style={{ width: "100%" }}></div>
        <div style={{ width: "100%" }}>
          <Label>
            <Input
              placeholder="Course"
              value={inputValueCourse}
              onChange={changeCourse}
            />
          </Label>
        </div>
        <div style={{ width: "100%" }}></div>
        <div style={{ width: "100%" }}>
          <Label>
            <Input
              placeholder="Institution"
              value={inputValueInstitution}
              onChange={changeInstitution}
            />
          </Label>
        </div>
      </Wrapper>
    </>
  );
};

export default Education;

const Wrapper = styled.h2`
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
