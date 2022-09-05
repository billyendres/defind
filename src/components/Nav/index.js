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
  FaDiceD20,
  FaWallet,
  FaPhone,
} from "react-icons/fa";

import logoDarkTheme from "../images/logoDarkTheme.png";
import logoLightTheme from "../images/logoLightTheme.png";
import Logout from "../Authentication/Logout";
import Button from "../Styles/Button";

const Nav = () => {
  const { Moralis, account, isAuthenticated } = useMoralis();
  const user = Moralis.User.current();
  const [navColor, setNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [ethAddress, setEthAddress] = useState();
  const [menuItems, setMenuItems] = useState();
  const [theme, setTheme] = useState("dark");
  const localTheme = window.localStorage.getItem("theme");
  useEffect(() => {
    setTheme(localTheme);
  }, [theme, localTheme]);

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };
  window.addEventListener("scroll", changeColor);
  const userLocal = window.localStorage.getItem("userLocal");

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
    const userCheck = () => {
      const u = user;
      if (!u) return null;
      setEthAddress(user.get("ethAddress"));
    };
    userCheck();
  }, [user]);

  useEffect(() => {
    if (user) {
      setMenuItems([
        {
          title: (
            <IconWrapper>
              <FaHome style={{ marginRight: "1rem" }} />
              <>Home</>
            </IconWrapper>
          ),
          route: "/",
          key: 1,
        },
        {
          title: (
            <IconWrapper>
              <FaUserAlt style={{ marginRight: "1rem" }} />
              <>Profile</>
            </IconWrapper>
          ),
          route: `/myprofile/${ethAddress}`,
          key: 2,
        },
        {
          title: (
            <IconWrapper>
              <FaDiceD20 style={{ marginRight: "1rem" }} />
              <>Portal</>
            </IconWrapper>
          ),
          route: "/portal",
          key: 3,
        },
        {
          title: (
            <IconWrapper>
              <FaRegEdit style={{ marginRight: "1rem" }} />
              <>Post</>
            </IconWrapper>
          ),
          route: `/post`,
          key: 4,
        },
        {
          title: (
            <IconWrapper>
              <FaRegIdCard style={{ marginRight: "1rem" }} />
              <>My Posts</>
            </IconWrapper>
          ),
          route: `/profile/posts/${ethAddress}`,
          key: 5,
        },
        {
          title: (
            <IconWrapper>
              <FaBookReader style={{ marginRight: "1rem" }} />
              <>Guide</>
            </IconWrapper>
          ),
          route: `/guide`,
          key: 6,
        },
        {
          title: (
            <IconWrapper>
              <FaPhone style={{ marginRight: "1rem" }} />
              <>Contact</>
            </IconWrapper>
          ),
          route: `/contact`,
          key: 7,
        },
      ]);
    } else {
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
          route: "/portal",
          key: 9,
        },
        {
          title: (
            <IconWrapper>
              <FaRegEdit style={{ marginRight: "1rem" }} />
              <>Post</>
            </IconWrapper>
          ),
          route: `/post`,
          key: 10,
        },
        {
          title: (
            <IconWrapper>
              <FaBookReader style={{ marginRight: "1rem" }} />
              <>Guide</>
            </IconWrapper>
          ),
          route: `/guide`,
          key: 11,
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
    }
  }, [user, ethAddress]);

  return (
    <>
      <LinkWrapper>
        <TextWrapper className={navColor ? "navTop" : "navScrolled"}>
          <div
            style={{
              width: "3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {!open && (
              <LinkHeaders className="navTop" onClick={() => setOpen(true)}>
                <IconWrapper>
                  <FaChevronUp
                    style={{
                      transform: !open && "rotate(-270deg)",
                    }}
                  />
                </IconWrapper>
              </LinkHeaders>
            )}
            {open && (
              <LinkHeaders className="navTop" onClick={() => setOpen(false)}>
                <IconWrapper>
                  <FaChevronUp
                    onClick={() => setOpen(false)}
                    style={{
                      transform: open && "rotate(270deg)",
                    }}
                  />
                </IconWrapper>
              </LinkHeaders>
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
            >
              {userLocal && isAuthenticated ? (
                <Links to={`/myprofile/${ethAddress}`}>
                  <div style={{ display: "flex" }}>
                    <Button
                      text={
                        <>
                          <div style={{ textTransform: "lowercase" }}>
                            <FaWallet
                              style={{
                                marginBottom: "-0.1rem",
                                marginRight: "0.5rem",
                              }}
                            />
                            {userLocal.slice(0, 2)}...{userLocal.slice(38)}
                          </div>
                        </>
                      }
                    />
                  </div>
                </Links>
              ) : (
                <Links to="/">
                  {account && (
                    <div style={{ display: "flex" }}>
                      <Button
                        text={
                          <>
                            <div style={{ textTransform: "lowercase" }}>
                              <FaWallet
                                style={{
                                  marginBottom: "-0.1rem",
                                  marginRight: "0.5rem",
                                }}
                              />
                              {account.slice(0, 2)}...{account.slice(38)}
                            </div>
                          </>
                        }
                      />
                    </div>
                  )}
                </Links>
              )}
            </div>
            <Links to="/">
              <LogoImage
                src={theme === "dark" ? logoDarkTheme : logoLightTheme}
                alt="header"
                style={{
                  opacity: navColor ? 0 : 1,
                }}
                className="navTop"
              />
            </Links>
          </Hide>
          <ArrowWrapper>
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
            {user && <Logout />}
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
  background: ${({ theme }) => theme.text};
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
  background: ${({ theme }) => theme.backgroundNav};
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
    background: ${({ theme }) => theme.backgroundNav};
  }
  &.navScrolled {
    background: transparent;
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
    background: ${({ theme }) => theme.buttonHover};
  }
  &:hover {
    background: ${({ theme }) => theme.button};
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.3rem;
  }
`;

const Header = styled.div`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.textModals};
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
