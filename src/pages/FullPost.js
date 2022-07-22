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
                        })} ${attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}, ${attributes.createdAt.toLocaleString("en-us", {
                          year: "numeric",
                        })}`}
                        <div style={{ marginBottom: "0.5rem" }}></div>
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
                            attributes.posterProfilePic
                              ? attributes.posterProfilePic
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
                          <Links to="/forum">
                            <Text style={{ fontWeight: "bold" }}>
                              {"<"} Return to forum
                            </Text>
                          </Links>
                        </motion.div>
                      </div>
                    </div>
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
                          style={{
                            marginRight: "0.5rem",
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
                          style={{
                            marginRight: "0.5rem",
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
                            <div style={{ marginBottom: "0.5rem" }}></div>
                          </span>
                        )
                      )}
                    </>
                  )}
                  {attributes.contactInformation.length > 0 && (
                    <>
                      <Subheader>
                        <FaPhone
                          style={{
                            marginRight: "0.5rem",
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
  padding: 2rem 0;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  transition: all 0.5s linear;
  background: ${({ theme }) => theme.background};
`;

const ProfileWrapper = styled.div`
  background: ${({ theme }) => theme.text};
  width: 43rem;
  padding: 3rem;
  margin-top: 5rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 33rem;
    padding: 2rem;
    margin-top: 4rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
    padding: 1.25rem;
    margin-top: 2.5rem;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 2rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    padding: 0.1rem 0;
  }
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.25rem 0;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
  /* margin-bottom: 1rem; */
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const Titles = styled.span`
  margin-right: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.textModals};
`;
