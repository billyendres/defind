import React, { useState } from "react";
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
          <div style={{ width: "100%", color: "#080e57" }}>
            <h3>Personal Summary</h3>
            <h4>Highlight your unique experiences, ambitions and strengths.</h4>
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
          <h3 style={{ color: "#080e57" }}>Personal Summary</h3>
          <h4 style={{ color: "#080e57" }}>{value}</h4>
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
