import React, { useState } from "react";

const NewPost = ({ value, onChange }) => {
  const [togglePersonalSummary, setTogglePersonalSummary] = useState(false);
  // const [personalSummary, setPersonalSummary] = useState("");
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
          <button
            onClick={() => setTogglePersonalSummary(!togglePersonalSummary)}
          >
            Save personal summary
          </button>
        </div>
      ) : (
        <>
          <h3>Personal Summary</h3>
          <h4>{value}</h4>
          <button
            onClick={() => setTogglePersonalSummary(!togglePersonalSummary)}
          >
            Edit Personal Summary
          </button>
        </>
      )}
    </>
  );
};

export default NewPost;
