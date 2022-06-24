import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import Education from "./candidatePostComponents/Education";
import EmploymentHistory from "./candidatePostComponents/EmploymentHistory";

import PersonalSummary from "./candidatePostComponents/PersonalSummary";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";
import Img from "../Styles/ProfilePicture";
import defaultProfileImage from "../images/defaultProfileImage.png";
import {
  FaUserGraduate,
  FaLaptopCode,
  FaFileAlt,
  FaRegIdBadge,
  FaPlus,
} from "react-icons/fa";

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
  const [education, setEducation] = useState([]);
  const [job, setJob] = useState([]);

  console.log("education", education);
  console.log("job", job);

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
      newPost.set("usersEducation", education);
      newPost.set("employmentHistory", job);
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
  // Education
  const handleChangeInputEducation = (index, event) => {
    const values = [...education];
    values[index][event.target.name] = event.target.value;
    setEducation(values);
  };

  const handleAddEducation = () => {
    setEducation([...education, { course: "", institution: "", date: "" }]);
  };

  const handleRemoveEducation = (index) => {
    const values = [...education];
    values.splice(index, 1);
    setEducation(values);
  };

  // Career history
  const handleChangeInputJob = (index, event) => {
    const values = [...job];
    values[index][event.target.name] = event.target.value;
    setJob(values);
  };

  const handleAddJob = () => {
    setJob([...job, { jobTitle: "", company: "", description: "" }]);
  };

  const handleRemoveJob = (index) => {
    const values = [...job];
    values.splice(index, 1);
    setJob(values);
  };

  return (
    <>
      {isLoading ? (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <Wrapper>
          <motion.div
            initial={{ y: "50%", scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
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
              {education.length === 0 ? (
                <div style={{ display: "flex", cursor: "pointer" }}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Subheader>
                      <FaUserGraduate
                        size={30}
                        style={{
                          marginRight: "0.5rem",
                          marginBottom: "-0.25rem",
                        }}
                      />
                      <span onClick={() => handleAddEducation()}>
                        Add Education
                      </span>
                    </Subheader>
                  </motion.div>
                </div>
              ) : (
                <Subheader>
                  <FaUserGraduate
                    size={30}
                    style={{
                      marginRight: "0.5rem",
                      marginBottom: "-0.25rem",
                    }}
                  />
                  Education
                </Subheader>
              )}
              {education.map((study, index) => (
                <Education
                  key={index}
                  valueOne={study.course}
                  onChange={(event) => handleChangeInputEducation(index, event)}
                  valueTwo={study.institution}
                  onClickOne={() => handleRemoveEducation(index)}
                  onClickTwo={() => handleAddEducation()}
                />
              ))}
              {job.length === 0 ? (
                <div style={{ display: "flex", cursor: "pointer" }}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Subheader>
                      <FaLaptopCode
                        size={30}
                        style={{
                          marginRight: "0.5rem",
                          marginBottom: "-0.25rem",
                        }}
                      />
                      <span onClick={() => handleAddJob()}>
                        Add Employment History
                      </span>
                    </Subheader>
                  </motion.div>
                </div>
              ) : (
                <Subheader>
                  <FaLaptopCode
                    size={30}
                    style={{
                      marginRight: "0.5rem",
                      marginBottom: "-0.25rem",
                    }}
                  />
                  Employment History
                </Subheader>
              )}
              {job.map((work, index) => (
                <EmploymentHistory
                  key={index}
                  valueOne={work.jobTitle}
                  onChange={(event) => handleChangeInputJob(index, event)}
                  valueTwo={work.company}
                  valueThree={work.description}
                  onClickOne={() => handleRemoveJob(index)}
                  onClickTwo={() => handleAddJob()}
                />
              ))}
              <div
                onClick={onImageClick}
                style={{ display: "flex", cursor: "pointer", flexWrap: "wrap" }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: "none" }}
                    accept="application/pdf"
                    // accept="image/png, image/jpeg, image/jpg"
                  />
                  <Subheader>
                    <FaRegIdBadge
                      size={30}
                      style={{
                        marginRight: "0.5rem",
                        marginBottom: "-0.25rem",
                      }}
                    />
                    {!postFile ? "Attach Resume" : "Resume"}
                  </Subheader>
                </motion.div>
                {postFile && (
                  <Text style={{ width: "100%", padding: 0 }}>
                    {`> `}
                    {postFile.name}
                  </Text>
                )}
              </div>
              <div>
                {postFile && (
                  <button onClick={() => setPostFile()}>Remove file</button>
                )}
              </div>
              <div
                onClick={onImageClick}
                style={{ display: "flex", cursor: "pointer" }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <input
                    type="file"
                    name="file"
                    ref={inputFile}
                    onChange={changeHandler}
                    style={{ display: "none" }}
                    accept="application/pdf"
                  />
                  <Subheader>
                    <FaFileAlt
                      size={30}
                      style={{
                        marginRight: "0.5rem",
                        marginBottom: "-0.25rem",
                      }}
                    />
                    Attach Cover Letter
                  </Subheader>
                </motion.div>
              </div>

              <Button
                onClick={savePost}
                disabled={isLoading}
                text="Save Post"
              />
              <ToastContainer />
              <div style={{ margin: "3rem" }}></div>
              <Button onClick={userPost} disabled={isLoading} text="ETH Post" />
            </Template>
          </motion.div>
        </Wrapper>
      )}
    </>
  );
};

export default CandidatePost;

const Wrapper = styled.div`
  min-height: 80vh;
  padding: 2rem 0;
  font-family: "Kdam Thmor Pro", sans-serif;
  letter-spacing: 2px;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  transition: all 0.5s linear;
`;

const Template = styled.div`
  background: ${({ theme }) => theme.text};
  min-height: 80vh;
  padding: 3rem;
  border-radius: 1rem;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 0;
`;

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 0;
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 1.5rem 0;
`;
