import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const Button = ({ text, onClick, disabled }) => {
  return (
    <div>
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
      >
        {text}
      </motion.button>
    </div>
  );
};

export default Button;
