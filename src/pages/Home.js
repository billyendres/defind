import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Header from "../components/Home/Header";
import { motion, AnimatePresence } from "framer-motion";
import LoadingSpinner from "../components/Styles/LoadingSpinner";

const Home = () => {
  const { Moralis } = useMoralis();
  const [buy, setBuy] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const buyCrypto = async () => {
      try {
        setIsLoading(true);
        await Moralis.initPlugins();

        const results = await Moralis.Plugins.fiat.buy(
          {},
          { disableTriggers: true }
        );
        setBuy(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    buyCrypto();
  }, [Moralis]);

  return (
    <>
      <Wrapper>
        {isLoading ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <Header />
            <button onClick={() => setViewModal(!viewModal)}>Buy Crypto</button>
            <AnimatePresence>
              {viewModal && (
                <motion.div
                  key="box"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 9,
                    duration: 0.5,
                  }}
                  exit={{ y: "100%", opacity: 0 }}
                >
                  <Iframe
                    src={buy.data}
                    title="Fiat Onramp"
                    frameborder="0"
                    allow="accelerometer; autoplay; camera; gyroscope; payment"
                  ></Iframe>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Iframe = styled.iframe`
  border-radius: 10px;
  /* box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2); */
  margin: auto;
  min-width: 420px;
  height: 660px;
  border: none;
`;
