import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaSortAmountDown } from "react-icons/fa";

export const CategoryDropdown = ({ i, category, onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <DropdownSearch
          style={{
            border: i === category && "2px solid",
            borderRadius: "0.25rem",
          }}
        >
          <span onClick={onClick}>{i}</span>
        </DropdownSearch>
      </motion.div>
    </div>
  );
};

export const CategoryHeader = ({ onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Subheader>
          <FaSortAmountDown
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.5rem",
            }}
          />
          <span onClick={onClick}>Select Category*</span>
        </Subheader>
      </motion.div>
    </div>
  );
};

const DropdownSearch = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 1.25rem 0;
`;
