import React, { useEffect, useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion } from "framer-motion";

import { FaSearch } from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
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
      duration: 0.8,
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
          query.equalTo("posterAccount", account);
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
  }, [profile, account, Moralis.Object, Moralis.Query]);

  const getFilteredPosts = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const Posts = Moralis.Object.extend("Posts");
      const query = new Moralis.Query(Posts);
      if (profile) {
        query.equalTo("posterAccount", account);
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
          {/* <motion.div
            // style={{ width: "10rem" }}
            initial={{ y: "50%", scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          > */}
          {postArray && postArray.length}
          <form onSubmit={getFilteredPosts}>
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
            <button type="submit">Submit</button>
          </form>
          {/* </motion.div> */}
          <Wrapper>
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
                        <Links
                          to={
                            user.attributes.ethAddress ===
                            item.attributes.posterAccount
                              ? `/profile/${user.attributes.ethAddress}`
                              : `/profile/${item.attributes.posterUsername}`
                          }
                        >
                          <Img
                            src={
                              item.attributes.posterProfilePic
                                ? item.attributes.posterProfilePic
                                : defaultProfileImage
                            }
                            alt="Profile pic"
                          />
                          <Header>{item.attributes.posterUsername}</Header>
                        </Links>
                        <Header>{item.attributes.posterBio}</Header>
                        <Header>{`${item.attributes.posterAccount.slice(
                          0,
                          4
                        )}...${item.attributes.posterAccount.slice(38)} · 
                    ${item.attributes.createdAt.toLocaleString("en-us", {
                      month: "short",
                    })}  
                    ${item.attributes.createdAt.toLocaleString("en-us", {
                      day: "numeric",
                    })}
                    `}</Header>
                        {item.attributes.personalSummary && (
                          <>
                            <Header>Personal Summary</Header>
                            <Header>{item.attributes.personalSummary}</Header>
                          </>
                        )}
                        <Links to={`/forum/${item.id}`}>
                          <Header>View Post</Header>
                        </Links>
                      </ProfileWrapper>
                    </CardContainer>
                  );
                })
                .reverse()}
            </Grid>
          </Wrapper>
        </>
      )}
    </Wrapper>
  );
};

export default ViewCandidatePosts;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 700px;
  height: 430px;
  border-radius: 2rem;
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
`;

const Label = styled.h2`
  padding: 0.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.icon};
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  color: #080e57;
  background: #bae1ff;
  letter-spacing: 2px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;
