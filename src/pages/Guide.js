import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import guideImage from "../components/images/guide.png";
import guideImageSmall from "../components/images/guideSmall.png";

const Guide = () => {
  return (
    <>
      <Wrapper>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Img src={guideImage} alt={guideImage} />
          <ImgSmall src={guideImageSmall} alt={guideImageSmall} />
        </motion.div>
      </Wrapper>
    </>
  );
};

export default Guide;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #b89ad3;
  transition: all 0.5s linear;
`;

const Img = styled.img`
  padding-top: 3rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const ImgSmall = styled.img`
  padding-top: 3rem;
  display: none;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;
