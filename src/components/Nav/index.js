import React from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const menuItems = [
    {
      title: "Home",
      route: "/",
    },
    {
      title: "Profile",
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: "Job Forum",
      route: "/jobforum",
    },
    {
      title: "My Posts",
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: "Post",
      route: `/newpost/${user.attributes.ethAddress}`,
    },
  ];

  return (
    <>
      <LinkWrapper>
        <TextWrapper>
          {menuItems.map(({ title, route }) => {
            return (
              <div key={route}>
                <Links style={{ textDecoration: "none" }} to={`${route}`}>
                  <LinkHeaders>{title}</LinkHeaders>
                </Links>
              </div>
            );
          })}
        </TextWrapper>
        <UserTextWrapper>
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            {user.attributes.username}
          </Links>
          <span
            style={{ margin: " 0 2rem" }}
          >{`${user.attributes.ethAddress.slice(0, 4)}...
          ${user.attributes.ethAddress.slice(38)}`}</span>
          <span>{user.attributes.bio}</span>
          <Links to={`/newpost/${user.attributes.ethAddress}`}>New Post</Links>
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <Img
              style={{ margin: "1rem" }}
              src={
                user.attributes.profilePic
                  ? user.attributes.profilePic
                  : defaultProfileImage
              }
              alt="Profile pic"
            />
          </Links>
        </UserTextWrapper>
      </LinkWrapper>
    </>
  );
};

export default Nav;

const LinkWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 7rem;
  background: #100b3c;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  text-align: left;
  cursor: pointer;
`;

const LinkHeaders = styled.h2`
  color: rgba(239, 124, 142, 1);
  padding: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

// const UserProfileWrapper = styled.div`
//   position: fixed;
//   right: 0;
//   top: 0;
//   width: 10rem;
//   height: 100vh;
//   background: #100b3c;
//   z-index: 1;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   padding: 1rem;
// `;

const UserTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
