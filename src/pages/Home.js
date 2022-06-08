import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useMoralis } from "react-moralis";

import Header from "../components/Home/Header";
import Subheader from "../components/Home/Subheader";
import Feed from "../components/Posting/Feed";
import FileUpload from "../components/Posting/FileUpload";
import NewPost from "../components/Posting/NewPost";
import Posts from "../components/Posting/Posts";

const Home = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const inputFile = useRef(null);

  const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [post, setPost] = useState("");

  const savePost = async () => {
    if (!post) return;

    const Posts = Moralis.Object.extend("Posts");

    const newPost = new Posts();

    newPost.set("postTxt", post);
    newPost.set("posterBanner", user.attributes.banner);
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

  const changeHandler = (e) => {
    const img = e.target.files[0];
    setPostFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <Wrapper>
        <div>
          {/* <Header /> */}
          {/* <Subheader /> */}
          {/* <FileUpload /> */}
          <NewPost change={(e) => setPost(e.target.value)} inputValue={post} />
          {selectedFile && <img src={selectedFile} alt={selectedFile} />}
          <div onClick={onImageClick}>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              // style={{ display: "none"}}
            />
          </div>
          <button onClick={savePost}>SAVE POST</button>
          <div style={{ margin: "3rem" }}></div>
          {/* <Feed profile={false} /> */}
          <Posts profile={false} />
        </div>
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
  min-height: 150vh;
`;
