import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import defaultProfileImage from "../components/images/defaultProfileImage.png";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const location = useLocation();

  return (
    <Wrapper>
      <div>
        <img
          style={{ width: "5rem", borderRadius: "50%" }}
          src={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : defaultProfileImage
          }
          alt="Profile pic"
        />
        <h1>{user.attributes.username}</h1>
        <h3>{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</h3>
        <h4>{user.attributes.bio}</h4>
        <Links to={`/profile/edit/${user.attributes.ethAddress}`}>
          <h2>Edit Profile</h2>
        </Links>
        {location.pathname === `/profile/${user.attributes.ethAddress}` ? (
          <Links to={`/profile/posts/${user.attributes.ethAddress}`}>
            View My Posts
          </Links>
        ) : (
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            Return to profile
          </Links>
        )}
      </div>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
