import React, { useState } from "react";
import styled from "styled-components";
import JobSeekerPosts from "../components/Posting/JobSeekerPosts";
import JobPosterPosts from "../components/Posting/JobPosterPosts";

const JobForum = () => {
  const [jobType, setJobType] = useState(true);
  return (
    <Wrapper>
      {/* <h2>JobForum</h2>
      <h2>I am a</h2>
      <div>
        <button onClick={() => setJobType(true)}>Job Seeker</button>
        <button onClick={() => setJobType(false)}>Employer</button>
      </div>
      {jobType ? (
        <JobSeekerPosts profile={false} />
      ) : (
        <JobPosterPosts profile={false} />
      )} */}
      <JobSeekerPosts profile={false} />
    </Wrapper>
  );
};

export default JobForum;

const Wrapper = styled.div`
  /* padding-top: 10rem; */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #57f7ac;
`;
