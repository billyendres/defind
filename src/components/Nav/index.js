import React, { useState, useEffect, useRef } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useMoralis } from "react-moralis";
import {
  FaHome,
  FaUserAlt,
  FaBookReader,
  FaRegEdit,
  FaRegIdCard,
  FaAngleDoubleUp,
  FaChevronUp,
} from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";
import Logout from "../Authentication/Logout";

const Nav = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [navColor, setNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  console.log(open);
  // useEffect(() => {
  //   const closeNav = (e) => {
  //     console.log(e.path);
  //     if (e.path[2] !== buttonRef.current) {
  //       setOpen(false);
  //     }
  //   };
  //   document.body.addEventListener("click", closeNav);
  //   return () => document.body.removeEventListener("click", closeNav);
  // }, []);

  useEffect(() => {
    let handler = (e) => {
      if (buttonRef.current) {
        if (!buttonRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

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
          <FaHome style={{ marginRight: "1rem" }} />
          <>Home</>
        </IconWrapper>
      ),
      route: "/",
    },
    {
      title: (
        <IconWrapper>
          <FaUserAlt style={{ marginRight: "1rem" }} />
          <>Profile</>
        </IconWrapper>
      ),
      route: `/profile/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaBookReader style={{ marginRight: "1rem" }} />
          <>Forum</>
        </IconWrapper>
      ),
      route: "/forum",
    },
    {
      title: (
        <IconWrapper>
          <FaRegIdCard style={{ marginRight: "1rem" }} />
          <>My Posts</>
        </IconWrapper>
      ),
      route: `/profile/posts/${user.attributes.ethAddress}`,
    },
    {
      title: (
        <IconWrapper>
          <FaRegEdit style={{ marginRight: "1rem" }} />
          <>Post</>
        </IconWrapper>
      ),
      route: `/newpost/${user.attributes.ethAddress}`,
    },
  ];

  return (
    <>
      <LinkWrapper>
        <TextWrapper className="navTop">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
          >
            <div
              style={{
                width: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LinkHeaders className="navTop">
                <IconWrapper>
                  <FaChevronUp
                    style={{
                      transform: open ? "rotate(270deg)" : "rotate(-270deg)",
                      transition: "0.25s linear",
                    }}
                  />
                </IconWrapper>
              </LinkHeaders>
            </div>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Links to={`/profile/${user.attributes.ethAddress}`}>
              <Hide>
                <Header
                  style={{
                    opacity: navColor ? 0 : 1,
                    transition: "0.5s linear",
                  }}
                  className="navTop"
                >
                  {user.attributes.username.toUpperCase()}
                  {"- "}
                  {`${user.attributes.ethAddress.slice(0, 4).toUpperCase()}...
                    ${user.attributes.ethAddress.slice(38).toUpperCase()}`}
                </Header>
              </Hide>
            </Links>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <div
              style={{
                width: "3rem",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <LinkHeaders
                className="navTop"
                onClick={scrollToTop}
                style={{
                  opacity: !navColor ? 0 : 1,
                  transition: "0.5s linear",
                }}
              >
                <IconWrapper>
                  <FaAngleDoubleUp />
                </IconWrapper>
              </LinkHeaders>
            </div>
          </motion.div>
        </TextWrapper>
      </LinkWrapper>
      <AnimatePresence>
        {open && (
          <NavWrapper
            ref={buttonRef}
            initial={{ opacity: 0, x: "-20%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-20%" }}
            style={{ display: "flex" }}
          >
            {menuItems.map(({ title, route }) => {
              return (
                <motion.div key={route} style={{ display: "flex" }}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Links style={{ textDecoration: "none" }} to={`${route}`}>
                      <Header>{title}</Header>
                    </Links>
                  </motion.div>
                </motion.div>
              );
            })}
            <Logout />
          </NavWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

const NavWrapper = styled(motion.div)`
  position: fixed;
  width: 25vw;
  height: 100vh;
  background: ${({ theme }) => theme.textModals};
  z-index: 10000;
  display: flex;
  flex-direction: column;
  padding-top: 7.5rem;
  padding-left: 2rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 50vw;
  }
  @media screen and (max-width: 600px) {
    /* width: 100vw; */
    padding-left: 1rem;
  }
`;

const LinkWrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.backgroundNav};
  z-index: 100000;
  padding: 0 0.25rem;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 98.5vw;
  cursor: pointer;
  transition: 0.2s linear;
  /* margin-top: 0.5rem; */

  &.navTop {
    background: ${({ theme }) => theme.backgroundNav};
  }
  &.navScrolled {
    background: ${({ theme }) => theme.nav};
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const LinkHeaders = styled.div`
  padding: 0.5rem;
  margin: 1rem;
  transition: all 0.5s linear;
  border-radius: 50%;
  font-size: 1.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  &.navTop {
    color: ${({ theme }) => theme.textModals};
    background: ${({ theme }) => theme.button};
  }
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.3rem;
  }
`;

const Header = styled.h3`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.text};
  font-family: "Russo One", sans-serif;
  padding: 1rem 0;
  letter-spacing: 5px;
  font-size: 1.5rem;
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.75rem 0;
  }
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
    /* margin-left: none; */
  }
`;

const ImageWrapper = styled.div`
  margin-top: 5rem;
`;
