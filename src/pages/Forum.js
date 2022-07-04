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
            style={{ width: "80%" }}
          >
            <HeaderWrapper>
              <Header>Find Your Match</Header>
              <Text>{text}</Text>
            </HeaderWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                marginLeft: "-1rem",
              }}
            >
              <Button onClick={clickEventClients} text="Jobs" />
              <Button onClick={clickEventCandidates} text="Candidates" />
            </div>
          </motion.div>

          {/* </div> */}
          <motion.div
            initial={{ x: "200%", scale: 0.5, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Img src={softwareDev} alt={softwareDev} />
          </motion.div>
        </Grid>
      </Wrapper>
      <div
        style={{
          height: "2px",
          width: "100vw",
          background: "black",
        }}
      ></div>
      <Wrapper ref={scrollDown}>
        {type === "client" ? (
          <ViewClientPosts profile={false} />
        ) : (
          <ViewCandidatePosts profile={false} />
        )}
      </Wrapper>
    </>
  );
};

export default Forum;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 60%;
  align-items: center;
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
  /* max-width: 43rem; */
  /* margin-bottom: -6rem; */
`;

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
`;

const Img = styled.img`
  height: 30rem;
`;
