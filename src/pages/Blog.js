import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const Blog = () => {
  const [posts, isLoading] = usePosts();
  const [filteredSearch, setFilteredSearch] = useState();
  const [search, setSearch] = useState("");

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
      setFilteredSearch(filtered);
    };
    filterPosts();
  }, [search, posts]);
  console.log(filteredSearch);

  const renderPosts = () => {
    if (isLoading) return <LoadingSpinner />;

    return (
      <Wrapper>
        <H3 className="main">News & Reviews</H3>
        <Label>
          <Input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Label>
        <Grid>
          {filteredSearch.map((post) => (
            <CardContainer
              key={post.fields.slug}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProfileWrapper variants={cardVariants}>
                <Img src={post?.fields?.blogImage?.fields.file.url} alt="img" />

                <TextWrapper>
                  <Header>{post.fields.blogTitle}</Header>
                  {/* <Text>{post.fields.blogSummary}</Text> */}
                  <Text>{readableDate(post.fields.createdDate)}</Text>

                  <Links to={`/portal/${post.fields.slug}`}>
                    <ViewPost>
                      <b style={{ color: "#ff00ff" }}>View Post {">"}</b>
                    </ViewPost>
                  </Links>
                </TextWrapper>
              </ProfileWrapper>
            </CardContainer>
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
  background: #040010;
  padding-bottom: 2rem;
  padding-top: 7rem;
  min-height: 100vh;
  @media screen and (max-width: 1023px) {
    padding-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 4rem;
  }
`;

const Grid = styled.div`
  padding-top: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 1023px) {
    grid-gap: 1.5rem;
    padding-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 0.5rem;
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
  display: flex;
  flex-direction: column;
  width: 40rem;
  border-radius: 0.75rem;
  background-color: #daefff;
  box-shadow: 0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075),
    0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075),
    0 0 16px hsl(0deg 0% 0% / 0.075);
  transform-origin: 10% 60%;
  @media screen and (max-width: 1023px) {
    width: 34rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 1.5rem 2.25rem;
  @media screen and (max-width: 1023px) {
    padding: 1.25rem 2rem;
    width: 80%;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem 1.25rem;
    width: 90%;
  }
`;

const Header = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding-bottom: 0.5rem;
  }
`;

const Text = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding: 0;
  font-size: 0.85rem;
  line-height: 180%;
  white-space: pre-wrap;

  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.55rem;
    line-height: 170%;
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
  border-radius: 0.75rem 0.75rem 0 0;
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
