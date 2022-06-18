import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";

import PersonalSummary from "./Components/PersonalSummary";
import Education from "./Components/Education";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";

const JobSeeker = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  // const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [personalSummary, setPersonalSummary] = useState("");
  const [education, setEducation] = useState({
    course: "",
    institution: "",
  });

  const userPost = async () => {
    if (!personalSummary) return alert("No file detected");
    setIsLoading(true);

    let img;
    if (postFile) {
      const data = postFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    } else {
      img = "noimg";
    }

    let options = {
      contractAddress: "0xE10208aAc0F0D1B0Ba62a1E65Ce6728B0349370C",
      functionName: "addPost",
      abi: [
        {
          inputs: [
            {
              internalType: "string",
              name: "personalSummary",
              type: "string",
            },
            {
              internalType: "string",
              name: "postImg",
              type: "string",
            },
          ],
          name: "addPost",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      params: {
        personalSummary: personalSummary,
        postImg: img,
      },
      msgValue: Moralis.Units.Token(0.01),
    };

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        savePost();
      },
      onError: (error) => {
        setIsLoading(false);
      },
    });
  };

  const savePost = async () => {
    try {
      const Posts = Moralis.Object.extend("Posts");
      const newPost = new Posts();

      if (!personalSummary) return alert("No file detected");
      setIsLoading(true);

      newPost.set("personalSummary", personalSummary);
      newPost.set("course", education.course);
      newPost.set("institution", education.institution);
      newPost.set("posterProfilePic", user.attributes.profilePic);
      newPost.set("posterAccount", user.attributes.ethAddress);
      newPost.set("posterUsername", user.attributes.username);
      newPost.set("posterBio", user.attributes.bio);

      if (postFile) {
        const data = postFile;
        const file = new Moralis.File(data.name, data);

        await file.saveIPFS();
        newPost.set("postImg", file.ipfs());
      }
      await newPost.save();
      setIsLoading(false);
      // window.location.reload();
      navigate(`/profile/posts/${user.attributes.ethAddress}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onImageClick = () => {
    inputFile.current.click();
  };

  // const imageType = /image\/(png|jpg|jpeg)/i;

  const imageType = /application\/(pdf)/i;

  const changeHandler = (e) => {
    const img = e.target.files[0];
    if (!img.type.match(imageType)) {
      alert("Image type is not valid");
      return;
    }
    setPostFile(img);
    // setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <div>
      {isLoading ? (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <>
          <h1>Job Seeker</h1>
          <div>
            {console.log(user.attributes.personalSummary)}
            <PersonalSummary
              onChange={(e) => setPersonalSummary(e.target.value)}
              value={personalSummary}
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
            {postFile && <h2>{postFile.name}</h2>}
            <div onClick={onImageClick}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
                accept="application/pdf"
                // accept="image/png, image/jpeg, image/jpg"
              />
              <h4 style={{ cursor: "pointer" }}>Attach Resume</h4>
            </div>
            <div onClick={onImageClick}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
                accept="application/pdf"
                // accept="image/png, image/jpeg, image/jpg"
              />
              <h4 style={{ cursor: "pointer" }}>Attach Cover Letter</h4>
            </div>
            {/* <button onClick={savePost} disabled={isLoading}>
              SAVE POST
            </button> */}
            <Button
              onClick={savePost}
              disabled={isLoading}
              text="Motion button"
            />
            <div style={{ margin: "3rem" }}></div>
            <button onClick={userPost} disabled={isLoading}>
              ETH POST
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default JobSeeker;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100vh;
`;
