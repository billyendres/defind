import React from "react";
import styled from "styled-components";
import Profile from "./Profile";
import JobSeekerPosts from "../components/Posting/JobSeekerPosts";

const MyPosts = () => {
  return (
    <Wrapper>
      {/* <Profile /> */}
      <JobSeekerPosts profile={true} />
    </Wrapper>
  );
};

export default MyPosts;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.backgroundProfilePosts};
`;
