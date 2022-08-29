import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FaRegIdBadge, FaMinus } from "react-icons/fa";

export const AdditionalDocs = ({ onImageClick, inputFile, changeHandler }) => {
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
          <FaRegIdBadge
            style={{
              marginRight: "0.5rem",
            }}
          />
          Attach Additional Documents
        </SubHeader>
      </motion.div>
    </div>
  );
};

export const AdditionalDocsHeader = () => {
  return (
    <SubHeader style={{ paddingBottom: "0.5rem" }}>
      <FaRegIdBadge
        style={{
          marginRight: "0.5rem",
        }}
      />
      Additional Documents
    </SubHeader>
  );
};

export const RemoveAdditionalDocs = ({ onClick }) => {
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

const Label = styled.div`
  padding: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;
