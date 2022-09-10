import React, { useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import Button from "../components/Styles/Button";
import { motion, AnimatePresence } from "framer-motion";
import softwareDev from "../components/images/softwareDev.png";
import { Links } from "../components/Styles/Links";
import { FaHome } from "react-icons/fa";

const Post = () => {
  const { user, Moralis } = useMoralis();
  const [readMore, setReadMore] = useState(false);

  return (
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
              <Header>Share Your Story</Header>
              <Text>
                <p>List a job or post your professional profile.</p> <br />
                <p>You can fill in all fields or just include a summary.</p>
                <br />
                <p>
                  Resumes, cover letters and additional documents can be
                  uploaded via IPFS in PDF format.
                </p>
                <motion.div
                  onClick={() => setReadMore(!readMore)}
                  whileHover={{ scale: 1.05 }}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  <b style={{ color: "#ff00ff" }}>Read more.</b>
                </motion.div>
                {!user && (
                  <Text>
                    <br />
                    You are not logged in. If you want to access the full site
                    features, please connect your web3 wallet.
                  </Text>
                )}
              </Text>
            </HeaderWrapper>
            {user && (
              <ButtonWrapper>
                <Links
                  to={`/post/job/${
                    Moralis.User.current().attributes.ethAddress
                  }`}
                >
                  <Button text="Job Post" />
                </Links>
                <Links
                  to={`/post/candidate/${
                    Moralis.User.current().attributes.ethAddress
                  }`}
                >
                  <Button text="Profile Post" />
                </Links>
              </ButtonWrapper>
            )}
            {!user && (
              <>
                <ButtonWrapper>
                  <Links to="/">
                    <Button
                      text={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FaHome style={{ marginRight: "0.5rem" }} />
                          <>Home</>
                        </div>
                      }
                    />
                  </Links>
                </ButtonWrapper>
              </>
            )}
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
      <AnimatePresence>
        {readMore && (
          <PaymentWrapper>
            <PaymentGrid>
              <Modal
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <ModalText>
                  <ModalTextHeader>Share Your Story:</ModalTextHeader>
                  <p style={{ paddingTop: "0.5rem" }}>
                    DeFind supports{" "}
                    <span style={{ color: "#ff00ff" }}>basic</span> and{" "}
                    <span style={{ color: "#2BCCDE" }}>featured</span> listings.
                    Basic posts are free to publish, while featured posts incur
                    a charge that you decide.
                  </p>
                  <p>
                    <br />
                    While all posts are visible on the Portal, they are filtered
                    by <span style={{ color: "#ff00ff" }}>
                      Featured Points
                    </span>{" "}
                    by default. <br />
                    <br />
                    <i>Featured Points = USD post value * 10</i>
                  </p>
                  <br />
                  <p>
                    Posts with the highest number of Featured Points are
                    displayed at the top of the Portal, while basic listings are
                    shown last.
                  </p>
                  <br />
                  <p>
                    For your post to be viewed by the most eyes, it is
                    recommended to utilise the Featured Points bidding system to
                    secure a top rank.
                  </p>
                  <br />
                  <p>
                    Payments are accepted in{" "}
                    <span style={{ color: "#ff00ff" }}>USDT</span>,{" "}
                    <span style={{ color: "#2BCCDE" }}>DAI</span> and{" "}
                    <span style={{ color: "#ff00ff" }}>USDC</span> - via the{" "}
                    <span style={{ color: "#2BCCDE" }}>Ethereum mainnet.</span>
                  </p>
                  <br />
                  <p>
                    Please note that all posts will be screened for compliance
                    within 24 hours. Once approved, they will be published to
                    the Portal and active for 30 days.
                  </p>
                  <br />
                  <p>
                    Please contact our support team if you wish to edit or
                    delete a post during this time -{" "}
                    <span style={{ color: "#ff00ff" }}>
                      contact@defind.tech
                    </span>
                  </p>
                </ModalText>
                <Button onClick={() => setReadMore(!readMore)} text="Close" />
              </Modal>
            </PaymentGrid>
          </PaymentWrapper>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default Post;

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
    min-height: 65vh;
  }
  @media screen and (max-width: 600px) {
    min-height: 55vh;
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

const PaymentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: #040010;
  height: 100vh;
  width: 100vw;
`;

const PaymentGrid = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalText = styled.div`
  color: #080e57;
  font-family: "Russo One", sans-serif;
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.1rem;
  text-align: left;
  line-height: 130%;
  @media screen and (max-width: 1023px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const Modal = styled(motion.div)`
  width: 60rem;
  position: absolute;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background: #daefff;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 34rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    padding: 1rem;
  }
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 35rem;
  @media screen and (max-width: 975px) {
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 37rem;
  @media screen and (max-width: 975px) {
    justify-content: center;
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
  transition: all 0.5s linear;
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

const Img = styled.img`
  height: 22rem;
  @media screen and (max-width: 1023px) {
    height: 15rem;
  }
  @media screen and (max-width: 600px) {
    height: 12rem;
  }
`;

const ModalTextHeader = styled.div`
  font-size: 2rem;
  padding-bottom: 0.75rem;
  background: -webkit-linear-gradient(45deg, #ff00ff, #31f2e4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
  }
`;
