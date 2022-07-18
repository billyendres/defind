import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";
import ViewClientPosts from "../components/ViewPosts/ViewClientPosts";
import Button from "../components/Styles/Button";
import { motion } from "framer-motion";
import softwareDev from "../components/images/worker.png";

const text =
  "Welcome to the forum. This is where you are able to match yourself with the perfect job or candiadate";
const Forum = () => {
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
    <>
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
                <Header>Find Your Match</Header>
                <Text>{text}</Text>
              </HeaderWrapper>
              <ButtonWrapper>
                <Button onClick={clickEventClients} text="Jobs" />
                <Button onClick={clickEventCandidates} text="Candidates" />
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
            <PostHeaderWrapper>
              <Header>Job Posts</Header>
              <ViewClientPosts profile={false} />
            </PostHeaderWrapper>
          ) : (
            <PostHeaderWrapper>
              <Header>Candidate Posts</Header>
              <ViewCandidatePosts profile={false} />
            </PostHeaderWrapper>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Forum;

const Grid = styled.div`
  display: grid;
  justify-content: center;

  grid-template-columns: 1fr 1fr;
  width: 60%;
  align-items: center;
  min-height: 100vh;
  @media screen and (max-width: 1023px) {
    grid-template-columns: 1fr;
    width: 100%;
    min-height: 70vh;
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
  @media screen and (max-width: 1023px) {
    text-align: center;
    margin-top: 5rem;
  }
  @media screen and (max-width: 1023px) {
    width: 20rem;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
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
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const PostHeaderWrapper = styled.div`
  margin-top: 3rem;
  @media screen and (max-width: 1023px) {
    margin-top: 4rem;
  }
  @media screen and (max-width: 600px) {
    margin-top: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 32rem;
  @media screen and (max-width: 1023px) {
    justify-content: center;
  }
`;

const Img = styled.img`
  height: 25rem;
  @media screen and (max-width: 1023px) {
    height: 18rem;
  }
  @media screen and (max-width: 600px) {
    height: 14rem;
  }
`;
