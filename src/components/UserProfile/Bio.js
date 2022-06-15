import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

const Bio = ({ change, inputValue, bio }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div style={{ width: "100%" }}>
          <label>Bio: {user.attributes.bio}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValue} onChange={change} />
        </div>
      </div>
    </>
  );
};

export default Bio;
