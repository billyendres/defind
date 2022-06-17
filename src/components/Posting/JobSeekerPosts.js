import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import defaultProfileImage from "../images/defaultProfileImage.png";

const JobSeekerPosts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const user = Moralis.User.current();
  const [postArray, setPostArray] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        if (profile) {
          query.equalTo("posterAccount", account);
        }
        const results = await query.find();
        setPostArray(results);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [profile, account, Moralis.Object, Moralis.Query]);

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />

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
            <Wrapper key={key}>
              <ProfileWrapper>
                <Links
                  to={
                    user.attributes.ethAddress === item.attributes.posterAccount
                      ? `/profile/${user.attributes.ethAddress}`
                      : `/profile/${item.attributes.posterUsername}`
                  }
                >
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
                {item.attributes.personalSummary && (
                  <>
                    <h4>Personal Summary</h4>
                    <h5>{item.attributes.personalSummary}</h5>
                  </>
                )}
                <Links to={`/jobforum/${item.id}`}>View Post</Links>
              </ProfileWrapper>
            </Wrapper>
          );
        })
        .reverse()}
    </>
  );
};

export default JobSeekerPosts;

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

const Links = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
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

const PostHeader = styled.h2``;

const PostImage = styled.img`
  width: 10rem;
  border: 2px solid red;
`;