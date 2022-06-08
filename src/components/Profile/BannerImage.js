import React from "react";

const BannerImage = ({ change, click, inputFile, file }) => {
  return (
    <div>
      <div onClick={click} style={{ width: "100%" }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={change}
          style={{ display: "none" }}
        />
        <h1 style={{ cursor: "pointer" }}>Change Banner Image</h1>
      </div>
      {file && (
        <img
          style={{ width: "10rem", objectFit: "cover" }}
          src={file}
          alt={file}
        />
      )}
    </div>
  );
};

export default BannerImage;
