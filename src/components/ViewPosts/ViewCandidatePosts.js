import React, { useEffect, useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion } from "framer-motion";

import { FaSearch } from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Button from "../Styles/Button";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Img from "../Styles/ProfilePicture";

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

const ViewCandidatePosts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const [postArray, setPostArray] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        setIsLoading(true);
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        if (profile) {
          query.equalTo("posterAccount", user.attributes.ethAddress);
        }
        const results = await query.find();
        setPostArray(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getPosts();
  }, [profile, account, Moralis.Object, Moralis.Query, user]);

  const getFilteredPosts = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const Posts = Moralis.Object.extend("Posts");
      const query = new Moralis.Query(Posts);
      if (profile) {
        query.equalTo("posterAccount", user.attributes.ethAddress);
      }
      const results = await query.find();
      setPostArray(
        results?.filter(
          (item) =>
            item.attributes.personalSummary
              .toLowerCase()
              .includes(search.toLowerCase()) ||
            item.attributes.posterUsername
              .toLowerCase()
              .includes(search.toLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      // setSearch("");
    }
  };

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div style={{ paddingTop: "10rem" }}></div>
          <form style={{ display: "flex" }} onSubmit={getFilteredPosts}>
            <Label>
              <FaSearch
                size={30}
                style={{
                  marginRight: "1rem",
                  marginBottom: "-0.5rem",
                  marginLeft: "-3rem",
                  marginTop: "1.5rem",
                }}
              />
              <Input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Label>
            <span style={{ marginTop: "0.5rem" }}>
              <Button type="submit" text="Go" />
            </span>
          </form>
          <ResultsText>
            {postArray?.length === 1
              ? `${postArray.length} result found`
              : `${postArray?.length} results found`}
          </ResultsText>
          <>
            <Grid>
              {postArray
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
                              <Links
                                to={
                                  user.attributes.ethAddress ===
                                  item.attributes.posterAccount
                                    ? `/profile/${user.attributes.ethAddress}`
                                    : `/profile/${item.attributes.posterUsername}`
                                }
                              >
                                <Header>
                                  {item.attributes.posterUsername}
                                </Header>
                              </Links>
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
                                justifyContent: "center",
                                padding: "0.75rem",
                              }}
                            >
                              <motion.div whileHover={{ scale: 1.05 }}>
                                <Links to={`/forum/${item.id}`}>
                                  <Text>View post {">"}</Text>
                                </Links>
                              </motion.div>
                            </div>
                          </div>
                        </div>

                        {item.attributes.personalSummary && (
                          <>
                            <Subheader>Personal Summary</Subheader>
                            <Text>{item.attributes.personalSummary}</Text>
                          </>
                        )}
                        {/* <div style={{ display: "flex" }}>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Links to={`/forum/${item.id}`}>
                              <Text>View Post</Text>
                            </Links>
                          </motion.div>
                        </div> */}
                      </ProfileWrapper>
                    </CardContainer>
                  );
                })
                .reverse()}
            </Grid>
          </>
        </>
      )}
    </Wrapper>
  );
};

export default ViewCandidatePosts;

const Wrapper = styled.div`
  font-family: "Kdam Thmor Pro", sans-serif;
  /* letter-spacing: 2px; */
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
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
  /* min-height: 30vh; */
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

const ResultsText = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  margin-bottom: 1rem;
`;

const Label = styled.div`
  padding: 0.5rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.icon};
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Kdam Thmor Pro", sans-serif;
  /* letter-spacing: 2px; */
  color: #080e57;
  background: #bae1ff;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
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
