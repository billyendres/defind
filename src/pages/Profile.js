import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const location = useLocation();

  return (
    <Wrapper>
      <div>
        <Img
          src={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : defaultProfileImage
          }
          alt="Profile pic"
        />
        <Header>{user.attributes.username}</Header>
        <Header>{`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}</Header>
        <h4 style={{ color: "#080e57" }}>{user.attributes.bio}</h4>
        <Links to={`/profile/edit/${user.attributes.ethAddress}`}>
          <Header>Edit Profile</Header>
        </Links>
        {location.pathname === `/profile/${user.attributes.ethAddress}` ? (
          <Links to={`/profile/posts/${user.attributes.ethAddress}`}>
            <Header>View My Posts</Header>
          </Links>
        ) : (
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <Header>Return to profile</Header>
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
  background: ${({ theme }) => theme.backgroundProfile};
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textProfile};
`;
