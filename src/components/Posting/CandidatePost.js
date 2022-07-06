import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3Transfer } from "react-moralis";
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
  const { Moralis, authError, error, authenticate } = useMoralis();
  const user = Moralis.User.current();
  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  // const [selectedFile, setSelectedFile] = useState();
  const [postFile, setPostFile] = useState();
  const [personalSummary, setPersonalSummary] = useState("");
  const [education, setEducation] = useState([]);
  const [job, setJob] = useState([]);
  const [contact, setContact] = useState([]);
  const [currency, setCurrency] = useState(false);

  const { fetch, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount: currency
      ? `${Moralis.Units.Token("1", "6")}`
      : `${Moralis.Units.Token("0.2", "18")}`,
    receiver: "0xEbcAB2d369eB669c20728415ff3CEB9B9F9f5034",
    contractAddress: currency
      ? "0x110a13FC3efE6A245B50102D2d79B3E76125Ae83"
      : "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  });

  const userPost = async () => {
    try {
      await Moralis.enableWeb3();
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
      fetch({
        onSuccess: (tx) =>
          tx.wait().then(() => {
            savePost();
          }),
        onError: (error) => {
          return toast.error(error.message, {
            position: "top-center",
            toastId: "custom-id",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        },
      });
    } catch (error) {
      console.log(error);
    }
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
    setEducation([
      ...education,
      { course: "", institution: "", dateFrom: "", dateTo: "" },
    ]);
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
    setJob([
      ...job,
      { jobTitle: "", company: "", description: "", dateFrom: "", dateTo: "" },
    ]);
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
    setContact([
      ...contact,
      {
        email: "",
        phone: "",
        twitter: "",
        github: "",
        telegram: "",
        website: "",
        location: "",
      },
    ]);
  };

  const handleRemoveContact = (index) => {
    const values = [...contact];
    values.splice(index, 1);
    setContact(values);
  };

  return (
    <>
      {isLoading || isFetching ? (
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
                  valueSeven={info.location}
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
              <Button onClick={() => setCurrency(!currency)} text="currency" />
              {console.log(currency)}
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
  /* letter-spacing: 2px; */
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
  width: 43rem;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
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
