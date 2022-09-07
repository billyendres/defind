import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const ButtonSmall = ({ text, onClick, disabled }) => {
  return (
    <div>
      <MotionButton onClick={onClick} disabled={disabled}>
        {text}
      </MotionButton>
    </div>
  );
};

export default ButtonSmall;

const MotionButton = styled(motion.button)`
  font-size: 1.25rem;
  font-family: "Russo One", sans-serif;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 0.5rem 0.75rem;
  margin: 1rem;
  border: none;
  border-radius: 0.2rem;
  cursor: pointer;
  color: #080e57;
  background: linear-gradient(
    164deg,
    rgba(41, 243, 226, 1) 0%,
    rgba(186, 225, 255, 1) 100%
  );
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;

  &:hover {
    background: linear-gradient(
      164deg,
      rgba(254, 0, 254, 1) 0%,
      rgba(255, 198, 255, 1) 100%
    );
  }

  @media screen and (max-width: 1023px) {
    font-size: 0.8rem;
    padding: 0.45rem 0.5rem;
    letter-spacing: 2px;
    margin: 0.5rem;
  }

  @media screen and (max-width: 600px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
    letter-spacing: 2px;
    margin: 0.35rem;
  }
`;
