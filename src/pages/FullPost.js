import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Links } from "../components/Styles/Links";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import Img from "../components/Styles/ProfilePicture";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaPhone,
  FaRegIdBadge,
} from "react-icons/fa";

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
          {userProfile?.map(({ attributes }, key) => {
            return (
              <Wrapper key={key}>
                {console.log(attributes)}
                <ProfileWrapper>
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
                            attributes.posterAccount
                              ? `/profile/${user.attributes.ethAddress}`
                              : `/profile/${attributes.posterUsername}`
                          }
                        >
                          <Header>{attributes.posterUsername}</Header>
                        </Links>
                      </motion.div>
                      <Subheader>{attributes.posterBio}</Subheader>
                      <Text>
                        {"> "}
                        {`${attributes.createdAt.toLocaleString("en-us", {
                          month: "short",
                        })}${attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}, ${attributes.createdAt.toLocaleString("en-us", {
                          year: "numeric",
                        })}`}
                        <div style={{ marginBottom: "1.5rem" }}></div>
                      </Text>
                    </div>
                    <Img
                      style={{ width: "7rem", height: "7rem" }}
                      src={
                        attributes.posterProfilePic
                          ? attributes.posterProfilePic
                          : defaultProfileImage
                      }
                      alt="Profile pic"
                    />
                  </div>

                  {attributes.personalSummary && (
                    <>
                      <Subheader>Personal Summary</Subheader>
                      <Text>{attributes.personalSummary}</Text>
                      <div style={{ marginBottom: "1.5rem" }}></div>
                    </>
                  )}
                  {attributes.usersEducation.length > 0 && (
                    <>
                      <Subheader>
                        <FaUserGraduate
                          size={30}
                          style={{
                            marginRight: "0.5rem",
                            marginBottom: "-0.25rem",
                          }}
                        />
                        Education
                      </Subheader>
                      {attributes.usersEducation.map(
                        ({ course, institution, dateFrom, dateTo }, key) => (
                          <span key={key}>
                            {course && (
                              <Text>
                                <Titles>Course:</Titles> {course}
                              </Text>
                            )}
                            {institution && (
                              <Text>
                                <Titles>Institution:</Titles> {institution}
                              </Text>
                            )}
                            {dateFrom && (
                              <Text>
                                <Titles>Date From:</Titles> {dateFrom}
                              </Text>
                            )}
                            {dateTo && (
                              <Text>
                                <Titles>Date To:</Titles> {dateTo}
                              </Text>
                            )}
                            <div style={{ marginBottom: "1.5rem" }}></div>
                          </span>
                        )
                      )}
                    </>
                  )}
                  {attributes.employmentHistory.length > 0 && (
                    <>
                      <Subheader>
                        <FaLaptopCode
                          size={30}
                          style={{
                            marginRight: "0.5rem",
                            marginBottom: "-0.25rem",
                          }}
                        />
                        Employment History
                      </Subheader>
                      {attributes.employmentHistory.map(
                        (
                          { jobTitle, company, description, dateFrom, dateTo },
                          key
                        ) => (
                          <span key={key}>
                            {jobTitle && (
                              <Text>
                                <Titles>Job Title:</Titles>
                                {jobTitle}
                              </Text>
                            )}
                            {company && (
                              <Text>
                                <Titles>Company:</Titles> {company}
                              </Text>
                            )}
                            {description && (
                              <Text>
                                <Titles>Job Description:</Titles> {description}
                              </Text>
                            )}
                            {dateFrom && (
                              <Text>
                                <Titles>Date From:</Titles> {dateFrom}
                              </Text>
                            )}
                            {dateTo && (
                              <Text>
                                <Titles>Date To:</Titles> {dateTo}
                              </Text>
                            )}
                            <div style={{ marginBottom: "1.5rem" }}></div>
                          </span>
                        )
                      )}
                    </>
                  )}
                  {attributes.contactInformation.length > 0 && (
                    <>
                      <Subheader>
                        <FaPhone
                          size={30}
                          style={{
                            marginRight: "0.5rem",
                            marginBottom: "-0.25rem",
                          }}
                        />
                        Contact Information
                      </Subheader>
                      {attributes.contactInformation.map(
                        (
                          { email, phone, twitter, github, telegram, website },
                          key
                        ) => (
                          <span key={key}>
                            {email && (
                              <Text>
                                <Titles>Email:</Titles> {email}
                              </Text>
                            )}
                            {phone && (
                              <Text>
                                <Titles>Phone:</Titles> {phone}
                              </Text>
                            )}
                            {twitter && (
                              <Text>
                                <Titles>Twitter:</Titles> {twitter}
                              </Text>
                            )}
                            {github && (
                              <Text>
                                <Titles>Github:</Titles> {github}
                              </Text>
                            )}
                            {telegram && (
                              <Text>
                                <Titles>Telegram:</Titles> {telegram}
                              </Text>
                            )}
                            {website && (
                              <Text>
                                <Titles>Website:</Titles> {website}
                              </Text>
                            )}
                            <div style={{ marginBottom: "1.5rem" }}></div>
                          </span>
                        )
                      )}
                    </>
                  )}
                  {attributes.postImg && (
                    <>
                      <Subheader>
                        <FaRegIdBadge
                          size={30}
                          style={{
                            marginRight: "0.5rem",
                            marginBottom: "-0.25rem",
                          }}
                        />
                        Resume
                      </Subheader>

                      {/* <PostImage src={attributes.postImg} alt={ /> */}
                      <a
                        style={{ textDecoration: "none", color: "yellow" }}
                        href={attributes.postImg}
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

const Titles = styled.span`
  margin-right: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.textModals};
`;
