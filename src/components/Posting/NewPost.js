import React from "react";

const NewPost = ({ inputValue, change }) => {
  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <div style={{ width: "100%" }}>
          <label>POST</label>
        </div>
        <div style={{ width: "100%" }}>
          <input value={inputValue} onChange={change} />
        </div>
      </div>
    </>
  );
};

export default NewPost;
