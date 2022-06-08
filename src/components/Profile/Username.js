import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

const Username = ({ change, inputValue }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "100%" }}>
          <label>Change Username {user.attributes.username}</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValue} onChange={change} />
        </div>
      </div>
    </>
  );
};

export default Username;
