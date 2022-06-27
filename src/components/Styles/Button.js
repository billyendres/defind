import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Button = ({ text, onClick, disabled }) => {
  return (
    <div>
      <MotionButton
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {text}
      </MotionButton>
    </div>
  );
};

export default Button;

const MotionButton = styled(motion.button)`
  font-size: 1.5rem;
  font-family: "Russo One", sans-serif;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.5rem 1rem;
  margin: 1rem;
  min-width: 10rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textModals};
  background: ${({ theme }) => theme.button};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;
