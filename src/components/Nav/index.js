import React, { useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { motion } from "framer-motion";
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
        <IconWrapper>
          <FaHome style={{ marginRight: "1rem" }} />
          Home
        </IconWrapper>
      ),
      route: "/",
    },
    {
      title: (
        <IconWrapper>
          <FaUserAlt style={{ marginRight: "1rem" }} />
          Profile
        </IconWrapper>
      ),
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaBookReader style={{ marginRight: "1rem" }} />
          Forum
        </IconWrapper>
      ),
      route: "/forum",
    },
    {
      title: (
        <IconWrapper>
          <FaRegIdCard style={{ marginRight: "1rem" }} />
          My Posts
        </IconWrapper>
      ),
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaRegEdit style={{ marginRight: "1rem" }} />
          Post
        </IconWrapper>
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
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={route}
              >
                <Links style={{ textDecoration: "none" }} to={`${route}`}>
                  <LinkHeaders>{title}</LinkHeaders>
                </Links>
              </motion.div>
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
        <motion.div whileHover={{ scale: 1.05 }}>
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <Header>{user.attributes.username}</Header>
          </Links>
        </motion.div>
        <Subheader>{user.attributes.bio}</Subheader>
        <Subheader>{`${user.attributes.ethAddress.slice(0, 4)}...
          ${user.attributes.ethAddress.slice(38)}`}</Subheader>
      </UserTextWrapper>
    </>
  );
};

export default Nav;

const LinkWrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.backgroundNav};
  padding: 1rem;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  text-align: left;
  flex-direction: column;
  cursor: pointer;
`;

const LinkHeaders = styled.div`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  border-radius: 0.25rem;
  letter-spacing: 5px;
  font-size: 1.25rem;

  &:hover {
    transition: all 0.5s linear;
    background: ${({ theme }) => theme.buttonHover};
    color: ${({ theme }) => theme.textModals};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const Header = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.text};
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.25rem;
`;

const Subheader = styled.h4`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 1rem;
  margin: 0.25rem;
  font-family: "Kdam Thmor Pro", sans-serif;
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

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;
