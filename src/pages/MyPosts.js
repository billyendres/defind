import React from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";

const MyPosts = () => {
  return (
    <Wrapper>
      <ViewCandidatePosts profile={true} />;
    </Wrapper>
  );
};

export default MyPosts;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
