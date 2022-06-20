import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";

const SearchProfile = () => {
  const { Moralis } = useMoralis();
  const [profile, setProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true);
      try {
        const Post = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Post);
        query.equalTo("posterUsername", userId);
        const results = await query.find();
        setProfile(results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
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
            <h2 style={{ color: "#080e57" }}>{userId}</h2>
            <Grid>
              {profile
                ?.map((item, key) => {
                  return (
                    <ProfileWrapper key={key}>
                      <Links to={`/profile/${item.attributes.posterUsername}`}>
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
                      <Links to={`/jobforum/${item.id}`}>
                        <Header>View Post</Header>
                      </Links>
                      <Links to="/jobforum">
                        <Header>Return to job forum</Header>
                      </Links>
                    </ProfileWrapper>
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
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  background: ${({ theme }) => theme.backgroundUsersProfile};
  transition: all 0.5s linear;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25rem;
  width: 25rem;
  margin: 2rem;
  border-radius: 2rem;
  background: ${({ theme }) => theme.profileWrapperUsersProfile};
  transition: all 0.5s linear;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textUsersProfile};
  transition: all 0.5s linear;
`;
