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
          <div style={{ paddingTop: "10rem" }}></div>
          <h2 style={{ color: "#080e57" }}>{userId}</h2>
          <Wrapper>
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
                        <h2 style={{ color: "#fff" }}>
                          {item.attributes.posterUsername}
                        </h2>
                      </Links>
                      <h4>{item.attributes.posterBio}</h4>
                      {`${item.attributes.posterAccount.slice(
                        0,
                        4
                      )}...${item.attributes.posterAccount.slice(38)} · 
                ${item.attributes.createdAt.toLocaleString("en-us", {
                  month: "short",
                })}  
                ${item.attributes.createdAt.toLocaleString("en-us", {
                  day: "numeric",
                })}
                `}
                      {item.attributes.personalSummary && (
                        <>
                          <h4>Personal Summary</h4>
                          <h5>{item.attributes.personalSummary}</h5>
                        </>
                      )}
                      <Links to={`/jobforum/${item.id}`}>
                        <h2 style={{ color: "#fff" }}>View Post</h2>
                      </Links>
                      <Links to="/jobforum">
                        <h2 style={{ color: "#fff" }}>Return to job forum</h2>
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
  background-color: #080e57;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
