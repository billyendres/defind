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
      <H1 className="main">My Posts</H1>
      {/* <ViewCandidatePosts profile={true} /> */}
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

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 4.5rem;
  padding-left: 1rem;
  color: #daefff;
  margin-top: 6rem;
  &.main {
    color: #31f2e4;
    filter: drop-shadow(0px 0px 14px #31f2e4);

    -webkit-animation: glow 2s ease-in-out infinite alternate;
    -moz-animation: glow 2s ease-in-out infinite alternate;
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from {
      filter: drop-shadow(0px 0px 14px #31f2e4);
      color: #31f2e4;
    }
    to {
      filter: drop-shadow(0px 0px 14px rgb(255, 0, 255));
      color: rgb(255, 0, 255);
    }
  }
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 3.375rem;
    margin-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.8rem;
    margin-top: 4rem;
  }
`;
