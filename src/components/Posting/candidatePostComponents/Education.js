import React from "react";
import styled from "styled-components";
import { FaUniversity, FaUserGraduate } from "react-icons/fa";

const Education = ({
  changeCourse,
  changeInstitution,
  inputValueCourse,
  inputValueInstitution,
}) => {
  return (
    <>
      <Wrapper>
        <div style={{ width: "100%" }}>
          <Label>
            <FaUserGraduate
              size={30}
              style={{
                marginRight: "1rem",
                marginBottom: "-0.5rem",
              }}
            />
            <Input
              placeholder="Course"
              value={inputValueCourse}
              onChange={changeCourse}
              maxLength="50"
            />
          </Label>
        </div>
        <div style={{ width: "100%" }}>
          <Label>
            <FaUniversity
              size={30}
              style={{
                marginRight: "1rem",
                marginBottom: "-0.5rem",
              }}
            />
            <Input
              placeholder="Institution"
              value={inputValueInstitution}
              onChange={changeInstitution}
              maxLength="50"
            />
          </Label>
        </div>
      </Wrapper>
    </>
  );
};

export default Education;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: flex-start;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;

const Label = styled.div`
  padding: 0.5rem 0;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #080e57;
  width: 40%;
  letter-spacing: 2px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;
