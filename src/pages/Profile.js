import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion } from "framer-motion";

import defaultProfileImage from "../components/images/defaultProfileImage.png";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";
import Button from "../components/Styles/Button";
import { FaUserEdit } from "react-icons/fa";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const location = useLocation();

  console.log(user.attributes.ethAddress);

  return (
    <Wrapper>
      <motion.div
        initial={{ y: "100vh", scale: 0.5, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          duration: 0.7,
          type: "spring",
        }}
      >
        <Img
          src={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : defaultProfileImage
          }
          alt="Profile pic"
        />
        <Header>{user.attributes.username}</Header>
        <Subheader>{user.attributes.bio}</Subheader>
        <Subheader>
          {`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}
        </Subheader>
        <Links to={`/profile/edit/${user.attributes.ethAddress}`}>
          <Subheader>
            <Button
              text={
                <>
                  <FaUserEdit
                    style={{ marginBottom: "-0.2rem", marginRight: "0.5rem" }}
                  />
                  Edit Profile
                </>
              }
            />
          </Subheader>
        </Links>
        {location.pathname === `/profile/${user.attributes.ethAddress}` ? (
          <Links to={`/profile/posts/${user.attributes.ethAddress}`}></Links>
        ) : (
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            <Subheader>
              <Button text="Return to profile" />
            </Subheader>
          </Links>
        )}
      </motion.div>
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
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin: 0.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const Subheader = styled.h4`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 1.5rem;
  margin: 0.5rem;

  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;
