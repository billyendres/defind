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
            border: i === category && "1px solid",
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
        <SubHeader>
          <FaSortAmountDown
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.15rem",
            }}
          />
          <span onClick={onClick}>Select Category*</span>
        </SubHeader>
      </motion.div>
    </div>
  );
};

const DropdownSearch = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.3rem 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
    padding: 0.3rem 0.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.4rem;
  }
`;

const SubHeader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 1rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
`;
