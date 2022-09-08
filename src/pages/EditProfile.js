import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMoralis } from "react-moralis";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaTimesCircle, FaChevronLeft } from "react-icons/fa";

import { Links } from "../components/Styles/Links";
import Username from "../components/UserProfile/Username";
import Bio from "../components/UserProfile/Bio";
import ProfileImage from "../components/UserProfile/ProfileImage";
import defaultProfileImage from "../components/images/defaultProfileImage.png";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import Button from "../components/Styles/Button";

const EditUserProfle = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();

  const [isLoading, setIsLoading] = useState(false);
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(
    user.attributes.profilePic
      ? user.attributes.profilePic
      : defaultProfileImage
  );
  const [theFile, setTheFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const saveBio = async () => {
    try {
      setIsLoading(true);
      const User = Moralis.Object.extend("_User");
      const query = new Moralis.Query(User);
      const myDetails = await query.first();

      if (username) {
        myDetails.set("username", username);
      }

      if (bio) {
        myDetails.set("bio", bio);
      }

      if (theFile) {
        const data = theFile;
        const file = new Moralis.File(data.name, data);
        await file.saveIPFS();
        myDetails.set("profilePic", file.ipfs());
      }

      await myDetails.save();
    } catch (error) {
      if (error) {
        return toast("Account already exists for this username", {
          position: "top-center",
          toastId: "custom-id",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } finally {
      setTimeout(() => {
        navigate(`/myprofile/${user.attributes.ethAddress}`);
        setIsLoading(false);
        window.location.reload();
      }, 4000);
    }
  };

  const deleteBio = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();
    myDetails.set(
      "username",
      `${user.attributes.ethAddress.slice(0, 4)}...
    ${user.attributes.ethAddress.slice(38)}`
    );
    myDetails.set("bio", "");
    myDetails.set("profilePic", defaultProfileImage);

    await myDetails.save();
    setIsLoading(false);
    navigate(`/myprofile/${user.attributes.ethAddress}`);
    window.location.reload();
  };

  const imageType = /image\/(png|jpg|jpeg)/i;

  const profileImageClickHandler = () => {
    inputFile.current.click();
  };

  const profileImageChangeHandler = (e) => {
    const img = e.target.files[0];
    if (!img.type.match(imageType)) {
      if (!img.type.match(imageType)) {
        return toast("Image type not valid", {
          position: "top-center",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <Wrapper>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ y: "-100vh", scale: 0.5, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            duration: 0.7,
            type: "spring",
          }}
        >
          <ProfileImage
            syle={{ cursor: "pointer" }}
            onChange={profileImageChangeHandler}
            onClick={profileImageClickHandler}
            inputFile={inputFile}
            src={selectedFile}
            accept="image/png, image/jpeg, image/jpg"
          />
          <ToastContainer />
          <>
            <Username
              onChange={(e) => setUsername(e.currentTarget.value)}
              value={username}
            />
            <Bio onChange={(e) => setBio(e.currentTarget.value)} value={bio} />
            <div style={{ display: "flex" }}>
              <Button
                onClick={saveBio}
                disabled={isLoading}
                text={
                  <>
                    <FaCheck
                      style={{
                        marginBottom: "-0.2rem",
                        marginRight: "0.5rem",
                      }}
                    />
                    Save
                  </>
                }
              />
              <Button
                onClick={deleteBio}
                disabled={isLoading}
                text={
                  <>
                    <FaTimesCircle
                      style={{
                        marginBottom: "-0.2rem",
                        marginRight: "0.5rem",
                      }}
                    />
                    Delete
                  </>
                }
              />
            </div>
          </>
          <div>
            <Links to={`/myprofile/${user.attributes.ethAddress}`}>
              <Button
                text={
                  <>
                    <FaChevronLeft
                      style={{
                        marginBottom: "-0.2rem",
                        marginRight: "0.5rem",
                      }}
                    />
                    Return
                  </>
                }
              />
            </Links>
          </div>
        </motion.div>
      )}
      <ToastContainer />
    </Wrapper>
  );
};

export default EditUserProfle;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: #040010;
`;
