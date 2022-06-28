import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
};

const SearchProfile = () => {
  const { Moralis } = useMoralis();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      try {
        setIsLoading(true);
        const Post = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Post);
        query.equalTo("posterUsername", userId);
        const results = await query.find();
        setProfile(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getProfile();
  }, [userId, Moralis.Object, Moralis.Query]);

  return (
    <div>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <Wrapper>
            <div style={{ paddingTop: "10rem" }}></div>
            <PageHeader>{userId}</PageHeader>
            <Grid>
              {profile
                ?.map((item, key) => {
                  return (
                    <CardContainer
                      key={key}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <ProfileWrapper variants={cardVariants}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginRight: "3rem",
                          }}
                        >
                          <div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Header>{item.attributes.posterUsername}</Header>
                            </motion.div>
                            <Subheader>{item.attributes.posterBio}</Subheader>
                            <Text>
                              {"> "}
                              {`${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  month: "short",
                                }
                              )} ${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  day: "numeric",
                                }
                              )}, ${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  year: "numeric",
                                }
                              )}`}
                              <div style={{ marginBottom: "1.5rem" }}></div>
                            </Text>
                          </div>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Img
                                style={{ width: "7rem", height: "7rem" }}
                                src={
                                  item.attributes.posterProfilePic
                                    ? item.attributes.posterProfilePic
                                    : defaultProfileImage
                                }
                                alt="Profile pic"
                              />
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                padding: "0.75rem",
                              }}
                            >
                              <motion.div whileHover={{ scale: 1.05 }}>
                                <Links to={`/forum/${item.id}`}>
                                  <Text>View post {">"}</Text>
                                </Links>
                              </motion.div>
                              <div
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                <motion.div whileHover={{ scale: 1.05 }}>
                                  <Links to="/forum">
                                    <Text>{"<"} Return to forum</Text>
                                  </Links>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {item.attributes.personalSummary && (
                          <>
                            <Subheader>Personal Summary</Subheader>
                            <Text>{item.attributes.personalSummary}</Text>
                          </>
                        )}
                        {/* <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Links to={`/forum/${item.id}`}>
                              <Text>View Post</Text>
                            </Links>
                          </motion.div>
                          <div style={{ width: "100%", display: "flex" }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Links to="/forum">
                                <Text>Return to job forum</Text>
                              </Links>
                            </motion.div>
                          </div>
                        </div> */}
                      </ProfileWrapper>
                    </CardContainer>
                  );
                })
                .reverse()}
            </Grid>
          </Wrapper>
        </>
      )}
    </div>
  );
};

export default SearchProfile;

const Wrapper = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  /* letter-spacing: 2px; */
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
`;

const CardContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrapper = styled(motion.div)`
  text-align: left;
  min-height: 30vh;
  width: 43rem;
  padding: 3rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.text};
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 0.25rem 0;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
`;

const PageHeader = styled.h1`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  margin-bottom: 2rem;
`;
