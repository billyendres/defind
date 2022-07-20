import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import CandidatePost from "../components/Posting/CandidatePost";
import ClientPost from "../components/Posting/ClientPost";
import Button from "../components/Styles/Button";
import { motion } from "framer-motion";
import softwareDev from "../components/images/softwareDev.jpg";

const text =
  "Welcome to the forum. This is where you are able to match yourself with the perfect job or candiadate";

const Post = () => {
  const [type, setType] = useState("candidate");
  const scrollDown = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollPage = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const clickEventClients = () => {
    setType("client");
    scrollPage(scrollDown);
  };

  const clickEventCandidates = () => {
    setType("candidate");
    scrollPage(scrollDown);
  };

  return (
    <Wrapper>
      <Grid>
        <motion.div
          initial={{ x: "-200%", scale: 0.5, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <HeaderWrapper>
              <Header>Share Your Story</Header>
              <Text>{text}</Text>
            </HeaderWrapper>
            <ButtonWrapper>
              <Button onClick={clickEventClients} text="Job Post" />
              <Button onClick={clickEventCandidates} text="Profile Post" />
            </ButtonWrapper>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: "200%", scale: 0.5, opacity: 0 }}
          animate={{ x: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Img src={softwareDev} alt={softwareDev} />
        </motion.div>
      </Grid>
      <div style={{ minHeight: "100vh" }} ref={scrollDown}>
        {type === "client" ? (
          <>
            <Header>Job Post</Header>
            <ClientPost profile={false} />
          </>
        ) : (
          <>
            <Header>Profile Post</Header>
            <CandidatePost profile={false} />
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default Post;

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  width: 60%;
  align-items: center;
  min-height: 100vh;
  @media screen and (max-width: 975px) {
    grid-template-columns: 1fr;
    width: 100%;
    min-height: 65vh;
  }
  @media screen and (max-width: 600px) {
    min-height: 55vh;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 30rem;
  @media screen and (max-width: 975px) {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 32rem;
  @media screen and (max-width: 975px) {
    justify-content: center;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;

const Img = styled.img`
  height: 20rem;
  @media screen and (max-width: 1023px) {
    height: 15rem;
  }
  @media screen and (max-width: 600px) {
    height: 10rem;
  }
`;
