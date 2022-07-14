import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaGlobeAmericas } from "react-icons/fa";

export const LocationDropdown = ({ i, location, onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <DropdownSearch
          style={{
            border: i === location && "2px solid",
            borderRadius: "0.25rem",
          }}
        >
          <span onClick={onClick}>{i}</span>
        </DropdownSearch>
      </motion.div>
    </div>
  );
};

export const LocationHeader = ({ onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Subheader>
          <FaGlobeAmericas
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.5rem",
            }}
          />
          <span onClick={onClick}>Select Location</span>
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
