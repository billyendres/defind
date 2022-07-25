import React, { useEffect, useState, useRef } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion, AnimatePresence } from "framer-motion";

import { FaSearch } from "react-icons/fa";
import defaultProfileImage from "../images/defaultProfileImage.png";
import Button from "../Styles/Button";
import LoadingSpinner from "../Styles/LoadingSpinner";
import Img from "../Styles/ProfilePicture";

const cardVariants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.4,
    },
  },
};

const ViewCandidatePosts = ({ profile }) => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const [postArray, setPostArray] = useState();
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sortByPaymentAmount, setSortByPaymentAmount] = useState(true);
  const [openCategory, setOpenCategory] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const buttonRef = useRef();
  const buttonRefLocation = useRef();

  const category = [
    "Software Developer",
    "Customer Service",
    "Management",
    "Finance",
    "Writing",
    "Other",
  ];

  const location = [
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

  const getPosts = async () => {
    try {
      setIsLoading(true);
      const Posts = Moralis.Object.extend("Posts");
      const query = new Moralis.Query(Posts);
      if (profile) {
        query.equalTo("posterAccount", user.attributes.ethAddress);
      }
      const results = await query.find();

      if (sortByPaymentAmount === true) {
        let x = [...results].sort(
          (a, b) => a.attributes.paymentAmount - b.attributes.paymentAmount
        );

        const filteredArray = x?.filter((i) => {
          if (
            i.attributes.personalSummary
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
          if (
            i.attributes.posterUsername
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
          if (
            i.attributes.searchCategory
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
        });
        const filteredSearchTwo = filteredArray?.filter((i) => {
          if (i.attributes.searchCategory.includes(searchCategory)) {
            return true;
          }
        });
        const filteredSearchThree = filteredSearchTwo?.filter((i) => {
          if (i.attributes.searchLocation.includes(searchLocation)) {
            return true;
          }
        });
        const filterVerifiedPosts = filteredSearchThree?.filter((i) => {
          if (i.attributes.verifiedPost) {
            return true;
          }
        });
        setPostArray(filterVerifiedPosts);
      }

      if (sortByPaymentAmount === false) {
        let x = results;
        const filteredArray = x?.filter((i) => {
          if (
            i.attributes.personalSummary
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
          if (
            i.attributes.posterUsername
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
          if (
            i.attributes.searchCategory
              .toLowerCase()
              .includes(search.toLowerCase())
          ) {
            return true;
          }
        });
        const filteredSearchTwo = filteredArray?.filter((i) => {
          if (i.attributes.searchCategory.includes(searchCategory)) {
            return true;
          }
        });
        const filteredSearchThree = filteredSearchTwo?.filter((i) => {
          if (i.attributes.searchLocation.includes(searchLocation)) {
            return true;
          }
        });
        const filterVerifiedPosts = filteredSearchThree?.filter((i) => {
          if (i.attributes.verifiedPost) {
            return true;
          }
        });
        setPostArray(filterVerifiedPosts);
      }

      window.localStorage.setItem("filteredBy", sortByPaymentAmount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  window.localStorage.setItem("searchResults", search);
  window.localStorage.setItem("searchResultsCategory", searchCategory);
  window.localStorage.setItem("searchResultsLocation", searchLocation);

  const sortDate = () => {
    setSortByPaymentAmount(false);
  };

  const sortPrice = () => {
    setSortByPaymentAmount(true);
  };

  useEffect(() => {
    getPosts();
  }, [sortByPaymentAmount, searchCategory, searchLocation]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (e.path[0] !== buttonRef.current) {
        setOpenCategory(false);
      }
    };
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);

  useEffect(() => {
    const closeDropdownLocation = (e) => {
      if (e.path[0] !== buttonRefLocation.current) {
        setOpenLocation(false);
      }
    };
    document.body.addEventListener("click", closeDropdownLocation);
    return () =>
      document.body.removeEventListener("click", closeDropdownLocation);
  }, []);

  const clearLocalStorage = () => {
    window.location.reload();
  };

  return (
    <Wrapper>
      {isLoading ? (
        <>
          <LoadingSpinner />
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Label>
              <FaSearch
                style={{
                  marginRight: "1rem",
                  marginBottom: "-0.5rem",
                  marginLeft: "-3rem",
                  marginTop: "1.5rem",
                }}
              />
              <Input
                type="text"
                placeholder={window.localStorage.getItem("searchResults")}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Label>
            <Button onClick={getPosts} text="Go" />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <HeaderSearch
                style={{
                  border: sortByPaymentAmount && "1px solid",
                  borderRadius: "0.25rem",
                }}
                onClick={sortPrice}
              >
                Sort By Points
              </HeaderSearch>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <HeaderSearch
                onClick={sortDate}
                style={{
                  border: !sortByPaymentAmount && "1px solid",
                  borderRadius: "0.25rem",
                }}
              >
                Sort by Date
              </HeaderSearch>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <HeaderSearch onClick={clearLocalStorage}>View All</HeaderSearch>
            </motion.div>
          </div>
          <div style={{ display: "flex" }}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <DropdownHeader
                ref={buttonRef}
                onClick={() => setOpenCategory(!openCategory)}
              >
                Select Category
              </DropdownHeader>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <DropdownHeader
                ref={buttonRefLocation}
                onClick={() => setOpenLocation(!openLocation)}
              >
                Select Location
              </DropdownHeader>
            </motion.div>
          </div>
          <AnimatePresence>
            {openCategory && (
              <motion.div
                initial={{ opacity: 0, y: "-5%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-5%" }}
                key="box"
                transition={{
                  type: "spring",
                  stiffness: "100",
                }}
                style={{ height: "12rem", marginBottom: "-12rem" }}
              >
                <DropdownMenu>
                  {category.map((i, key) => (
                    <motion.div key={key} whileHover={{ scale: 1.05 }}>
                      <DropdownSearch
                        style={{
                          border: i === searchCategory && "1px solid",
                          borderRadius: "0.25rem",
                        }}
                        onClick={() => {
                          setSearchCategory(i);
                          setOpenCategory(false);
                        }}
                      >
                        {i}
                      </DropdownSearch>
                    </motion.div>
                  ))}
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {openLocation && (
              <motion.div
                initial={{ opacity: 0, y: "-5%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "-5%" }}
                transition={{
                  type: "spring",
                  stiffness: "100",
                }}
                style={{ height: "12rem", marginBottom: "-12rem" }}
                key="box 1"
              >
                <DropdownMenu>
                  {location.map((i, key) => (
                    <motion.div key={key} whileHover={{ scale: 1.05 }}>
                      <DropdownSearch
                        style={{
                          border: i === searchLocation && "1px solid",
                          borderRadius: "0.25rem",
                        }}
                        onClick={() => {
                          setSearchLocation(i);
                          setOpenLocation(false);
                        }}
                      >
                        {i}
                      </DropdownSearch>
                    </motion.div>
                  ))}
                </DropdownMenu>
              </motion.div>
            )}
          </AnimatePresence>
          <ResultsText>
            {postArray?.length === 1
              ? `${postArray.length} result found`
              : `${postArray?.length} results found`}
          </ResultsText>
          <>
            <Grid>
              {postArray
                ?.map((item, key) => {
                  return (
                    <CardContainer
                      key={key}
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.8 }}
                    >
                      <ProfileWrapper variants={cardVariants}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Links
                                to={`/profile/${item.attributes.posterUsername}`}
                              >
                                <Header>
                                  {item.attributes.posterUsername}
                                </Header>
                              </Links>
                            </motion.div>
                            <Subheader>{item.attributes.posterBio}</Subheader>
                            <Text>
                              {"> "}
                              {`${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  month: "short",
                                }
                              )} ${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  day: "numeric",
                                }
                              )}, ${item.attributes.createdAt.toLocaleString(
                                "en-us",
                                {
                                  year: "numeric",
                                }
                              )}`}
                              <div style={{ marginBottom: "1.5rem" }}></div>
                            </Text>
                          </div>
                          <div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Img
                                style={{ marginBottom: "0.25rem" }}
                                src={
                                  item.attributes.posterProfilePic
                                    ? item.attributes.posterProfilePic
                                    : defaultProfileImage
                                }
                                alt="Profile pic"
                              />
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                textAlign: "center",
                              }}
                            >
                              <motion.div whileHover={{ scale: 1.05 }}>
                                <Links to={`/forum/${item.id}`}>
                                  <Text
                                    style={{
                                      fontWeight: "bold",
                                      padding: "0.5rem 0",
                                    }}
                                  >
                                    View Post {">"}
                                  </Text>
                                </Links>
                              </motion.div>
                              <Text>
                                Points - {item.attributes.paymentAmount * 10}
                              </Text>
                              {item.attributes.searchCategory && (
                                <Text>{item.attributes.searchCategory}</Text>
                              )}
                              {item.attributes.searchLocation && (
                                <Text>{item.attributes.searchLocation}</Text>
                              )}
                            </div>
                          </div>
                        </div>

                        {item.attributes.personalSummary && (
                          <>
                            <Subheader style={{ marginBottom: "0.25rem" }}>
                              Personal Summary
                            </Subheader>
                            <Text>{item.attributes.personalSummary}</Text>
                          </>
                        )}
                      </ProfileWrapper>
                    </CardContainer>
                  );
                })
                .reverse()}
            </Grid>
          </>
        </>
      )}
    </Wrapper>
  );
};

export default ViewCandidatePosts;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 600px) {
    grid-gap: 1.5rem;
  }
`;

const CardContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrapper = styled(motion.div)`
  text-align: left;
  width: 43rem;
  padding: 2.5rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.text};
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
  @media screen and (max-width: 1023px) {
    width: 33rem;
    padding: 2rem;
  }
  @media screen and (max-width: 600px) {
    width: 18.5rem;
    padding: 1.25rem;
  }
`;

const ResultsText = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  font-size: 1rem;
  margin: 1rem 0.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    margin: 0.5rem 0.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
    margin: 0.3rem 0.25rem;
  }
`;

const Label = styled.div`
  padding: 0.5rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.icon};
  margin-bottom: 0.5rem;
  @media screen and (max-width: 1023px) {
    padding: 0;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  background: #bae1ff;
  font-family: "Kdam Thmor Pro", sans-serif;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
`;

const Header = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
    padding: 0.1rem 0;
  }
`;

const HeaderSearch = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.25rem 1rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: bold;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 600px) {
    font-weight: 300;
    font-size: 0.55rem;
    margin-bottom: 0.25rem;
  }
`;

const DropdownMenu = styled.div`
  background: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.textModals};
  border-radius: 0.5rem;
  padding: 1rem;
  width: 15rem;
  @media screen and (max-width: 600px) {
    width: 12rem;
    font-size: 0.75rem;
    padding: 0.5rem;
    border: 1px solid ${({ theme }) => theme.textModals};
  }
`;

const DropdownHeader = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
    font-weight: 300;
  }
`;

const DropdownSearch = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.2rem;
  padding: 0.25rem 0;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.7rem;
    padding: 0.15rem 0;
  }
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0;
  font-size: 0.85rem;
  line-height: 180%;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.55rem;
    line-height: 170%;
  }
`;
