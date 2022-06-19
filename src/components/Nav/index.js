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
      <LinkWrapper
        style={{ background: !navColor ? "transparent" : "#080e57" }}
      >
        <TextWrapper>
          {menuItems.map(({ title, route }) => {
            return (
              <div key={route}>
                <Links style={{ textDecoration: "none" }} to={`${route}`}>
                  <LinkHeaders
                    style={{ color: !navColor ? "#080e57" : "white" }}
                  >
                    {title}
                  </LinkHeaders>
                </Links>
              </div>
            );
          })}
        </TextWrapper>
        <UserTextWrapper>
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <h2 style={{ color: !navColor ? "#080e57" : "white" }}>
              {user.attributes.username}
            </h2>
          </Links>
          <h2
            style={{
              margin: " 0 2rem",
              color: !navColor ? "#080e57" : "white",
            }}
          >{`${user.attributes.ethAddress.slice(0, 4)}...
          ${user.attributes.ethAddress.slice(38)}`}</h2>
          <h2 style={{ color: !navColor ? "#080e57" : "white" }}>
            {user.attributes.bio}
          </h2>
          <Links to={`/newpost/${user.attributes.ethAddress}`}>
            <h2 style={{ color: !navColor ? "#080e57" : "white" }}>New Post</h2>
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
  /* background: #100b3c; */
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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
  &:hover {
    text-decoration: underline;
  }
`;

const UserTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
