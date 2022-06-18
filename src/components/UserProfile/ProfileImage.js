import React from "react";

const ProfileImage = ({ onChange, onClick, inputFile, file }) => {
  return (
    <div>
      <div onClick={onClick} style={{ width: "100%" }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={onChange}
          style={{ display: "none" }}
        />
        {/* {file && ( */}
        <img
          style={{ width: "5rem", objectFit: "cover", borderRadius: "50%" }}
          src={file}
          alt={file}
        />
        {/* )} */}
        <h1 style={{ cursor: "pointer" }}>Change profile Image</h1>
      </div>
    </div>
  );
};

export default ProfileImage;
