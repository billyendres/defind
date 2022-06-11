import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "cyan"];
const menuItems = ["Home", "My Posts", "Settings", "Profile"];
const menuRoutes = ["/", "/myposts", "/settings", "/profile"];

export const MenuItem = ({ color, text }) => {
  const style = {
    border: `2px solid ${colors[color]}`,
    color: `${colors[color]}`,
  };
  const items = menuItems[text];
  const path = menuRoutes[text];

  return (
    <Items
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <DropdownLinks to={path} style={style}>
        {items}
      </DropdownLinks>
    </Items>
  );
};

const DropdownLinks = styled(Link)`
  border-radius: 0.4rem;
  flex: 1;
  font-style: normal;
  font-weight: 900;
  font-size: 1.5rem;
  line-height: 120%;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
`;

const Items = styled(motion.li)`
  list-style: none;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
