import React from "react";
import styled from "styled-components";

const ProfilePicture = ({ src, alt, style }) => {
  return <Img style={style} src={src} alt={alt} />;
};

export default ProfilePicture;

const Img = styled.img`
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;

  @media screen and (max-width: 1023px) {
    width: 5rem;
    height: 5rem;
  }
`;
