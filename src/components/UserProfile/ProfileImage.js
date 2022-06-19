import React from "react";
import Img from "../Styles/ProfilePicture";

const ProfileImage = ({ onChange, onClick, inputFile, src, alt, accept }) => {
  return (
    <div>
      <div onClick={onClick} style={{ width: "100%" }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={onChange}
          style={{ display: "none" }}
          accept={accept}
        />
        {src && <Img src={src} alt={alt} />}
        <h1 style={{ cursor: "pointer" }}>Change profile Image</h1>
      </div>
    </div>
  );
};

export default ProfileImage;
