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
                        <Links
                          to={`/profile/${item.attributes.posterUsername}`}
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
                        <Links to="/forum">
                          <Header>Return to job forum</Header>
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
    </div>
  );
};

export default SearchProfile;

const Wrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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
  width: 350px;
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

const PageHeader = styled.h1`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  margin-bottom: 2rem;
`;
