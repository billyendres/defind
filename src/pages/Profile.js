import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import defaultProfileImage from "../components/images/defaultProfileImage.png";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <Wrapper>
      <div>
        <h1>Welcome {user.attributes.username}</h1>
        <img
          style={{ width: "5rem", borderRadius: "50%" }}
          src={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : defaultProfileImage
          }
          alt="Profile pic"
        />
        <h3 style={{ margin: "2rem" }}>{`${user.attributes.ethAddress.slice(
          0,
          4
        )}...
            ${user.attributes.ethAddress.slice(38)}`}</h3>
        <h4 style={{ margin: "2rem" }}>{user.attributes.bio}</h4>
        <Link to="/profile/edit">
          <h2 style={{ margin: "2rem" }}>Edit Profile</h2>
        </Link>
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
