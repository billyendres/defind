import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import {
  Education,
  AddEducation,
  EducationAdded,
} from "./candidatePostComponents/Education";
import {
  EmploymentHistory,
  AddEmploymentHistory,
  EmploymentHistoryAdded,
} from "./candidatePostComponents/EmploymentHistory";
import {
  Resume,
  ResumeHeader,
  RemoveResume,
} from "./candidatePostComponents/Resume";
import {
  CoverLetter,
  CoverLetterHeader,
  RemoveCoverLetter,
} from "./candidatePostComponents/CoverLetter";

import {
  Contact,
  AddContact,
  ContactAdded,
} from "./candidatePostComponents/Contact";

import PersonalSummary from "./candidatePostComponents/PersonalSummary";
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
  const [education, setEducation] = useState([]);
  const [job, setJob] = useState([]);
  const [contact, setContact] = useState([]);

  console.log("education", education);
  console.log("job", job);
  console.log("Contact:", contact);

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
      newPost.set("contactInformation", contact);
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

  // Contact
  const handleChangeInputContact = (index, event) => {
    const values = [...contact];
    values[index][event.target.name] = event.target.value;
    setContact(values);
  };

  const handleAddContact = () => {
    setContact([...contact, { phone: "", email: "", twitter: "" }]);
  };

  const handleRemoveContact = (index) => {
    const values = [...contact];
    values.splice(index, 1);
    setContact(values);
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
                <AddEducation onClick={() => handleAddEducation()} />
              ) : (
                <EducationAdded />
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
                <AddEmploymentHistory onClick={() => handleAddJob()} />
              ) : (
                <EmploymentHistoryAdded />
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
              {!postFile ? (
                <Resume
                  onImageClick={onImageClick}
                  inputFile={inputFile}
                  changeHandler={changeHandler}
                />
              ) : (
                <>
                  <ResumeHeader />
                  <div style={{ display: "flex" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      {postFile && (
                        <RemoveResume onClick={() => setPostFile()} />
                      )}
                    </motion.div>
                  </div>
                  {postFile && (
                    <Text style={{ width: "100%", padding: 0 }}>
                      {`> `}
                      {postFile.name}
                    </Text>
                  )}
                </>
              )}
              {!postFile ? (
                <CoverLetter
                  onImageClick={onImageClick}
                  inputFile={inputFile}
                  changeHandler={changeHandler}
                />
              ) : (
                <>
                  <CoverLetterHeader />
                  <div style={{ display: "flex" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      {postFile && (
                        <RemoveCoverLetter onClick={() => setPostFile()} />
                      )}
                    </motion.div>
                  </div>
                  {postFile && (
                    <Text style={{ width: "100%", padding: 0 }}>
                      {`> `}
                      {postFile.name}
                    </Text>
                  )}
                </>
              )}
              {contact.length === 0 ? (
                <AddContact onClick={() => handleAddContact()} />
              ) : (
                <ContactAdded />
              )}
              {contact.map((info, index) => (
                <Contact
                  key={index}
                  onChange={(event) => handleChangeInputContact(index, event)}
                  valueOne={info.email}
                  valueTwo={info.phone}
                  valueThree={info.twitter}
                  valueFour={info.github}
                  valueFive={info.telegram}
                  valueSix={info.website}
                  onClick={() => handleRemoveContact(index)}
                />
              ))}
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
  padding: 1.25rem 0;
`;

const Label = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;
