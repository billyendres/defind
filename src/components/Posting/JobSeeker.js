import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";

import PersonalSummary from "./Components/PersonalSummary";
import Education from "./Components/Education";

const JobSeeker = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [personalSummary, setPersonalSummary] = useState("");
  const [education, setEducation] = useState({
    course: "",
    institution: "",
  });

  const userPost = async () => {
    if (!personalSummary) return alert("No file detected");

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
        console.log(error.data.message);
      },
    });
  };

  const savePost = async () => {
    const Posts = Moralis.Object.extend("Posts");
    const newPost = new Posts();

    if (!personalSummary) return alert("No file detected");

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
    // window.location.reload();
    navigate("/profile/myposts");
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
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <div>
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
        {selectedFile && <img src={selectedFile} alt={selectedFile} />}
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
        <button onClick={savePost}>SAVE POST</button>
        <div style={{ margin: "3rem" }}></div>
        <button onClick={userPost}>ETH POST</button>
      </div>
    </div>
  );
};

export default JobSeeker;
