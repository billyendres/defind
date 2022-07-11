import React, { useEffect, useState } from "react";
import { Links } from "../Styles/Links";
import styled from "styled-components";
import { useMoralis } from "react-moralis";
import { motion } from "framer-motion";

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
  const [isLoading, setIsLoading] = useState(false);
  const [sortByPaymentAmount, setSortByPaymentAmount] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(false);

  // console.log(selected);

  const options = [
    { names: "software dev", s: false, id: 1 },
    { names: "customer service", s: false, id: 2 },
    { names: "Finance", s: false, id: 3 },
  ];
  const [selected, setSelected] = useState(options);

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
        const payment = [...results].sort(
          (a, b) => a.attributes.paymentAmount - b.attributes.paymentAmount
        );
        setPostArray(
          payment?.filter(
            (item) =>
              item.attributes.personalSummary
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              item.attributes.posterUsername
                .toLowerCase()
                .includes(search.toLowerCase())
          )
        );
      } else {
        setPostArray(
          results?.filter(
            (item) =>
              item.attributes.personalSummary
                .toLowerCase()
                .includes(search.toLowerCase()) ||
              item.attributes.posterUsername
                .toLowerCase()
                .includes(search.toLowerCase())
          )
        );
      }
      window.localStorage.setItem("filteredBy", sortByPaymentAmount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  window.localStorage.setItem("searchResults", search);

  const sortDate = () => {
    setSortByPaymentAmount(false);
  };

  const sortPrice = () => {
    setSortByPaymentAmount(true);
  };

  useEffect(() => {
    getPosts();
  }, [sortByPaymentAmount]);

  const onOptionClicked = (index) => {
    const values = [...selected];
    values[index]["s"] = !values[index]["s"];
    setSelected(values);
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
                // size={30}
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
          <Button onClick={sortPrice} text="Sort By Points" />
          <Button onClick={sortDate} text="Sort by Date" />
          <h2 onClick={() => setIsOpen(!isOpen)}>Open</h2>
          {isOpen && (
            <ul>
              {options.map((option, index) => (
                <div key={option.id}>
                  <ul onClick={() => onOptionClicked(index)}>
                    {option.names}
                    {console.log(selected)}
                  </ul>
                </div>
              ))}
            </ul>
          )}
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
                            marginRight: "3rem",
                          }}
                        >
                          <div>
                            <motion.div whileHover={{ scale: 1.05 }}>
                              <Links
                                to={
                                  user.attributes.ethAddress ===
                                  item.attributes.posterAccount
                                    ? `/profile/${user.attributes.ethAddress}`
                                    : `/profile/${item.attributes.posterUsername}`
                                }
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
                                style={{ width: "7rem", height: "7rem" }}
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
                                padding: "0.75rem",
                              }}
                            >
                              <motion.div whileHover={{ scale: 1.05 }}>
                                <Links to={`/forum/${item.id}`}>
                                  <Text>View post {">"}</Text>
                                </Links>
                              </motion.div>
                            </div>
                            <Text>
                              Featured points{" "}
                              {item.attributes.paymentAmount * 10}
                            </Text>
                          </div>
                        </div>

                        {item.attributes.personalSummary && (
                          <>
                            <Subheader>Personal Summary</Subheader>
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
  padding: 3rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.text};
  /* box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px; */
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
`;

const ResultsText = styled.div`
  color: ${({ theme }) => theme.text};
  transition: all 0.5s linear;
  margin-bottom: 1rem;
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

const Header = styled.h2`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1.5rem;
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 0.25rem 0;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  padding: 0.25rem 0;
  font-size: 1rem;
`;
