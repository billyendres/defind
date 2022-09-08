import React, { useEffect } from "react";
import styled from "styled-components";
import ViewCandidatePosts from "../components/ViewPosts/ViewCandidatePosts";
import ViewClientPosts from "../components/ViewPosts/ViewClientPosts";

const MyPosts = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header>My Posts</Header>
      <ViewCandidatePosts profile={true} />
      <ViewClientPosts profile={true} />
    </>
  );
};

export default MyPosts;

const Header = styled.div`
  background: -webkit-linear-gradient(
    164deg,
    rgba(49, 242, 228, 1) 0%,
    rgba(255, 0, 255, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
