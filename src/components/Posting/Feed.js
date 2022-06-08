import React from "react";
import { useMoralis } from "react-moralis";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Posts from "./Posts";

const Feed = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {/* <div style={{ width: "100%" }}>
        <img
          style={{ width: "5rem" }}
          src={
            user.attributes.banner
              ? user.attributes.banner
              : defaultProfileImage
          }
          alt="Profile"
        />
        <div>
          {user.attributes.username}
          <div>
            {`${user.attributes.ethAddress.slice(0, 4)}...
            ${user.attributes.ethAddress.slice(38)}`}
          </div>
          <h3>Poted at {user.attributes.createdAt.toString()}</h3>
        </div>
      </div> */}
      {/* <Posts profile={true} /> */}
    </div>
  );
};

export default Feed;
