import React, { useState } from "react";
import JobSeeker from "../components/Posting/JobSeeker";
import JobPoster from "../components/Posting/JobPoster";
import styled from "styled-components";

const Post = () => {
  const [postType, setPostType] = useState(true);

  return (
    <Wrapper>
      {/* <h2>Post</h2>
      <h2>I am a</h2>
      <button onClick={() => setPostType(true)}>Job Seeker</button>
      <button onClick={() => setPostType(false)}>Job Poster</button>
      {postType ? <JobSeeker /> : <JobPoster />} */}
      <JobSeeker />
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
