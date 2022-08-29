import React, { useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import Button from "../components/Styles/Button";
import { motion, AnimatePresence } from "framer-motion";
import softwareDev from "../components/images/softwareDev.png";
import { Links } from "../components/Styles/Links";

const text =
  "Welcome to the portal. This is where you are able to match yourself with the perfect job or candiadate";

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
                {text}.
                <motion.div
                  onClick={() => setReadMore(!readMore)}
                  whileHover={{ scale: 1.05 }}
                  style={{ display: "inline", cursor: "pointer" }}
                >
                  <b> Read more.</b>
                </motion.div>
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
                  <p>
                    We offer basic and featured posts. Basic posts and free to
                    publish, while featured posts incur a USDT charge. A charge
                    that is decided by you.
                  </p>
                  <p>
                    <br />
                    While all posts are visible on the portal, they are by
                    default filtered by 'Featured Points'. <br />
                    <br />
                    <i>Featured Points = USDT charge * 10</i>
                  </p>
                  <br />
                  <p>
                    Posts with the highest number of Featured Points are
                    displayed at the top of the portal, while basic posts are
                    displayed last.
                  </p>
                  <br />
                  <p>
                    In order for your post to be viewed by the most eyes, it is
                    recommended to utilise the Featured Points bidding system to
                    secure a top rank.
                  </p>
                  <br />
                  <p>
                    Payments are accepted in USDT via the Binance Smart Chain,
                    or Ethereum mainnet blockchains.
                  </p>
                  <br />
                  <p>
                    Please note, all posts will be screened for compliance
                    within 24 hours. Once approved, they will be published to
                    the portal and active for 30 days. If you wish to edit or
                    delete a post during this time, please contact our support
                    team.
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
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const PaymentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.background};
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
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
  text-align: left;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const Modal = styled(motion.div)`
  width: 40rem;
  position: absolute;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.text};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 34rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 30rem;
  @media screen and (max-width: 975px) {
    text-align: center;
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

const Text = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
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
