import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Links } from "../components/Styles/Links";
import Button from "../components/Styles/Button";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderPosts = () => {
    if (isLoading) return <LoadingSpinner />;

    return (
      <Wrapper>
        <H1 className="main">portal</H1>
        <H3>CRYPTO - BLOCKCHAIN - WEB3 - DEFI</H3>
        <Grid>
          {posts.map((post) => (
            <CardContainer
              key={post.fields.slug}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.8 }}
            >
              <ProfileWrapper variants={cardVariants}>
                <TextWrapper>
                  <Header>{post.fields.blogTitle}</Header>
                  <Text>{post.fields.blogSummary}</Text>
                  <Text>{readableDate(post.fields.createdDate)}</Text>

                  <Links to={`/portal/${post.fields.slug}`}>
                    <Text
                      style={{
                        fontWeight: "bold",
                        padding: "0.5rem 0",
                      }}
                    >
                      <b style={{ color: "#ff00ff" }}>View Post {">"}</b>
                    </Text>
                  </Links>
                </TextWrapper>
                <Img src={post?.fields?.blogImage?.fields.file.url} alt="img" />
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
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 1023px) {
    grid-gap: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    grid-gap: 1rem;
    padding-top: 1.5rem;
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
  justify-content: space-between;
  width: 50rem;
  border-radius: 1rem;
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
  padding: 2.5rem;
  @media screen and (max-width: 1023px) {
    padding: 2rem;
  }
  @media screen and (max-width: 600px) {
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  color: #080e57;
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

const H3 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 1.55rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;

  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1.162rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
`;

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 5rem;
  padding-left: 1rem;
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
    padding-left: 0.5rem;
    font-size: 3.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

const Img = styled.img`
  object-fit: cover;
  width: 40%;
  border-radius: 0 1rem 1rem 0;
`;
