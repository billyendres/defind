import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

import Header from "../components/Home/Header";
import Subheader from "../components/Home/Subheader";
import NewPost from "../components/Posting/NewPost";
import Posts from "../components/Posting/Posts";

const Home = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [post, setPost] = useState("");
  const [description, setDescription] = useState("");

  const ethPost = async () => {
    if (!post) return alert("No file detected");

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
              name: "postTxt",
              type: "string",
            },
            {
              internalType: "string",
              name: "postImg",
              type: "string",
            },
            {
              internalType: "string",
              name: "postDescription",
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
        postTxt: post,
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
    if (!post) return alert("No file detected");

    const Posts = Moralis.Object.extend("Posts");
    const newPost = new Posts();

    newPost.set("postTxt", post);
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
    <>
      <Wrapper>
        <Container>
          <div style={{ marginTop: "10rem", marginBottom: "2rem" }}></div>
          <div>
            <Header />
            <Subheader />
            <h2>All Posts</h2>
            <div>
              <NewPost
                change={(e) => setPost(e.target.value)}
                inputValue={post}
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
                <h4 style={{ cursor: "pointer" }}>POST IMAGE</h4>
              </div>
              <button onClick={savePost}>SAVE POST</button>
              <div style={{ margin: "3rem" }}></div>
              <button onClick={ethPost}>ETH POST</button>
            </div>
            <Posts profile={false} />
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Container = styled.div``;
