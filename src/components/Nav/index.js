import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Logout from "../Authentication/Logout";
import defaultProfileImage from "../images/defaultProfileImage.png";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const menuItems = [
    {
      color: "#FF008C",
      title: "Home",
      route: "/",
    },
    {
      color: "#D309E1",
      title: "Profile",
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      color: "#D309E1",
      title: "Job Forum",
      route: "/jobforum",
    },
    {
      color: "#9C1AFF",
      title: "My Posts",
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      color: "#9C1AFF",
      title: "Post",
      route: `/newpost/${user.attributes.ethAddress}`,
    },
  ];

  return (
    <>
      <LinkWrapper>
        <TextWrapper>
          {menuItems.map(({ color, title, route }) => {
            return (
              <div key={route}>
                <Links style={{ color: color }} to={`${route}`}>
                  {title}
                </Links>
              </div>
            );
          })}
        </TextWrapper>
      </LinkWrapper>
      <UserProfileWrapper>
        <UserTextWrapper>
          <div>
            <Links to={`/profile/${user.attributes.ethAddress}`}>
              <ProfileImage
                src={
                  user.attributes.profilePic
                    ? user.attributes.profilePic
                    : defaultProfileImage
                }
                alt="Profile pic"
              />
              <h4>{user.attributes.username}</h4>
            </Links>
            <div
              style={{ margin: " 0 2rem" }}
            >{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</div>
            <div>{user.attributes.bio}</div>
            <Links to={`/newpost/${user.attributes.ethAddress}`}>
              New Post
            </Links>
          </div>
          <Logout />
        </UserTextWrapper>
      </UserProfileWrapper>
    </>
  );
};

export default Nav;

const ProfileImage = styled.img`
  width: 3rem;
  border-radius: 50%;
`;

const LinkWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  /* width: 5rem; */
  height: 100vh;
  background: black;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    /* display: none; */
  }

  @media screen and (max-height: 391px) {
    /* display: none; */
  }

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0 2rem 0;
  }

  @media screen and (min-width: 1200px) {
    padding: 2rem 0;
  }
`;

const UserProfileWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  /* width: 5rem; */
  height: 100vh;
  background: black;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    /* display: none; */
  }

  @media screen and (max-height: 391px) {
    /* display: none; */
  }

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0 2rem 0;
  }

  @media screen and (min-width: 1200px) {
    padding: 2rem 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: left; */
  justify-content: center;
  text-align: left;

  @media screen and (max-width: 768px) {
    /* display: none; */
  }
  cursor: pointer;

  @media screen and (max-height: 391px) {
    /* display: none; */
  }
`;

const UserTextWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 768px) {
    /* display: none; */
  }
  cursor: pointer;

  @media screen and (max-height: 391px) {
    /* display: none; */
  }
`;

const Links = styled(Link)`
  font-style: normal;
  font-weight: 900;
  font-size: 2rem;
  line-height: 120%;
  color: #ffffff;
  text-decoration: none;
  padding-left: 1rem;
  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 1200px) {
    font-size: 1.5rem;
    line-height: 120%;
    padding-left: 0.6rem;
  }
`;
