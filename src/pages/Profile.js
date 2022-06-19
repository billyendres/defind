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
        <h1 style={{ color: "#080e57" }}>{user.attributes.username}</h1>
        <h3 style={{ color: "#080e57" }}>{`${user.attributes.ethAddress.slice(
          0,
          4
        )}...
            ${user.attributes.ethAddress.slice(38)}`}</h3>
        <h4 style={{ color: "#080e57" }}>{user.attributes.bio}</h4>
        <Links to={`/profile/edit/${user.attributes.ethAddress}`}>
          <h2 style={{ color: "#080e57" }}>Edit Profile</h2>
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
  background: #a06ecc;
`;
