import React, { useState, useRef } from "react";
import { Links } from "../components/Styles/Links";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Username from "../components/UserProfile/Username";
import Bio from "../components/UserProfile/Bio";
import ProfileImage from "../components/UserProfile/ProfileImage";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import Button from "../components/Styles/Button";

const EditUserProfle = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(
    user.attributes.profilePic
      ? user.attributes.profilePic
      : defaultProfileImage
  );
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const profileImageClickHandler = () => {
    inputFile.current.click();
  };

  const profileImageChangeHandler = (e) => {
    const img = e.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  console.log(theFile);
  console.log(selectedFile);

  const saveBio = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    setIsLoading(true);

    if (username) {
      myDetails.set("username", username);
    }

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("profilePic", file.ipfs());
    }

    await myDetails.save();
    setIsLoading(false);
    window.location.reload();
  };

  const deleteBio = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    setIsLoading(true);

    myDetails.set("username", "");
    myDetails.set("bio", "");
    myDetails.set("profilePic", defaultProfileImage);

    await myDetails.save();
    setIsLoading(false);
    window.location.reload();
  };

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Container>
          <h1 style={{ width: "100%" }}>EditUserProfile</h1>
          <ProfileImage
            onChange={profileImageChangeHandler}
            onClick={profileImageClickHandler}
            inputFile={inputFile}
            src={selectedFile}
          />
          <>
            <Username
              change={(e) => setUsername(e.currentTarget.value)}
              inputValue={username}
            />
            <Bio
              change={(e) => setBio(e.currentTarget.value)}
              inputValue={bio}
              bio={bio}
            />
            <div style={{ display: "flex" }}>
              <Button onClick={saveBio} disabled={isLoading} text="Save" />
              <Button onClick={deleteBio} disabled={isLoading} text="Delete" />
            </div>
          </>
          <div>
            <Links to={`/profile/${user.attributes.ethAddress}`}>
              Return to profile
            </Links>
          </div>
        </Container>
      )}
    </Wrapper>
  );
};

export default EditUserProfle;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Container = styled.div``;
