import React, { useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import {
  FaHome,
  FaUserAlt,
  FaBookReader,
  FaRegEdit,
  FaRegIdCard,
} from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const menuItems = [
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <FaHome style={{ marginRight: "1rem" }} />
          Home
        </div>
      ),
      route: "/",
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <FaUserAlt style={{ marginRight: "1rem" }} />
          Profile
        </div>
      ),
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <FaBookReader style={{ marginRight: "1rem" }} />
          Jobs
        </div>
      ),
      route: "/jobforum",
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <FaRegIdCard style={{ marginRight: "1rem" }} />
          My Posts
        </div>
      ),
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            textTransform: "uppercase",
          }}
        >
          <FaRegEdit style={{ marginRight: "1rem" }} />
          Post
        </div>
      ),
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
      </LinkWrapper>

      <UserTextWrapper>
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
        <Links to={`/profile/${user.attributes.ethAddress}`}>
          <Header>{user.attributes.username}</Header>
        </Links>
        <Subheader>{`${user.attributes.ethAddress.slice(0, 4)}...
          ${user.attributes.ethAddress.slice(38)}`}</Subheader>
        <Subheader>{user.attributes.bio}</Subheader>
      </UserTextWrapper>
    </>
  );
};

export default Nav;

const LinkWrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.backgroundNav};
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  text-align: left;
  flex-direction: column;
  cursor: pointer;
`;

const LinkHeaders = styled.h2`
  padding: 1rem;
  color: ${({ theme }) => theme.textNav};
  transition: all 0.5s linear;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = styled.h2`
  transition: all 0.5s linear;
  text-transform: uppercase;
`;

const Subheader = styled.h4`
  color: ${({ theme }) => theme.textNav};
  transition: all 0.5s linear;
  font-size: 1.5rem;
  margin: 0.5rem;
`;

const UserTextWrapper = styled.div`
  padding: 1rem;
  position: fixed;
  text-align: center;
  top: 0;
  right: 0;
  height: 100vh;
  background: ${({ theme }) => theme.backgroundNav};
`;
