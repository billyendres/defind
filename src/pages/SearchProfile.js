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
        query.equalTo("posterAccount", userId);
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
            <PageHeader>
              Posts -{" "}
              {`${userId.slice(0, 4)}...
            ${userId.slice(38)}`}
            </PageHeader>
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
                                <Links to={`/portal/${item.id}`}>
                                  <Text style={{ fontWeight: "bold" }}>
                                    View post {">"}
                                  </Text>
                                </Links>
                              </motion.div>
                              <div
                                style={{ width: "100%", textAlign: "center" }}
                              >
                                <motion.div whileHover={{ scale: 1.05 }}>
                                  <Links to="/portal">
                                    <Text>{"<"} Return to portal</Text>
                                  </Links>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {item.attributes.personalSummary && (
                          <>
                            <Subheader style={{ marginBottom: "0.25rem" }}>
                              Personal Summary
                            </Subheader>
                            <Text>{item.attributes.personalSummary}</Text>
                          </>
                        )}
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
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
  padding-top: 4rem;
  @media screen and (max-width: 1023px) {
    padding-top: 3rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 600px) {
    grid-gap: 1.5rem;
  }
`;

const CardContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrapper = styled(motion.div)`
  text-align: left;
  width: 43rem;
  padding: 2.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.text};
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
  @media screen and (max-width: 1023px) {
    width: 33rem;
    padding: 2rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.1rem 0;
  }
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.2rem;
  padding: 0.25rem 0;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.15rem 0;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0;
  font-size: 0.85rem;
  line-height: 180%;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.55rem;
    line-height: 170%;
  }
`;

const PageHeader = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 2.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;
