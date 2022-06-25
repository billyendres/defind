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
          // accept="image/png, image/jpeg, image/jpg"
        />
        <Subheader>
          <FaFileAlt
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.25rem",
            }}
          />
          Attach Cover Letter
        </Subheader>
      </motion.div>
    </div>
  );
};

export const CoverLetterHeader = () => {
  return (
    <Subheader style={{ paddingBottom: "0.5rem" }}>
      <FaFileAlt
        size={30}
        style={{
          marginRight: "0.5rem",
          marginBottom: "-0.25rem",
        }}
      />
      Cover Letter
    </Subheader>
  );
};

export const RemoveCoverLetter = ({ onClick }) => {
  return (
    <Label onClick={onClick} style={{ display: "flex", cursor: "pointer" }}>
      <FaMinus
        size={17}
        style={{
          marginRight: "0.75rem",
          marginTop: "0.2rem",
        }}
      />
      Remove
    </Label>
  );
};

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 1.25rem 0;
`;

const Label = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;
