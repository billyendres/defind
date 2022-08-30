import React, { useState, useRef } from "react";
import styled from "styled-components";
import LoadingSpinner from "../Styles/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useMoralis, useWeb3Transfer, useChain } from "react-moralis";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Styles/Button";
import { motion, AnimatePresence } from "framer-motion";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Img from "../Styles/ProfilePicture";
import PositionSummary from "./PostComponents/PositionSummary";
import { CategoryDropdown, CategoryHeader } from "./PostComponents/Category";
import { LocationDropdown, LocationHeader } from "./PostComponents/Location";
import { Contact, AddContact, ContactAdded } from "./PostComponents/Contact";
import {
  AdditionalDocs,
  AdditionalDocsHeader,
  RemoveAdditionalDocs,
} from "./PostComponents/AdditionalDocs";

const ClientPost = () => {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const { chainId } = useChain();
  const user = Moralis.User.current();

  const inputFile = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [positionSummary, setPositionSummary] = useState("");
  const [contact, setContact] = useState([]);
  const [postFile, setPostFile] = useState();
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [decimal, setDecimal] = useState();
  const [completePost, setCompletePost] = useState(false);
  const [contractAddress, setContractAddress] = useState();
  const [cryptoSelected, setCryptoSelected] = useState("");

  const { fetch, isFetching } = useWeb3Transfer({
    type: "erc20",
    amount: Moralis.Units.Token(paymentAmount, decimal),
    receiver: "0xE10208aAc0F0D1B0Ba62a1E65Ce6728B0349370C",
    contractAddress: contractAddress,
  });

  // console.log(chainId);

  const usdt = async () => {
    setDecimal(6);
    setContractAddress("0xdAC17F958D2ee523a2206206994597C13D831ec7");
    setCryptoSelected("usdt");
    const chainId = "0x1"; //Eth Mainnet
    await Moralis.switchNetwork(chainId);
  };

  const dai = async () => {
    setDecimal(18);
    setContractAddress("0x6B175474E89094C44Da98b954EedeAC495271d0F");
    setCryptoSelected("dai");
    const chainId = "0x1"; //Eth Mainnet
    await Moralis.switchNetwork(chainId);
  };

  const usdc = async () => {
    setDecimal(6);
    setContractAddress("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
    setCryptoSelected("usdc");
    const chainId = "0x1"; //Eth Mainnet
    await Moralis.switchNetwork(chainId);
  };

  const checkout = () => {
    try {
      if (!positionSummary || !category || !location)
        return toast.error("Please complete all required fields.", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      if (positionSummary && category && location) {
        setCompletePost(!completePost);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const userPost = async () => {
    try {
      await Moralis.enableWeb3();
      if (!positionSummary || !category || !location)
        return toast.error("Please complete all required fields.", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      if (chainId !== "0x1") {
        return toast.error("Please select an Ethereum wallet.", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      if (cryptoSelected === "") {
        return toast.error("Please select a payment method.", {
          position: "bottom-left",
          toastId: "custom-id",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }

      setIsLoading(true);
      fetch({
        onSuccess: (tx) =>
          tx.wait().then(() => {
            savePost();
          }),
        onError: (error) => {
          setIsLoading(false);
          return toast.error(
            "Transaction declined, please check you account balance and try again.",
            {
              position: "bottom-left",
              toastId: "custom-id",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            }
          );
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
      newPost.set("positionSummary", positionSummary);
      newPost.set("contactInformation", contact);
      newPost.set("searchCategory", category);
      newPost.set("searchLocation", location);
      newPost.set("posterProfilePic", user.attributes.profilePic);
      newPost.set("posterAccount", user.attributes.ethAddress);
      newPost.set("posterUsername", user.attributes.username);
      newPost.set("posterBio", user.attributes.bio);
      //additionalDocs
      if (postFile) {
        const data = postFile;
        const file = new Moralis.File(data.name, data);

        await file.saveIPFS();
        newPost.set("postImg", file.ipfs());
      }

      await newPost.save();
      navigate(`/postsuccess`);
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
              {!postFile ? (
                <AdditionalDocs
                  onImageClick={onImageClick}
                  inputFile={inputFile}
                  changeHandler={changeHandler}
                />
              ) : (
                <>
                  <AdditionalDocsHeader />
                  <div style={{ display: "flex" }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      {postFile && (
                        <RemoveAdditionalDocs onClick={() => setPostFile()} />
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
            </Template>
          </motion.div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "1.5rem",
            }}
          >
            <Button onClick={checkout} text="Post" />
          </div>
          <AnimatePresence>
            {completePost && (
              <PaymentWrapper>
                <PaymentGrid>
                  <Modal
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "1rem",
                        flexDirection: "column",
                      }}
                    >
                      <CheckoutHeader>Submit Post</CheckoutHeader>
                      <PaymentHeader>Select Payment Method</PaymentHeader>
                      <div style={{ display: "flex" }}>
                        <PaymentText
                          style={{
                            border: cryptoSelected === "usdt" && "1px solid",
                            borderRadius: "0.25rem",
                          }}
                          onClick={usdt}
                        >
                          USDT
                        </PaymentText>
                        <PaymentText
                          style={{
                            border: cryptoSelected === "dai" && "1px solid",
                            borderRadius: "0.25rem",
                          }}
                          onClick={dai}
                        >
                          DAI
                        </PaymentText>
                        <PaymentText
                          style={{
                            border: cryptoSelected === "usdc" && "1px solid",
                            borderRadius: "0.25rem",
                          }}
                          onClick={usdc}
                        >
                          USDC
                        </PaymentText>
                      </div>
                      <PaymentHeader>Select Payment Value</PaymentHeader>
                      <div style={{ display: "flex" }}>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount + 5);
                          }}
                        >
                          + $5
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount + 10);
                          }}
                        >
                          + $10
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount + 25);
                          }}
                        >
                          + $25
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount + 50);
                          }}
                        >
                          + $50
                        </PaymentText>
                      </div>
                      <div style={{ display: "flex" }}>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount - 5);
                          }}
                        >
                          - $5
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount - 10);
                          }}
                        >
                          - $10
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount - 25);
                          }}
                        >
                          - $25
                        </PaymentText>
                        <PaymentText
                          onClick={() => {
                            setPaymentAmount(paymentAmount - 50);
                          }}
                        >
                          - $50
                        </PaymentText>
                      </div>
                      <PaymentHeader>
                        Payment Amount ${paymentAmount} -{" "}
                        {cryptoSelected.toUpperCase()}
                      </PaymentHeader>
                      <div style={{ display: "flex" }}>
                        <Button onClick={userPost} text="Post" />
                        <Button
                          onClick={savePost}
                          disabled={isLoading}
                          text="Basic Post"
                        />
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        onClick={() => setCompletePost(!completePost)}
                        text="Close"
                      />
                    </div>
                  </Modal>
                </PaymentGrid>
              </PaymentWrapper>
            )}
          </AnimatePresence>
        </Wrapper>
      )}
    </>
  );
};

export default ClientPost;

const Wrapper = styled.div`
  min-height: 100vh;
  padding-top: 7rem;
  padding-bottom: 2rem;
  display: flex;
  justify-content: left;
  text-align: left;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  transition: all 0.5s linear;
  background: ${({ theme }) => theme.background};
  @media screen and (max-width: 1023px) {
    padding-top: 6rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 4rem;
  }
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

const PaymentText = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 0.2rem 0.75rem;
  margin: 0.3rem 0;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
    padding: 0.3rem 0.4rem;
  }
`;

const PaymentHeader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 0.5rem 0.75rem;
  @media screen and (max-width: 1023px) {
    padding: 0.3rem 0.5rem;
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.65rem;
    padding: 0.3rem 0.4rem;
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

const PaymentWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.background};
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`;

const PaymentGrid = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckoutHeader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 2rem;
    margin-bottom: 0;
    margin-top: 2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    margin-top: 2rem;
  }
`;
