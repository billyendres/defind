import React from "react";

const NewPost = ({ inputValue, change, click, inputFile, file, addImage }) => {
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
      {/* <div onClick={click} style={{ width: "100%" }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={addImage}
          style={{ display: "none" }}
        />
        <h1 style={{ cursor: "pointer" }}>ADD IMAGE</h1>
      </div>
      {file && (
        <img
          style={{ width: "10rem", objectFit: "cover" }}
          src={file}
          alt={file}
        />
      )} */}
    </>
  );
};

export default NewPost;
