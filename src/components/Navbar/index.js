import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Schools",
    key: "/schools",
  },
  {
    title: "Practitioners",
    key: "/practitioners",
  },
  {
    title: "Resources",
    key: "/resources",
  },
  {
    title: "Help & support",
    key: "/help",
  },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 780 && showMenu) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("click", handleResize);
  });

  return (
    <>
      <div
        style={{
          position: isMobile && "fixed",
          zIndex: isMobile && "10000",
          width: isMobile && "100%",
        }}
      >
        <Wrapper
          style={{
            backdropFilter: isMobile && "blur(100px)",
          }}
        >
          <LogoWrapper to="/">Header</LogoWrapper>
          <Nav
            onClick={() => setShowMenu(!showMenu)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
          <TextWrapper>
            {menuItems.map(({ title, key }) => {
              return (
                <div key={key}>
                  <Links to={`${key}`}>{title}</Links>
                </div>
              );
            })}
          </TextWrapper>
        </Wrapper>
      </div>
      {showMenu && (
        <DropdownWrapper>
          {menuItems.map(({ title, key }) => {
            return (
              <div
                onClick={() => setShowMenu(!showMenu)}
                style={{ paddingTop: "2rem" }}
                key={key}
              >
                <DropdownLinks to={`${key}`}>{title}</DropdownLinks>
              </div>
            );
          })}
        </DropdownWrapper>
      )}
    </>
  );
};

export default Navbar;

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin-left: -2rem;

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0 2rem 0;
    margin-left: 0;
  }

  @media screen and (min-width: 1200px) {
    padding: 2rem 0;
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  color: rgba(41, 243, 226, 1);
  text-decoration: none;
  text-transform: uppercase;
  font-size: 3rem;

  @media screen and (min-width: 768px) {
  }

  @media screen and (min-width: 1200px) {
  }
`;

const TextWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    display: none;
  }
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  backdrop-filter: blur(100px);
  position: fixed;
  z-index: 2;
  padding: 5rem 0;
  margin-left: -2rem;
  width: 100%;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    display: none;
  }
  cursor: pointer;
`;

const DropdownLinks = styled(Link)`
  font-style: normal;
  font-weight: 900;
  font-size: 2rem;
  line-height: 120%;
  color: #ffffff;
  text-decoration: none;
`;

const Links = styled(Link)`
  font-style: normal;
  font-weight: 900;
  font-size: 2rem;
  line-height: 120%;
  color: #ffffff;
  text-decoration: none;
  padding-left: 1rem;

  @media screen and (max-width: 1200px) {
    font-size: 1.5rem;
    line-height: 120%;
    padding-left: 0.6rem;
  }
`;

const Nav = styled(motion.div)`
  width: 2rem;
  height: 2rem;
  background: white;
  border-radius: 0.5rem;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    rgba(239, 124, 142, 1) 50%,
    rgba(41, 243, 226, 1) 50%
  );

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
