import React, { useEffect, useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

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
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
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
                        <h2 style={{ color: "white" }}>
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
