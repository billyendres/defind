import React, { useEffect } from "react";
import styled from "styled-components";

import theProblemDarkTheme from "../components/images/theProblemDarkTheme.png";
import theSolutionDarkTheme from "../components/images/theSolutionDarkTheme.png";
import theProblemSmallDarkTheme from "../components/images/theProblemSmallDarkTheme.png";
import theSolutionSmallDarkTheme from "../components/images/theSolutionSmallDarkTheme.png";
import { Links } from "../components/Styles/Links";
import Button from "../components/Styles/Button";

const LearnMore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Wrapper>
        <TheProblem src={theProblemDarkTheme} alt="The Problem" />
        <TheProblemSmall src={theProblemSmallDarkTheme} alt="The Problem" />
        <TheSolution src={theSolutionDarkTheme} alt="The Solution" />
        <TheSolutionSmall src={theSolutionSmallDarkTheme} alt="The Problem" />
      </Wrapper>
      <div style={{ marginBottom: "2rem" }}>
        <Links to="/">
          <Button text="Home" />
        </Links>
      </div>
    </>
  );
};

export default LearnMore;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #040010;
`;

const TheProblem = styled.img`
  margin-top: 2rem;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const TheProblemSmall = styled.img`
  display: none;
  width: 100%;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;

const TheSolution = styled.img`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const TheSolutionSmall = styled.img`
  display: none;
  width: 100%;
  @media screen and (max-width: 1023px) {
    display: inline;
  }
`;
