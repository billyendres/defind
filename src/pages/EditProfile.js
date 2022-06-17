import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import Username from "../components/UserProfile/Username";
import Bio from "../components/UserProfile/Bio";
import ProfileImage from "../components/UserProfile/ProfileImage";
import defaultProfileImage from "../components/images/defaultProfileImage.png";

const EditUserProfle = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultProfileImage);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const { userError, Moralis } = useMoralis();
  const user = Moralis.User.current();

  const profileImageClickHandler = () => {
    inputFile.current.click();
  };

  const profileImageChangeHandler = (e) => {
    const img = e.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveBio = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

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
    window.location.reload();
  };

  const deleteBio = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    myDetails.set("username", "");
    myDetails.set("bio", "");
    myDetails.set("profilePic", defaultProfileImage);

    await myDetails.save();
    window.location.reload();
  };

  return (
    <Wrapper>
      <Container>
        <h1 style={{ width: "100%" }}>EditUserProfle</h1>
        <ProfileImage
          change={profileImageChangeHandler}
          click={profileImageClickHandler}
          inputFile={inputFile}
          file={
            user.attributes.profilePic
              ? user.attributes.profilePic
              : selectedFile
          }
        />
        <>
          {userError && <p>{JSON.stringify(userError.message)}</p>}

          <Username
            change={(e) => setUsername(e.currentTarget.value)}
            inputValue={username}
          />
          <Bio
            change={(e) => setBio(e.currentTarget.value)}
            inputValue={bio}
            bio={bio}
          />
          <Button onClick={saveBio}>Save Bio</Button>
          <Button onClick={deleteBio}>Delete Bio</Button>
        </>
        <div>
          <Links to={`/profile/${user.attributes.ethAddress}`}>
            Return to profile
          </Links>
        </div>
      </Container>
    </Wrapper>
  );
};

export default EditUserProfle;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
`;

const Container = styled.div``;

const Button = styled.button`
  padding: 0.75rem 1rem;
  font-size: 1rem;
`;

const Links = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
