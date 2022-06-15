import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

const Education = ({
  changeCourse,
  changeInstitution,
  inputValueCourse,
  inputValueInstitution,
}) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <h2>Education</h2>
        <div style={{ width: "100%" }}>
          <label>Change Course {user.attributes.course}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValueCourse} onChange={changeCourse} />
        </div>
        <div style={{ width: "100%" }}>
          <label>Change Institution {user.attributes.institution}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValueInstitution} onChange={changeInstitution} />
        </div>
      </div>
    </>
  );
};

export default Education;
