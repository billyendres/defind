import React, { useState, useEffect, useRef } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaHome,
  FaAngleDoubleUp,
  FaChevronUp,
  FaDiceD20,
  FaPhone,
} from "react-icons/fa";

import logoDarkTheme from "../images/logoDarkTheme.png";
import ButtonSmall from "../Styles/ButtonSmall";

const Nav = () => {
  const [navColor, setNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [menuItems, setMenuItems] = useState();

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);

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

  useEffect(() => {
    setMenuItems([
      {
        title: (
          <IconWrapper>
            <FaHome style={{ marginRight: "1rem" }} />
            <>Home</>
          </IconWrapper>
        ),
        route: "/",
        key: 8,
      },
      {
        title: (
          <IconWrapper>
            <FaDiceD20 style={{ marginRight: "1rem" }} />
            <>Portal</>
          </IconWrapper>
        ),
        route: `/portal`,
        key: 15,
      },
      {
        title: (
          <IconWrapper>
            <FaPhone style={{ marginRight: "1rem" }} />
            <>Contact</>
          </IconWrapper>
        ),
        route: `/contact`,
        key: 6,
      },
    ]);
  }, []);

  return (
    <>
      <LinkWrapper>
        <TextWrapper className={navColor ? "navTop" : "navScrolled"}>
          <div>
            {!open && (
              <div className="navTop" onClick={() => setOpen(true)}>
                <ButtonSmall
                  text={
                    <FaChevronUp
                      style={{
                        transform: !open && "rotate(-270deg)",
                        marginBottom: "-0.15rem",
                      }}
                    />
                  }
                />
              </div>
            )}
            {open && (
              <div className="navTop" onClick={() => setOpen(false)}>
                <ButtonSmall
                  onClick={() => setOpen(false)}
                  text={
                    <FaChevronUp
                      style={{
                        transform: open && "rotate(270deg)",
                        marginBottom: "-0.15rem",
                      }}
                    />
                  }
                />
              </div>
            )}
          </div>
          <Hide
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "left",
            }}
          >
            <div
              style={{
                opacity: navColor ? 0 : 1,
                transition: "0.5s linear",
              }}
              className="navTop"
            ></div>
            <Links to="/">
              <LogoImage
                src={logoDarkTheme}
                alt="header"
                style={{
                  opacity: navColor ? 0 : 1,
                }}
                className="navTop"
              />
            </Links>
          </Hide>
          <ArrowWrapper>
            <div
              className="navTop"
              onClick={scrollToTop}
              style={{
                opacity: !navColor ? 0 : 1,
                transition: "0.5s linear",
                marginLeft: "-2rem",
                marginBottom: "-0.15rem",
              }}
            >
              <ButtonSmall text={<FaAngleDoubleUp />} />
            </div>
          </ArrowWrapper>
        </TextWrapper>
      </LinkWrapper>
      <AnimatePresence>
        {open && (
          <NavWrapper
            ref={buttonRef}
            initial={{ opacity: 0, x: "-5%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            style={{ display: "flex" }}
          >
            {menuItems.map(({ title, route, key }) => {
              return (
                <motion.div key={key} style={{ display: "flex" }}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Links style={{ textDecoration: "none" }} to={`${route}`}>
                      <Header>{title}</Header>
                    </Links>
                  </motion.div>
                </motion.div>
              );
            })}
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
  background: #daefff;
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
    padding-left: 1rem;
  }
`;

const LinkWrapper = styled.div`
  position: fixed;
  background: inerit;
  z-index: 100000;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  cursor: pointer;
  transition: 0.5s linear;

  &.navTop {
    background: inherit;
  }
  &.navScrolled {
    background: transparent;
  }
  @media screen and (max-width: 600px) {
    width: 100vw;
  }
`;

const Header = styled.div`
  transition: all 0.5s linear;
  color: #080e57;
  font-family: "Russo One", sans-serif;
  padding: 1rem 0;
  letter-spacing: 5px;
  font-size: 1.5rem;
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.75rem 0;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  &:hover {
    color: #ff00ff;
    background: -webkit-linear-gradient(
      164deg,
      rgba(49, 242, 228, 1) 0%,
      rgba(255, 0, 255, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Hide = styled.span`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const ArrowWrapper = styled.div`
  width: 3rem;
  display: flex;
  justify-content: center;
  padding-right: 2rem;
  @media screen and (max-width: 1023px) {
    padding-right: 1rem;
  }
  @media screen and (max-width: 600px) {
    padding-right: 0;
  }
`;

const LogoImage = styled.img`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  height: 5rem;
  transition: 0.5s linear;
  @media screen and (max-width: 1023px) {
    height: 4rem;
  }
  @media screen and (max-width: 600px) {
    height: 3rem;
    top: -0.25rem;
  }
`;
