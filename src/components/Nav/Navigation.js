import * as React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = [0, 1, 2];

export const Navigation = () => (
  <List variants={variants}>
    {itemIds.map((color, text) => (
      <MenuItem text={text} color={color} key={text} />
    ))}
  </List>
);

const List = styled(motion.ul)`
  padding: 0 1.25rem;
  position: absolute;
  top: 5rem;
  width: 12rem;
`;
