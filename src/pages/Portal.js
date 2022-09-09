import React from "react";
import styled from "styled-components";
import Button from "../components/Styles/Button";
import { motion } from "framer-motion";
import softwareDev from "../components/images/worker.png";
import { Links } from "../components/Styles/Links";

const Portal = () => {
  return (
    <>
      <Wrapper>
        <Grid>
          <motion.div
            initial={{ x: "-200%", scale: 0.5, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <HeaderWrapper>
                <Header>Find Your Match</Header>
                <Text>
                  <p>
                    Welcome to the <b style={{ color: "#ff00ff" }}>Portal.</b>{" "}
                    It's time to match yourself with the perfect job or
                    employee.
                  </p>
                  <br />
                  <p>
                    Filter posts by location, category, featured/date and unique
                    search phrases. Click{" "}
                    <b style={{ color: "#31f2e4" }}>View Post</b> to see the
                    complete listing.
                  </p>
                  <br />
                  <p>
                    Resumes, cover letters and additional documents can be
                    viewed and downloaded via the IPFS link on the full post.
                  </p>
                </Text>
              </HeaderWrapper>
              <ButtonWrapper>
                <Links to="/portal/jobs">
                  <Button text="Jobs" />
                </Links>
                <Links to="/portal/candidates">
                  <Button text="Candidates" />
                </Links>
              </ButtonWrapper>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: "200%", scale: 0.5, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Img src={softwareDev} alt={softwareDev} />
          </motion.div>
        </Grid>
      </Wrapper>
    </>
  );
};

export default Portal;

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

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 35rem;
  @media screen and (max-width: 975px) {
    text-align: center;
    margin-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
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
    font-size: 0.75rem;
  }
`;

const Header = styled.div`
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.75rem;
    margin-top: 2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 37rem;
  @media screen and (max-width: 975px) {
    justify-content: center;
  }
`;

const Img = styled.img`
  height: 25rem;
  @media screen and (max-width: 1023px) {
    height: 18rem;
  }
  @media screen and (max-width: 600px) {
    height: 14rem;
    margin-top: 2rem;
  }
`;
