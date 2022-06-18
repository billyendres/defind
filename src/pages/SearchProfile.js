import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import { Links } from "../components/Styles/Links";

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
        <Wrapper style={{ height: "100vh" }}>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <>
          <h2>{userId}</h2>
          {profile
            ?.map((item, key) => {
              return (
                <Wrapper key={key}>
                  <ProfileWrapper>
                    <Links to={`/profile/${item.attributes.posterUsername}`}>
                      <ProfileImage
                        src={
                          item.attributes.posterProfilePic
                            ? item.attributes.posterProfilePic
                            : defaultProfileImage
                        }
                        alt="Profile pic"
                      />
                      <h4>{item.attributes.posterUsername}</h4>
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
                  </ProfileWrapper>
                  <PostWrapper>
                    {item.attributes.personalSummary && (
                      <>
                        <h4>Personal Summary</h4>
                        <h5>{item.attributes.personalSummary}</h5>
                      </>
                    )}
                    <Links to={`/jobforum/${item.id}`}>View Post</Links>
                    <Links to="/jobforum">Return to job forum</Links>
                  </PostWrapper>
                </Wrapper>
              );
            })
            .reverse()}
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
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15rem;
  width: 10rem;
  margin: 0 2rem;
`;

const ProfileImage = styled.img`
  width: 5rem;
  border-radius: 50%;
`;

const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15rem;
  width: 10rem;
  margin: 0 2rem;
`;
