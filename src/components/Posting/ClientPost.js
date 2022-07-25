import React, { useState, useRef } from "react";
import styled from "styled-components";
import LoadingSpinner from "../Styles/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Styles/Button";
import { motion, AnimatePresence } from "framer-motion";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";
import PositionSummary from "./PostComponents/PositionSummary";
import { CategoryDropdown, CategoryHeader } from "./PostComponents/Category";
import { LocationDropdown, LocationHeader } from "./PostComponents/Location";

const ClientPost = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [currency, setCurrency] = useState("usdt");
  const [paymentAmount, setPaymentAmount] = useState(1);
  const [positionSummary, setPositionSummary] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

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
      if (!positionSummary || !category || !location)
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
      const Posts = Moralis.Object.extend("Job_Posts");
      const newPost = new Posts();

      if (!positionSummary || !category || !location)
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
      newPost.set("searchCategory", category);
      newPost.set("searchLocation", location);
      newPost.set("posterProfilePic", user.attributes.profilePic);
      newPost.set("posterAccount", user.attributes.ethAddress);
      newPost.set("posterUsername", user.attributes.username);
      newPost.set("posterBio", user.attributes.bio);

      await newPost.save();
      navigate(`/postsuccess`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
      {isLoading ? (
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
              <PositionSummary
                onChange={(e) => setPositionSummary(e.target.value)}
                value={positionSummary}
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
            </Template>
          </motion.div>
        </Wrapper>
      )}
      <Button onClick={savePost} disabled={isLoading} text="Save Post" />
    </>
  );
};

export default ClientPost;

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

const DropdownMenu = styled.div`
  background: ${({ theme }) => theme.text};
  border-radius: 0.5rem;
  padding: 0 1.5rem;
`;
