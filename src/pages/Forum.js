import React from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";
import ViewClientPosts from "../components/ViewPosts/ViewClientPosts";

const Forum = () => {
  return (
    <Wrapper>
      {/* <h2>Forum</h2>
      <h2>I am a</h2>
      <div>
        <button onClick={() => setJobType(true)}>Job Seeker</button>
        <button onClick={() => setJobType(false)}>Employer</button>
      </div>
      {jobType ? (
        <CandidatePosts profile={false} />
      ) : (
        <ClientPosts profile={false} />
      )} */}
      <ViewCandidatePosts profile={false} />
    </Wrapper>
  );
};

export default Forum;

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
