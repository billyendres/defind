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
  text-transform: uppercase;
  font-weight: 700;
  padding: 0.5rem 1rem;
  margin: 1rem;
  min-width: 10rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #100b3c;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background: linear-gradient(
    164deg,
    rgba(1, 200, 183, 1) 0%,
    rgba(132, 188, 255, 1) 100%
  );

  &:hover {
    background: linear-gradient(
      164deg,
      rgba(41, 243, 226, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
`;
