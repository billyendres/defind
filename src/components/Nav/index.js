import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";
import Login from "../Authentication/Login";
import Logout from "../Authentication/Logout";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(25px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Nav = () => {
  const { isAuthenticated } = useMoralis();

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const menuItems = [
    {
      color: "#FF008C",
      title: "Home",
      route: "/",
    },
    {
      color: "#D309E1",
      title: "Profile",
      route: "/profile",
    },
    { color: "#9C1AFF", title: "Contact", route: "/contact" },
    {
      color: "#D309E1",
      title: "Settings",
      route: "/settings",
    },
  ];

  return (
    <>
      <NavContainer>
        <div>
          <Navbar
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
          >
            <Sidebar variants={sidebar} />
            <Navigation />
            <MenuToggle toggle={() => toggleOpen()} />
          </Navbar>
        </div>
        <NavWrapper>
          {!isAuthenticated && <Login />}
          {isAuthenticated && <Logout />}
        </NavWrapper>
      </NavContainer>
      <Wrapper>
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
        <TextWrapper>
          {!isAuthenticated && <Login />}
          {isAuthenticated && <Logout />}
        </TextWrapper>
      </Wrapper>
    </>
  );
};

export default Nav;

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 5rem;
  background: black;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media screen and (min-width: 768px) {
    padding: 1.5rem 0 2rem 0;
  }

  @media screen and (min-width: 1200px) {
    padding: 2rem 0;
  }
`;

const Navbar = styled(motion.nav)`
  @media screen and (min-width: 769px) {
    display: none;
  }
  @media screen and (max-height: 391px) {
    display: inline;
  }
`;

const NavWrapper = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }
  @media screen and (max-height: 391px) {
    display: inline;
  }
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 50vw;
  background: #fff;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 5rem;
  background: black;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    display: none;
  }

  @media screen and (max-height: 391px) {
    display: none;
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

  @media screen and (max-width: 768px) {
    display: none;
  }
  cursor: pointer;

  @media screen and (max-height: 391px) {
    display: none;
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

  @media screen and (max-width: 1200px) {
    font-size: 1.5rem;
    line-height: 120%;
    padding-left: 0.6rem;
  }
`;
