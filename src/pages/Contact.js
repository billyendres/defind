import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import contactUs from "../components/images/contactUs.png";
import contactUsLarge from "../components/images/contactUsLarge.png";

const Contact = () => {
  return (
    <Wrapper>
      <motion.div
        initial={{ y: "50%", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ImgSmall src={contactUs} alt="Contact" />
        <ImgLarge src={contactUsLarge} alt="Contact" />
      </motion.div>
    </Wrapper>
  );
};

export default Contact;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  /* background: #ff5757; */
  background: #040010;

  transition: all 0.5s linear;
`;

const ImgLarge = styled.img`
  height: 90vh;
  width: 100%;
  object-fit: cover;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const ImgSmall = styled.img`
  display: none;
  width: 100%;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;
