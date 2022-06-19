import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Links } from "../components/Styles/Links";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import Img from "../components/Styles/ProfilePicture";

const FullPost = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [userProfile, setUserProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const Post = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Post);
        query.equalTo("objectId", id);
        const results = await query.find();
        setUserProfile(results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [id, Moralis.Object, Moralis.Query]);

  return (
    <>
      {isLoading ? (
        <Wrapper style={{ height: "100vh" }}>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <div>
          {userProfile?.map((item, key) => {
            return (
              <Wrapper key={key}>
                <ProfileWrapper>
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
                  {item.attributes.course && (
                    <>
                      <h4>Course</h4>
                      <h5>{item.attributes.course}</h5>
                    </>
                  )}
                  {item.attributes.institution && (
                    <>
                      <h4>Institution</h4>
                      <h5>{item.attributes.institution}</h5>
                    </>
                  )}
                  {item.attributes.postImg && (
                    <>
                      {/* <PostImage src={item.attributes.postImg} alt={item} /> */}
                      <a
                        style={{ textDecoration: "none", color: "yellow" }}
                        href={item.attributes.postImg}
                        alt="Link"
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Resume
                      </a>
                    </>
                  )}
                  <Links to="/jobforum">
                    <h2 style={{ color: "#fff" }}>Return to job forum</h2>
                  </Links>
                </ProfileWrapper>
              </Wrapper>
            );
          })}
        </div>
      )}
    </>
  );
};

export default FullPost;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #f57971;
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
