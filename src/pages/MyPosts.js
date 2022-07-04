import React, { useEffect } from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";

const MyPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
