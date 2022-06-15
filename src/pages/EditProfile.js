import React, { useState, useRef, useEffect } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import styled from "styled-components";
import Username from "../components/UserProfile/Username";
import Bio from "../components/UserProfile/Bio";
import Education from "../components/UserProfile/Education";
import ProfileImage from "../components/UserProfile/ProfileImage";
import defaultProfileImage from "../components/images/defaultProfileImage.png";

const EditUserProfle = () => {
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(defaultProfileImage);
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [education, setEducation] = useState({
    course: "",
    institution: "",
  });

  const { userError, Moralis, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api();
  const user = Moralis.User.current();

  const profileImageClickHandler = () => {
    inputFile.current.click();
  };

  const profileImageChangeHandler = (e) => {
    const img = e.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (username) {
      myDetails.set("username", username);
    }

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (education.course) {
      myDetails.set("course", education.course);
    }

    if (education.institution) {
      myDetails.set("institution", education.institution);
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

  console.log("course:", education.course);
  console.log("BIO", bio);
  console.log("username", username);

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
          <Education
            changeCourse={(e) =>
              setEducation({ ...education, course: e.target.value })
            }
            inputValueCourse={education.course}
            changeInstitution={(e) =>
              setEducation({ ...education, institution: e.target.value })
            }
            inputValueInstitution={education.institution}
          />

          <Button onClick={saveEdits}>Save</Button>
        </>
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
