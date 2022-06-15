import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import PersonalSummary from "./Components/PersonalSummary";

const JobSeeker = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [personalSummary, setPersonalSummary] = useState("");
  const [description, setDescription] = useState("");
  console.log(personalSummary);

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
        postDescription: description,
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
    if (!personalSummary) return alert("No file detected");

    const Posts = Moralis.Object.extend("Posts");
    const newPost = new Posts();

    newPost.set("personalSummary", personalSummary);
    newPost.set("postDescription", description);
    newPost.set("posterProfilePic", user.attributes.profilePic);
    newPost.set("posterAccount", user.attributes.ethAddress);
    newPost.set("posterUsername", user.attributes.username);

    if (postFile) {
      const data = postFile;
      const file = new Moralis.File(data.name, data);

      await file.saveIPFS();
      newPost.set("postImg", file.ipfs());
    }
    await newPost.save();
    window.location.reload();
  };

  const onImageClick = () => {
    inputFile.current.click();
  };

  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const changeHandler = (e) => {
    const img = e.target.files[0];
    if (!img.type.match(imageMimeType)) {
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
        <PersonalSummary
          onChange={(e) => setPersonalSummary(e.target.value)}
          value={personalSummary}
          changeDescription={(e) => setDescription(e.target.value)}
          inputDescription={description}
        />
        {selectedFile && <img src={selectedFile} alt={selectedFile} />}
        <div onClick={onImageClick}>
          <input
            type="file"
            name="file"
            ref={inputFile}
            onChange={changeHandler}
            style={{ display: "none" }}
            accept="image/png, image/jpeg, image/jpg"
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
            accept="image/png, image/jpeg, image/jpg"
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
