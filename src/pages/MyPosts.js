import React, { useEffect } from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";

const MyPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      <Header style={{ paddingTop: "10rem" }}>My Posts</Header>
      <ViewCandidatePosts profile={true} />;
    </Wrapper>
  );
};

export default MyPosts;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 0.5rem;
`;
