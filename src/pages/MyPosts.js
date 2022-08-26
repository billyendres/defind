import React, { useEffect } from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";
import ViewClientPosts from "../components/ViewPosts/ViewClientPosts";
import myPosts from "../components/images/myPosts.png";

const MyPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Wrapper>
      {/* <img src={myPosts} /> */}
      <Header>My Posts</Header>
      <ViewCandidatePosts profile={true} />
      <ViewClientPosts profile={true} />
    </Wrapper>
  );
};

export default MyPosts;

const Wrapper = styled.div`
  background: ${({ theme }) => theme.background};
  /* transition: all 0.5s linear; */
`;

const Header = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 2rem;
  padding-top: 6rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    padding-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    padding-top: 4rem;
  }
`;
