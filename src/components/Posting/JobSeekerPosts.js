import React, { useEffect, useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import { FaSearch } from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Img from "../Styles/ProfilePicture";

const JobSeekerPosts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const [postArray, setPostArray] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      try {
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        if (profile) {
          query.equalTo("posterAccount", account);
        }
        const results = await query.find();
        setPostArray(results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [profile, account, Moralis.Object, Moralis.Query]);

  return (
    <>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div style={{ paddingTop: "10rem" }}></div>
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
          <Wrapper>
            <Grid>
              {postArray
                ?.filter(
                  (item) =>
                    item.attributes.personalSummary
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    item.attributes.posterUsername
                      .toLowerCase()
                      .includes(search.toLowerCase())
                )
                .map((item, key) => {
                  return (
                    <ProfileWrapper key={key}>
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
                      <Links to={`/jobforum/${item.id}`}>
                        <Header>View Post</Header>
                      </Links>
                    </ProfileWrapper>
                  );
                })
                .reverse()}
            </Grid>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default JobSeekerPosts;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4rem;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 25rem;
  width: 25rem;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
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
