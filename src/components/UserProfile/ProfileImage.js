import React from "react";

const ProfileImage = ({ change, click, inputFile, file }) => {
  return (
    <div>
      <div onClick={click} style={{ width: "100%" }}>
        <h1 style={{ cursor: "pointer" }}>Change profile Image</h1>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={change}
          style={{ display: "none" }}
        />
      </div>
      {file && (
        <img
          style={{ width: "5rem", objectFit: "cover", borderRadius: "50%" }}
          src={file}
          alt={file}
        />
      )}
    </div>
  );
};

export default ProfileImage;
