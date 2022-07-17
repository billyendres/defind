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
  FaBars,
} from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";
import Logout from "../Authentication/Logout";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [scrollTop, setScrollTop] = useState(false);
  const [navColor, setNavColor] = useState(false);
  const [open, setOpen] = useState(false);

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
          <>Home</>
        </IconWrapper>
      ),
      route: "/",
    },
    {
      title: (
        <IconWrapper>
          <FaUserAlt />
          <>Profile</>
        </IconWrapper>
      ),
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaBookReader />
          <>Forum</>
        </IconWrapper>
      ),
      route: "/forum",
    },
    {
      title: (
        <IconWrapper>
          <FaRegIdCard />
          <>My Posts</>
        </IconWrapper>
      ),
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaRegEdit />
          <>Post</>
        </IconWrapper>
      ),
      route: `/newpost/${user.attributes.ethAddress}`,
    },
  ];

  return (
    <>
      <LinkWrapper>
        <TextWrapper className={navColor ? "navTop" : "navScrolled"}>
          <LinkHeaders
            onClick={() => setOpen(!open)}
            className={navColor ? "navTop" : "navScrolled"}
          >
            <FaBars style={{ marginBottom: "-0.25rem" }} size={25} />
          </LinkHeaders>
          <div style={{ display: "flex" }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Links to={`/profile/${user.attributes.ethAddress}`}>
                <LinkHeaders className={navColor ? "navTop" : "navScrolled"}>
                  {user.attributes.username.toUpperCase()}
                  <Hide>
                    {"- "}
                    {`${user.attributes.ethAddress.slice(0, 4).toUpperCase()}...
                    ${user.attributes.ethAddress.slice(38).toUpperCase()}`}
                  </Hide>
                </LinkHeaders>
              </Links>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
            {/* {scrollTop && ( */}

            <LinkHeaders
              className={navColor ? "navTop" : "navScrolled"}
              onClick={scrollToTop}
            >
              <FaAngleDoubleUp style={{ marginBottom: "-0.25rem" }} size={30} />
            </LinkHeaders>
            {/* )} */}
          </motion.div>
        </TextWrapper>
      </LinkWrapper>
      {open && (
        <NavWrapper>
          {menuItems.map(({ title, route }) => {
            return (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                key={route}
              >
                <Links style={{ textDecoration: "none" }} to={`${route}`}>
                  <Header>{title}</Header>
                </Links>
              </motion.div>
            );
          })}
          <Logout />
        </NavWrapper>
      )}
    </>
  );
};

export default Nav;

const NavWrapper = styled.div`
  position: fixed;
  width: 25vw;
  height: 100vh;
  background: ${({ theme }) => theme.textModals};
  z-index: 10000;
  display: flex;
  flex-direction: column;
  padding-top: 10rem;
  padding-left: 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 50vw;
  }
  @media screen and (max-width: 600px) {
    width: 100vw;
    /* justify-content: center; */
    align-items: center;
  }
`;

const LinkWrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.backgroundNav};
  z-index: 100000;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  font-size: 1.5rem;
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
  @media screen and (max-width: 600px) {
    margin: 0.5rem;
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
  width: 100vw;
  background: ${({ theme }) => theme.backgroundNav};
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
`;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  /* border: 3px solid ${({ theme }) => theme.icon}; */
  border-radius: 50%;
  text-transform: uppercase;
  cursor: pointer;
`;

const Hide = styled.span`
  margin-left: 1rem;
  @media screen and (max-width: 1023px) {
    display: none;
    margin-left: none;
  }
`;

const ImageWrapper = styled.div`
  margin-top: 5rem;
`;
