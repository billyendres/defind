import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import defaultProfileImage from "../images/defaultProfileImage.png";

const Posts = ({ profile }) => {
  const { Moralis, account } = useMoralis();
  const [postArr, setPostArr] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        if (profile) {
          query.equalTo("posterAccount", account);
        }
        console.log(account);
        const results = await query.find();
        setPostArr(results);
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
      {console.log("Search", search)}
      {postArr
        ?.filter((e) =>
          e.attributes.postTxt.toLowerCase().includes(search.toLowerCase())
        )
        .map((e, key) => {
          return (
            <Wrapper key={key}>
              <ProfileWrapper>
                {console.log(e.attributes.postTxt)}
                <ProfileImage
                  src={
                    e.attributes.posterProfilePic
                      ? e.attributes.posterProfilePic
                      : defaultProfileImage
                  }
                  alt="Profile pic"
                />

                <div>
                  <h4>{e.attributes.posterUsername.slice(0, 6)}</h4>
                  {`${e.attributes.posterAccount.slice(
                    0,
                    4
                  )}...${e.attributes.posterAccount.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          month: "short",
                        })}  
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}
                        `}
                </div>
              </ProfileWrapper>
              <PostWrapper>
                <PostHeader>{e.attributes.postTxt}</PostHeader>
                {e.attributes.postImg && (
                  <>
                    <PostImage src={e.attributes.postImg} alt={e} />
                    {/* <a
                      href={e.attributes.postImg}
                      alt="Link"
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {e.attributes.postImg}
                    </a> */}
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
