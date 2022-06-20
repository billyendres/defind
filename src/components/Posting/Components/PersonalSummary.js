import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../Styles/Button";

const NewPost = ({ value, onChange }) => {
  const [togglePersonalSummary, setTogglePersonalSummary] = useState(false);
  return (
    <>
      {togglePersonalSummary ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "100%" }}>
            <Header>Personal Summary</Header>
            <Header>
              Highlight your unique experiences, ambitions and strengths.
            </Header>
          </div>
          <div style={{ width: "100%" }}>
            <textarea
              style={{ padding: "1rem" }}
              rows="10"
              cols="70"
              value={value}
              onChange={onChange}
              required
            />
          </div>
          <Button
            onClick={() => setTogglePersonalSummary(!togglePersonalSummary)}
            text="Save"
          />
        </div>
      ) : (
        <>
          <Header>Personal Summary</Header>
          <Header>{value}</Header>
          <Button
            onClick={() => setTogglePersonalSummary(!togglePersonalSummary)}
            text="Edit"
          />
        </>
      )}
    </>
  );
};

export default NewPost;

const Header = styled.h2`
  color: ${({ theme }) => theme.textPost};
  transition: all 0.5s linear;
`;
