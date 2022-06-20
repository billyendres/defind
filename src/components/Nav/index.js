import React, { useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [navColor, setNavColor] = useState(false);

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

  const changeNavColor = () => {
    if (window.scrollY >= "90") {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  window.addEventListener("scroll", changeNavColor);

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
            <Header>{user.attributes.username}</Header>
          </Links>
          <Header>{`${user.attributes.ethAddress.slice(0, 4)}...
          ${user.attributes.ethAddress.slice(38)}`}</Header>
          <Header>{user.attributes.bio}</Header>
          <Links to={`/newpost/${user.attributes.ethAddress}`}>
            <Header>New Post</Header>
          </Links>
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
  background: ${({ theme }) => theme.backgroundNav};
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: ${({ theme }) => theme.textNav};
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  cursor: pointer;
`;

const LinkHeaders = styled.h2`
  padding: 1rem;
  color: ${({ theme }) => theme.textNav};

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textNav};
`;

const UserTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
