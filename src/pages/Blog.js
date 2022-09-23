import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Links } from "../components/Styles/Links";
import { usePosts } from "../components/custom-hooks/usePost";
import LoadingSpinner from "../components/Styles/LoadingSpinner";

const readableDate = (dateString) => new Date(dateString).toDateString();

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
const category = ["News", "Reviews", "dydx", "View all"];

const Blog = () => {
  const [posts, isLoading] = usePosts();
  const [filteredSearch, setFilteredSearch] = useState();
  const [search, setSearch] = useState("");
  const [searchCategory, setSearchCategory] = useState("View all");
  const [openCategory, setOpenCategory] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filterPosts = () => {
      const filtered = posts?.filter((post) => {
        if (
          post.fields.blogTitle.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      });
      const filteredSearchTwo = filtered?.filter((post) => {
        if (
          post.fields.postType
            .toLowerCase()
            .includes(searchCategory.toLowerCase())
        ) {
          return true;
        }
      });
      setFilteredSearch(filteredSearchTwo);
    };
    filterPosts();
  }, [search, posts, searchCategory]);

  console.log(searchCategory);
  window.localStorage.setItem("searchResultsCategory", searchCategory);

  const renderPosts = () => {
    if (isLoading) return <LoadingSpinner />;

    return (
      <Wrapper>
        <H3>News & Reviews</H3>
        <Label>
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Label>
        <motion.div whileHover={{ scale: 1.05 }}>
          <DropdownHeader
            ref={buttonRef}
            onClick={() => setOpenCategory(!openCategory)}
          >
            Select Category
          </DropdownHeader>
        </motion.div>

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
        <Grid>
          {filteredSearch.map((post, key) => (
            <Links key={key} to={`/${post.fields.slug}`}>
              <CardContainer
                key={post.fields.slug}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
              >
                <ProfileWrapper variants={cardVariants}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Img
                      src={post?.fields?.blogImage?.fields.file.url}
                      alt="img"
                    />
                  </motion.div>

                  <TextWrapper>
                    <Header>{post.fields.blogTitle}</Header>
                    {/* {console.log(post?.metadata.tags[0].sys.id)} */}

                    <Text>{post.fields.blogSummary}</Text>
                    <SmallText>
                      <span style={{ color: "#ff00ff" }}>
                        {readableDate(post.fields.createdDate)}
                      </span>
                    </SmallText>
                  </TextWrapper>
                </ProfileWrapper>
              </CardContainer>
            </Links>
          ))}
        </Grid>
      </Wrapper>
    );
  };
  return <>{renderPosts()}</>;
};

export default Blog;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background: #040010; */
  padding-bottom: 2rem;
  padding-top: 3rem;
  min-height: 100vh;
  @media screen and (max-width: 1023px) {
    padding-top: 2rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 1rem;
  }
`;

const Grid = styled.div`
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  @media screen and (max-width: 1023px) {
    grid-gap: 2rem;
    padding-top: 0.75rem;
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 600px) {
    padding-top: 0.5rem;
    grid-gap: 2rem;
  }
  @media screen and (min-width: 1560px) {
    grid-gap: 4rem;
  }
`;

const CardContainer = styled(motion.div)`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

const ProfileWrapper = styled(motion.div)`
  text-align: left;
  display: flex;
  flex-direction: column;
  width: 31rem;
  height: 34rem;
  background: #040010;
  @media screen and (max-width: 1023px) {
    width: 28rem;
    height: 28rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    height: 22rem;
  }
  @media screen and (min-width: 1560px) {
    width: 38rem;
    height: 36rem;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 2.25rem;
  /* height: 16rem; */
  @media screen and (max-width: 1023px) {
    padding: 1.25rem 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem 1.25rem;
  }
`;

const Header = styled.div`
  font-family: "Russo One", sans-serif;
  /* text-transform: uppercase; */
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
  }
  @media screen and (min-width: 1560px) {
    font-size: 1.3rem;
  }
`;

const Text = styled.div`
  color: #daefff;
  transition: all 0.5s linear;
  padding: 0;
  font-size: 0.75rem;
  line-height: 180%;
  white-space: pre-wrap;

  @media screen and (max-width: 1023px) {
    font-size: 0.65rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.5rem;
    line-height: 170%;
  }
  @media screen and (min-width: 1560px) {
    font-size: 0.85rem;
  }
`;

const SmallText = styled.div`
  color: #daefff;
  transition: all 0.5s linear;
  padding: 0;
  font-size: 0.65rem;
  line-height: 180%;
  white-space: pre-wrap;
  padding-top: 1rem;

  @media screen and (max-width: 1023px) {
    font-size: 0.55rem;
    padding-top: 0.9rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.45rem;
    line-height: 170%;
    padding-top: 0.8rem;
  }
  @media screen and (min-width: 1560px) {
    font-size: 0.7rem;
  }
`;

const ViewPost = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding: 0;
  font-size: 1.15rem;
  white-space: pre-wrap;
  font-weight: bold;
  padding-top: 0.75rem;

  @media screen and (max-width: 1023px) {
    font-size: 1rem;
    padding-top: 0.65rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    padding-top: 0.45rem;
  }
`;

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 4rem;
  padding-bottom: 1rem;
  padding-top: 1rem;

  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 3rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
`;

const Label = styled.div`
  padding: 0.5rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
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

const Tweet = styled.a`
  padding-top: 0.25rem;
  color: #080e57;
  text-decoration: none;
  cursor: pointer;
  font-size: 2rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 4.5rem;
  /* padding-left: 1rem; */
  color: #daefff;
  &.main {
    color: #31f2e4;
    filter: drop-shadow(0px 0px 14px #31f2e4);

    -webkit-animation: glow 2s ease-in-out infinite alternate;
    -moz-animation: glow 2s ease-in-out infinite alternate;
    animation: glow 2s ease-in-out infinite alternate;
  }
  @keyframes glow {
    from {
      filter: drop-shadow(0px 0px 14px #31f2e4);
      color: #31f2e4;
    }
    to {
      filter: drop-shadow(0px 0px 14px rgb(255, 0, 255));
      color: rgb(255, 0, 255);
    }
  }
  @media screen and (max-width: 1023px) {
    /* padding-left: 0.5rem; */
    font-size: 3.375rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

const DropdownMenu = styled.div`
  background: #daefff;
  border: 2px solid #080e57;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 15rem;
  @media screen and (max-width: 600px) {
    width: 12rem;
    font-size: 0.75rem;
    padding: 0.5rem;
    border: 1px solid #080e57;
  }
`;

const DropdownSearch = styled.div`
  color: #040010;
  transition: all 0.5s linear;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
`;

const DropdownHeader = styled.div`
  color: #040010;
  transition: all 0.5s linear;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    margin-bottom: 0.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.6rem;
    padding: 0.15rem 0.5rem;
  }
`;
