import React from "react";
import styled from "styled-components";
import Img from "../Styles/ProfilePicture";
import { FaUserEdit, FaImage } from "react-icons/fa";

const ProfileImage = ({ onChange, onClick, inputFile, src, alt, accept }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", textAlign: "center" }}
    >
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
      </div>
    </div>
  );
};

export default ProfileImage;
