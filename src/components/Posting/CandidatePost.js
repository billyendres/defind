import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Education,
  AddEducation,
  EducationAdded,
} from "./PostComponents/Education";
import {
  EmploymentHistory,
  AddEmploymentHistory,
  EmploymentHistoryAdded,
} from "./PostComponents/EmploymentHistory";
import { Resume, ResumeHeader, RemoveResume } from "./PostComponents/Resume";
import {
  CoverLetter,
  CoverLetterHeader,
  RemoveCoverLetter,
} from "./PostComponents/CoverLetter";

import { Contact, AddContact, ContactAdded } from "./PostComponents/Contact";

import PersonalSummary from "./PostComponents/PersonalSummary";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Button from "../Styles/Button";
import Img from "../Styles/ProfilePicture";
import defaultProfileImage from "../images/defaultProfileImage.png";
import { CategoryDropdown, CategoryHeader } from "./PostComponents/Category";
import { LocationDropdown, LocationHeader } from "./PostComponents/Location";

const CandidatePost = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  const inputFileCoverLetter = useRef(null);
  const [postFileCoverLetter, setPostFileCoverLetter] = useState();
  const [postFile, setPostFile] = useState();
  const [personalSummary, setPersonalSummary] = useState("");
  const [education, setEducation] = useState([]);
  const [job, setJob] = useState([]);
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [contact, setContact] = useState([]);
  const [currency, setCurrency] = useState("usdt");
  const [paymentAmount, setPaymentAmount] = useState(1);
  const [post, setPost] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { fetch, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount:
      currency === "usdt"
        ? `${Moralis.Units.Token(paymentAmount, 6)}`
        : `${Moralis.Units.Token(0.2, 18)}`,
    receiver: "0xEbcAB2d369eB669c20728415ff3CEB9B9F9f5034",
    contractAddress:
      currency === "usdt"
        ? "0x110a13FC3efE6A245B50102D2d79B3E76125Ae83"
        : "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
  });
  const userPost = async () => {
    try {
      await Moralis.enableWeb3();
      if (!personalSummary || !category || !location)
        return toast.error("Please complete all required fields", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      setIsLoading(true);
      fetch({
        onSuccess: (tx) =>
          tx.wait().then(() => {
            savePost();
          }),
        onError: (error) => {
          setIsLoading(false);
          return toast.error(error.message, {
            position: "bottom-left",
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
      const Posts = Moralis.Object.extend("Candidate_Posts");
      const newPost = new Posts();

      if (!personalSummary || !category || !location)
        return toast.error("Please complete all required fields", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      setIsLoading(true);

      newPost.set("paymentAmount", paymentAmount);
      newPost.set("personalSummary", personalSummary);
      newPost.set("usersEducation", education);
      newPost.set("employmentHistory", job);
      newPost.set("contactInformation", contact);
      newPost.set("searchCategory", category);
      newPost.set("searchLocation", location);
      newPost.set("posterProfilePic", user.attributes.profilePic);
      newPost.set("posterAccount", user.attributes.ethAddress);
      newPost.set("posterUsername", user.attributes.username);
      newPost.set("posterBio", user.attributes.bio);
      //resume
      if (postFile) {
        const data = postFile;
        const file = new Moralis.File(data.name, data);

        await file.saveIPFS();
        newPost.set("postImg", file.ipfs());
      }
      //cover letter
      if (postFileCoverLetter) {
        const data = postFileCoverLetter;
        const file = new Moralis.File(data.name, data);

        await file.saveIPFS();
        newPost.set("postImgCoverLetter", file.ipfs());
      }
      await newPost.save();
      navigate(`/postsuccess`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const redirectSave = () => {
    if (!personalSummary || !category || !location)
      return toast.error("Please complete all required fields", {
        position: "bottom-left",
        toastId: "custom-id",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    setPost(true);
  };

  const imageType = /application\/(pdf)/i;

  const onImageClick = () => {
    inputFile.current.click();
  };

  const onImageClickCoverLetter = () => {
    inputFileCoverLetter.current.click();
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
  const changeHandlerCoverLetter = (e) => {
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
    setPostFileCoverLetter(img);
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

  const description = [
    "Software Developer",
    "Finance",
    "Customer Service",
    "Management",
    "Writing",
    "Other",
  ];

  const locationArray = [
    "Remote",
    "America",
    "Australia",
    "Canada",
    "Europe",
    "United Kingdom",
    "Asia",
    "New Zealand",
    "South America",
    "Other",
  ];

  return (
    <>
      {isLoading || isFetching ? (
        <Wrapper>
          <LoadingSpinner />
        </Wrapper>
      ) : (
        <Wrapper>
          <ToastContainer />
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
                }}
              >
                <div>
                  <Header>{user.attributes.username}</Header>
                  <SubHeader>{user.attributes.bio}</SubHeader>
                </div>
                <Img
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
              <CategoryHeader onClick={() => setOpen(!open)} />
              <AnimatePresence>
                {open && (
                  <motion.div
                    key="box 1"
                    initial={{ y: "50%", opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                  >
                    <DropdownMenu>
                      {description.map((i, key) => (
                        <CategoryDropdown
                          key={key}
                          i={i}
                          category={category}
                          onClick={() => {
                            setCategory(i);
                          }}
                        />
                      ))}
                    </DropdownMenu>
                  </motion.div>
                )}
              </AnimatePresence>
              <LocationHeader onClick={() => setOpenLocation(!openLocation)} />
              <AnimatePresence>
                {openLocation && (
                  <motion.div
                    key="box 1"
                    initial={{ y: "50%", opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                  >
                    <DropdownMenu>
                      {locationArray.map((i, key) => (
                        <LocationDropdown
                          key={key}
                          i={i}
                          location={location}
                          onClick={() => {
                            setLocation(i);
                          }}
                        />
                      ))}
                    </DropdownMenu>
                  </motion.div>
                )}
              </AnimatePresence>
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
              {!postFileCoverLetter ? (
                <CoverLetter
                  onImageClick={onImageClickCoverLetter}
                  inputFile={inputFileCoverLetter}
                  changeHandler={changeHandlerCoverLetter}
                />
              ) : (
                <>
                  <CoverLetterHeader />
                  <div style={{ display: "flex" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      {postFileCoverLetter && (
                        <RemoveCoverLetter
                          onClick={() => setPostFileCoverLetter()}
                        />
                      )}
                    </motion.div>
                  </div>
                  {postFileCoverLetter && (
                    <Text style={{ width: "100%", padding: 0 }}>
                      {`> `}
                      {postFileCoverLetter.name}
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
            </Template>
          </motion.div>
        </Wrapper>
      )}
      <Button onClick={redirectSave} text="Post" />
      <AnimatePresence>
        {post && (
          <PaymentWrapper
            initial={{ opacity: 0, y: "0%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
          >
            <PaymentGrid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <HeaderWrapper>
                  <PaymentHeader>Publish Your Post</PaymentHeader>
                  <PaymentText>
                    <p>
                      We offer basic and featured posts. Basic posts and free to
                      publish, while featured posts incur a USDT charge. A
                      charge that is decided by you.
                    </p>
                  </PaymentText>
                </HeaderWrapper>
                <ButtonWrapper>
                  <Button
                    onClick={() => setReadMore(!readMore)}
                    text="Read More"
                  />
                  <Button onClick={() => setPost(false)} text="Return" />
                  {/* <Button
                    onClick={savePost}
                    disabled={isLoading}
                    text="Basic Post"
                  /> */}
                  {/* <Button
                    onClick={userPost}
                    disabled={isLoading}
                    text="Featured Post"
                  /> */}
                </ButtonWrapper>
              </div>
              {/* <h1>Payment amount {paymentAmount}</h1>
              <Button
                onClick={() => setPaymentAmount(paymentAmount + 1)}
                text="+ $1"
              />
              <Button onClick={() => setCurrency("usdt")} text="USDT" />
              <Button onClick={() => setCurrency("uni")} text="UNI" /> */}
              <AnimatePresence>
                {readMore && (
                  <Modal
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <ModalText>
                      <p>
                        <br />
                        While all posts are visible on the forum, they are by
                        default filtered by 'Featured Points'. <br />
                        <p>
                          <br />
                          <i>Featured Points = USDT charge * 10</i>
                        </p>
                      </p>
                      <br />
                      <p>
                        Posts with the highest number of Featured Points are
                        displayed at the top of the forum, while basic posts are
                        displayed last.
                      </p>
                      <br />
                      <p>
                        In order for your post to be viewed by the most eyes, it
                        is recommended to utilise the Featured Points bidding
                        system to secure a top rank.
                      </p>
                      <br />
                      <p>
                        Payments are accepted in USDT via the Binance Smart
                        Chain, or Ethereum mainnet blockchains.
                      </p>
                      <br />
                      <p>
                        Please note, all posts will be screened for compliance
                        within 24 hours. Once approved, they will be published
                        to the forum and active for 30 days. If you wish to edit
                        or delete a post during this time, please contact our
                        support team.
                      </p>
                    </ModalText>
                    <Button
                      onClick={() => setReadMore(!readMore)}
                      text="close"
                    />
                  </Modal>
                )}
              </AnimatePresence>
            </PaymentGrid>
          </PaymentWrapper>
        )}
      </AnimatePresence>
    </>
  );
};

export default CandidatePost;

const PaymentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.background};
  height: 100vh;
  width: 100vw;
`;

const PaymentGrid = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  text-align: left;
  margin-top: 2rem;
  width: 32rem;
  @media screen and (max-width: 975px) {
    text-align: center;
    margin-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 34rem;
  @media screen and (max-width: 975px) {
    justify-content: center;
  }
`;

const PaymentText = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  text-align: left;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    text-align: center;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const ModalText = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
  text-align: left;
  /* font-size: 1.25rem; */
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
  }
`;

const Modal = styled(motion.div)`
  width: 40rem;
  position: absolute;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.text};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media screen and (max-width: 1023px) {
    width: 34rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
  }
`;

const PaymentHeader = styled.h2`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 0;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Wrapper = styled.div`
  min-height: 80vh;
  padding: 2rem 0;
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
  @media screen and (max-width: 1023px) {
    width: 33rem;
    padding: 2rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
    padding: 1.25rem;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 0;
  font-size: 1rem;
  margin-bottom: 1rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 2rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    padding: 0.1rem 0;
  }
`;

const SubHeader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0 0 0.5rem 0;
  font-size: 1.25rem;
  line-height: 180%;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    line-height: 150%;
  }
`;

const Label = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;

const DropdownMenu = styled.div`
  background: ${({ theme }) => theme.text};
  border-radius: 0.5rem;
  padding: 0 1.5rem;
`;
