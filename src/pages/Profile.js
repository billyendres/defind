import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";
import Button from "../components/Styles/Button";
import { FaWallet, FaUserEdit } from "react-icons/fa";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const location = useLocation();

  return (
    <Wrapper>
      <div>
        <Img
          style={{ width: "7rem", height: "7rem" }}
          src={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : defaultProfileImage
          }
          alt="Profile pic"
        />
        <Header>{user.attributes.username}</Header>
        <Subheader>
          {/* <FaWallet /> */}
          {`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}{" "}
        </Subheader>

        <Subheader>{user.attributes.bio}</Subheader>
        <Links to={`/profile/edit/${user.attributes.ethAddress}`}>
          <Subheader>
            {/* <FaUserEdit /> */}
            <Button text="edit profile" />
          </Subheader>
        </Links>
        {location.pathname === `/profile/${user.attributes.ethAddress}` ? (
          <Links to={`/profile/posts/${user.attributes.ethAddress}`}>
            {/* <Subheader>My Posts</Subheader> */}
          </Links>
        ) : (
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <Subheader>
              <Button text="Return to profile" />
            </Subheader>
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
  transition: all 0.5s linear;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textProfile};
  transition: all 0.5s linear;
  text-transform: uppercase;
  font-size: 3rem;
  margin: 1rem;
`;

const Subheader = styled.h4`
  color: ${({ theme }) => theme.textProfile};
  transition: all 0.5s linear;
  /* text-transform: uppercase; */
  font-size: 1.5rem;
  margin: 0.5rem;
`;
