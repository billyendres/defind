import React from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion } from "framer-motion";

import defaultProfileImage from "../components/images/defaultProfileImage.png";
import { Links } from "../components/Styles/Links";
import Img from "../components/Styles/ProfilePicture";
import Button from "../components/Styles/Button";
import { FaUserEdit, FaRegIdCard } from "react-icons/fa";

const UserProfile = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

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
        <Links to={`/myprofile/edit/${user.attributes.ethAddress}`}>
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
        </Links>
        <Links to={`/profile/posts/${user.attributes.ethAddress}`}>
          <Button
            text={
              <>
                <FaRegIdCard
                  style={{ marginBottom: "-0.2rem", marginRight: "0.5rem" }}
                />
                My Posts
              </>
            }
          />
        </Links>
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

const Header = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin: 0.5rem;

  @media screen and (max-width: 1023px) {
    font-size: 2rem;
  }
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 1.5rem;
  margin: 0.5rem;

  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;
