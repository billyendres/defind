import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Links } from "../components/Styles/Links";
import Button from "../components/Styles/Button";
import { useSinglePost } from "../components/custom-hooks/useSinglePost";
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

const BlogPost = () => {
  const { blogId } = useParams();
  const [post, isLoading] = useSinglePost(blogId);

  const renderPost = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <Wrapper>
        <Grid>
          <H1 className="main">{post.blogTitle}</H1>
          <br />
          <CardContainer
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
                {console.log(post)}
                {/* <img src={post.blogImage.fields.file.url} alt="img" /> */}

                <Header>{post.blogTitle}</Header>
                <Text>{post.blogAuthor}</Text>
                <Text>{readableDate(post.createdDate)}</Text>

                <Links to={`/portal`}>
                  <Button text="Return" />
                </Links>
              </div>
            </ProfileWrapper>
          </CardContainer>
        </Grid>
      </Wrapper>
    );
  };
  return <>{renderPost()}</>;
};

export default BlogPost;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #040010;
  padding-bottom: 2rem;
  min-height: 100vh;
`;

const Grid = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  @media screen and (max-width: 600px) {
    grid-gap: 1.5rem;
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
  width: 43rem;
  padding: 2.5rem;
  border-radius: 1rem;
  background-color: #daefff;
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

const H4 = styled.div`
  display: flex;
  align-items: center;
  font-family: "Kdam Thmor Pro", sans-serif;
  font-size: 1.25rem;
  padding-left: 1rem;
  width: 35rem;
  color: #daefff;
  @media screen and (max-width: 1023px) {
    padding-left: 0.5rem;
    font-size: 1.15rem;
    width: 27rem;
  }
  @media screen and (max-width: 600px) {
    width: 22rem;
    font-size: 1rem;
  }
`;

const Bold = styled.b`
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-left: 1rem;
  margin-right: 1rem;
  @media screen and (max-width: 1023px) {
    margin-left: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    margin-left: 0.5rem;
  }
`;
