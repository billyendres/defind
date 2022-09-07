import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaFileAlt, FaMinus } from "react-icons/fa";

export const CoverLetter = ({ onImageClick, inputFile, changeHandler }) => {
  return (
    <div
      onClick={onImageClick}
      style={{
        display: "flex",
        cursor: "pointer",
        flexWrap: "wrap",
      }}
    >
      <motion.div whileHover={{ scale: 1.05 }}>
        <input
          type="file"
          name="file"
          ref={inputFile}
          onChange={changeHandler}
          style={{ display: "none" }}
          accept="application/pdf"
        />
        <SubHeader>
          <FaFileAlt
            style={{
              marginRight: "0.5rem",
            }}
          />
          Attach Cover Letter
        </SubHeader>
      </motion.div>
    </div>
  );
};

export const CoverLetterHeader = () => {
  return (
    <SubHeader style={{ paddingBottom: "0.5rem" }}>
      <FaFileAlt
        style={{
          marginRight: "0.5rem",
        }}
      />
      Cover Letter
    </SubHeader>
  );
};

export const RemoveCoverLetter = ({ onClick }) => {
  return (
    <Label
      onClick={onClick}
      style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
    >
      <FaMinus
        style={{
          marginRight: "0.5rem",
        }}
      />
      Remove
    </Label>
  );
};

const SubHeader = styled.div`
  color: #080e57;
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

const Label = styled.div`
  padding: 0 0 0.5rem 0;
  color: #080e57;
  transition: all 0.5s linear;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;
