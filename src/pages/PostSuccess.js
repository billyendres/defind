import React from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Button from "../components/Styles/Button";
import { Links } from "../components/Styles/Links";
import Confetti from "react-confetti";

const PostSuccess = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  return (
    <Wrapper>
      <Confetti />
      <Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <HeaderWrapper>
            <Header>Success!</Header>
            <Text>
              Congratulations, your post has been submitted. It will be reviewed
              by a member of our team and published to the portal within 24
              hours.
            </Text>
          </HeaderWrapper>
          <ButtonWrapper>
            <Links to="/portal">
              <Button text="Portal" />
            </Links>
            <Links to={`/profile/posts/${user.attributes.ethAddress}`}>
              <Button text="My Posts" />
            </Links>
          </ButtonWrapper>
        </div>
      </Grid>
    </Wrapper>
  );
};

export default PostSuccess;

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr 1fr;
  width: 60%;
  align-items: center;
  min-height: 100vh;
  @media screen and (max-width: 975px) {
    grid-template-columns: 1fr;
    width: 100%;
    min-height: 70vh;
  }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: #040010;
  transition: all 0.5s linear;
`;

const Header = styled.div`
  color: #daefff;
  transition: all 0.5s linear;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const Text = styled.div`
  color: #daefff;
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.8rem;
  }
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 30rem;
  @media screen and (max-width: 975px) {
    text-align: center;
    margin-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 32rem;
  @media screen and (max-width: 975px) {
    justify-content: center;
  }
`;
