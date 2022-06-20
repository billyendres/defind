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
        <div style={{ width: "100%" }}>
          <label>Change Course</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValueCourse} onChange={changeCourse} />
        </div>
        <div style={{ width: "100%" }}>
          <label>Change Institution</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValueInstitution} onChange={changeInstitution} />
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
  color: ${({ theme }) => theme.textProfile};
`;
