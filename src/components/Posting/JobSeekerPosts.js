import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import defaultProfileImage from "../images/defaultProfileImage.png";

const Posts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
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
              {console.log(item.attributes.postDescription)}
              {console.log("Summary: ", item.attributes.personalSummary)}
              <ProfileWrapper>
                <ProfileImage
                  src={
                    item.attributes.posterProfilePic
                      ? item.attributes.posterProfilePic
                      : defaultProfileImage
                  }
                  alt="Profile pic"
                />
                <div>
                  <h4>{item.attributes.posterUsername.slice(0, 6)}</h4>
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
                </div>
              </ProfileWrapper>
              <PostWrapper>
                <PostHeader>{item.attributes.personalSummary}</PostHeader>
                <h3>{item.attributes.postDescription}</h3>
                {item.attributes.postImg && (
                  <>
                    <PostImage src={item.attributes.postImg} alt={item} />
                    <a
                      href={item.attributes.postImg}
                      alt="Link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {item.attributes.postImg}
                    </a>
                  </>
                )}
              </PostWrapper>
            </Wrapper>
          );
        })
        .reverse()}
    </>
  );
};

export default Posts;

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

const PostHeader = styled.h2``;

const PostImage = styled.img`
  width: 10rem;
  border: 2px solid red;
`;
