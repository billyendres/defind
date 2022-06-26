import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Links } from "../components/Styles/Links";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
      try {
        setIsLoading(true);
        const Post = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Post);
        query.equalTo("objectId", id);
        const results = await query.find();
        setUserProfile(results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
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
                {console.log(item.attributes.usersEducation[0].course)}
                <ProfileWrapper>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
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
                          <Header>{item.attributes.posterUsername}</Header>
                        </Links>
                      </motion.div>
                      <Subheader>{item.attributes.posterBio}</Subheader>
                    </div>
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
                  <Text>
                    {`${item.attributes.createdAt.toLocaleString("en-us", {
                      month: "short",
                    })}  
                ${item.attributes.createdAt.toLocaleString("en-us", {
                  day: "numeric",
                })}
                `}
                  </Text>
                  {item.attributes.personalSummary && (
                    <>
                      <Subheader>Personal Summary</Subheader>
                      <Text>{item.attributes.personalSummary}</Text>
                    </>
                  )}
                  {item.attributes.usersEducation && (
                    <>
                      <Subheader>Education</Subheader>
                      <Text>{item.attributes.usersEducation[0].course}</Text>
                      <Text>
                        {item.attributes.usersEducation[0].institution}
                      </Text>
                      <Text>{item.attributes.usersEducation[0].dateFrom}</Text>
                      <Text>{item.attributes.usersEducation[0].dateTo}</Text>
                    </>
                  )}
                  {item.attributes.employmentHistory && (
                    <>
                      <Subheader>Employment History</Subheader>
                      <Text>
                        {item.attributes.employmentHistory[0].jobTitle}
                        {item.attributes.employmentHistory[0].company}
                        {item.attributes.employmentHistory[0].description}
                        {item.attributes.employmentHistory[0].dateFrom}
                        {item.attributes.employmentHistory[0].dateTo}
                      </Text>
                    </>
                  )}
                  {item.attributes.contactInformation.length > 0 && (
                    <>
                      <Subheader>Contact Information</Subheader>
                      <Text>{item.attributes.contactInformation[0].email}</Text>
                      <Text>{item.attributes.contactInformation[0].phone}</Text>
                      <Text>
                        {item.attributes.contactInformation[0].twitter}
                      </Text>
                      <Text>
                        {item.attributes.contactInformation[0].github}
                      </Text>
                      <Text>
                        {item.attributes.contactInformation[0].telegram}
                      </Text>
                      <Text>
                        {item.attributes.contactInformation[0].website}
                      </Text>
                    </>
                  )}
                  {item.attributes.postImg && (
                    <>
                      <Subheader>Resume</Subheader>

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
                  <div style={{ display: "flex" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Links to="/forum">
                        <Text>Return to job forum</Text>
                      </Links>
                    </motion.div>
                  </div>
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
  font-family: "Kdam Thmor Pro", sans-serif;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const ProfileWrapper = styled.div`
  text-align: left;
  min-height: 30vh;
  width: 43rem;
  padding: 3rem;
  border-radius: 1rem;
  background: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 0;
`;

const Subheader = styled.h3`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 0;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
`;
