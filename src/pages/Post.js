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
          style={{ width: "80%" }}
        >
          <HeaderWrapper>
            <Header>Share Your Story</Header>
            <Text>{text}</Text>
          </HeaderWrapper>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              marginLeft: "-1rem",
            }}
          >
            <Button onClick={clickEventClients} text="Job Post" />
            <Button onClick={clickEventCandidates} text="Profile Post" />
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
            <Header style={{ marginTop: "5rem" }}>Job Post</Header>
            <ClientPost profile={false} />
          </>
        ) : (
          <>
            <Header style={{ marginTop: "5rem" }}>Profile Post</Header>
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
  grid-template-columns: 1fr 1fr;
  width: 60%;
  align-items: center;
  min-height: 100vh;
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
  font-family: "Kdam Thmor Pro", sans-serif;
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
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
  /* text-transform: uppercase; */
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;

const Img = styled.img`
  height: 20rem;
  border-radius: 1rem;
`;
