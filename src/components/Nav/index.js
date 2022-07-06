import React, { useState, useEffect } from "react";
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
  FaAngleDoubleUp,
} from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [scrollTop, setScrollTop] = useState(false);
  const [navColor, setNavColor] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY !== 0) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    });
  }, []);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const menuItems = [
    {
      title: (
        <IconWrapper>
          <FaHome />
          <Hide>Home</Hide>
        </IconWrapper>
      ),
      route: "/",
    },
    {
      title: (
        <IconWrapper>
          <FaUserAlt />
          <Hide>Profile</Hide>
        </IconWrapper>
      ),
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaBookReader />
          <Hide>Forum</Hide>
        </IconWrapper>
      ),
      route: "/forum",
    },
    {
      title: (
        <IconWrapper>
          <FaRegIdCard />
          <Hide>My Posts</Hide>
        </IconWrapper>
      ),
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaRegEdit />
          <Hide>Post</Hide>
        </IconWrapper>
      ),
      route: `/newpost/${user.attributes.ethAddress}`,
    },
  ];

  return (
    <>
      <LinkWrapper>
        <TextWrapper className={navColor ? "navTop" : "navScrolled"}>
          {menuItems.map(({ title, route }) => {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={route}
              >
                <Links style={{ textDecoration: "none" }} to={`${route}`}>
                  <LinkHeaders className={navColor ? "navTop" : "navScrolled"}>
                    {title}
                  </LinkHeaders>
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
        <ScrollButton>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            {scrollTop && (
              <div>
                <Icons onClick={scrollToTop}>
                  <FaAngleDoubleUp />
                </Icons>
              </div>
            )}
          </motion.div>
        </ScrollButton>
      </UserTextWrapper>
    </>
  );
};

export default Nav;

const LinkWrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.backgroundNav};
  z-index: 100000;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  width: 100vw;
  cursor: pointer;
  transition: 0.2s linear;

  &.navTop {
    background: ${({ theme }) => theme.nav};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
  &.navScrolled {
    background: ${({ theme }) => theme.backgroundNav};
  }
`;

const LinkHeaders = styled.div`
  padding: 0.5rem 1rem;
  margin: 1rem;
  transition: all 0.5s linear;
  border-radius: 0.25rem;
  letter-spacing: 5px;
  font-size: 1.25rem;
  font-family: "Russo One", sans-serif;

  &.navTop {
    color: ${({ theme }) => theme.textModals};
  }

  &.navScrolled {
    color: ${({ theme }) => theme.text};
  }

  &.navTop:hover {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  &.navScrolled:hover {
    background: ${({ theme }) => theme.button};
    color: ${({ theme }) => theme.textModals};
  }

  &:hover {
    transition: all 0.5s linear;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
`;

const Header = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
`;

const Subheader = styled.h4`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 1rem;
  margin: 0.25rem;
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

const ScrollButton = styled.div`
  z-index: 1000;
  position: fixed;
  right: 4rem;
  bottom: 5rem;
`;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  border: 3px solid ${({ theme }) => theme.icon};
  border-radius: 50%;
  text-transform: uppercase;
  cursor: pointer;
`;

const Hide = styled.span`
  margin-left: 1rem;
  @media screen and (max-width: 1024px) {
    display: none;
    margin-left: none;
  }
`;
