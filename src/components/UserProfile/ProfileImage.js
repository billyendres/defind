import React from "react";
import styled from "styled-components";
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
        <Header>Change profile Image</Header>
      </div>
    </div>
  );
};

export default ProfileImage;

const Header = styled.h2`
  cursor: pointer;
  color: ${({ theme }) => theme.textEditProfile};
`;
