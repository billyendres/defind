import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";

import PersonalSummary from "./Components/PersonalSummary";
import Education from "./Components/Education";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";
import Img from "../Styles/ProfilePicture";
import defaultProfileImage from "../images/defaultProfileImage.png";

const CandidatePost = () => {
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
  const [showEducation, setShowEducation] = useState(false);

  const userPost = async () => {
    if (!personalSummary)
      return toast.error("Please complete all required fields", {
        position: "top-center",
        toastId: "custom-id",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
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
        console.log(error);
      },
    });
  };

  const savePost = async () => {
    try {
      const Posts = Moralis.Object.extend("Posts");
      const newPost = new Posts();
      if (!personalSummary)
        return toast.error("Please complete all required fields", {
          position: "top-center",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
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
      // window.location.reload();
      navigate(`/profile/posts/${user.attributes.ethAddress}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const imageType = /application\/(pdf)/i;

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (e) => {
    const img = e.target.files[0];
    if (!img.type.match(imageType)) {
      return toast.error("Image type not valid", {
        position: "top-center",
        toastId: "custom-id",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
    setPostFile(img);
  };

  return (
    <>
      {isLoading ? (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <Wrapper>
          <Template>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: "3rem",
              }}
            >
              <div>
                <Header>{user.attributes.username}</Header>
                <Header>{user.attributes.bio}</Header>
              </div>
              <Img
                style={{ width: "7rem", height: "7rem" }}
                src={
                  user.attributes.profilePic
                    ? user.attributes.profilePic
                    : defaultProfileImage
                }
                alt="Profile pic"
              />
            </div>
            <PersonalSummary
              onChange={(e) => setPersonalSummary(e.target.value)}
              value={personalSummary}
            />
            <Header onClick={() => setShowEducation(!showEducation)}>
              Education
            </Header>
            <AnimatePresence>
              {showEducation && (
                <motion.div
                  key="box"
                  initial={{ y: "50%", opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{
                    x: "100%",
                    opacity: 0,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Education
                    changeCourse={(e) =>
                      setEducation({ ...education, course: e.target.value })
                    }
                    inputValueCourse={education.course}
                    changeInstitution={(e) =>
                      setEducation({
                        ...education,
                        institution: e.target.value,
                      })
                    }
                    inputValueInstitution={education.institution}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {postFile && <Header>{postFile.name}</Header>}
            <div onClick={onImageClick} style={{ cursor: "pointer" }}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
                accept="application/pdf"
              />
              <Header>Attach Resume</Header>
            </div>
            <div onClick={onImageClick} style={{ cursor: "pointer" }}>
              <input
                type="file"
                name="file"
                ref={inputFile}
                onChange={changeHandler}
                style={{ display: "none" }}
                accept="application/pdf"
                // accept="image/png, image/jpeg, image/jpg"
              />
              <Header>Attach Cover Letter</Header>
            </div>
            <button onClick={() => setPostFile()}>Remove file</button>
            <Button onClick={savePost} disabled={isLoading} text="Save Post" />
            <ToastContainer />
            <div style={{ margin: "3rem" }}></div>
            <Button onClick={userPost} disabled={isLoading} text="ETH Post" />
          </Template>
        </Wrapper>
      )}
    </>
  );
};

export default CandidatePost;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;

const Template = styled.div`
  background: ${({ theme }) => theme.text};
  /* background: red; */
  height: 100vh;
  padding: 3rem;
  border-radius: 2rem;
  /* margin: 3rem 0; */
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  text-transform: uppercase;
  padding: 0.5rem 0;
`;
