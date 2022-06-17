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
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
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
      </div>
    </>
  );
};

export default Education;
