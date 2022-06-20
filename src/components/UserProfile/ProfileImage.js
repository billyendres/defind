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
        {src && (
          <Img
            src={src}
            alt={alt}
            style={{ width: "7rem", height: "7rem", cursor: "pointer" }}
          />
        )}
        {/* <IconWrapper>
          <Header>
            <FaImage style={{ marginRight: "1rem" }} />
            Image
          </Header>
        </IconWrapper> */}
      </div>
    </div>
  );
};

export default ProfileImage;

const Header = styled.h2`
  text-align: center;
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textEditProfile};
  transition: all 0.5s linear;
  font-size: 1.5rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  justify-content: center;
`;
