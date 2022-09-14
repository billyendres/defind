import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Links } from "../components/Styles/Links";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
          {/* <H1 className="main">{post.blogTitle}</H1> */}
          <br />
          <CardContainer
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <ProfileWrapper>
              <TextWrapper>
                <Header>{post.blogTitle}</Header>
                <Subheader>{post.blogSummary}</Subheader>

                <Text style={{ fontWeight: "bold" }}>
                  {readableDate(post.createdDate)}
                </Text>
                <Img src={post.blogImage.fields.file.url} alt="img" />

                <Text>
                  <ReactMarkdown
                    children={post.blogContentLong}
                    rehypePlugins={[rehypeRaw]}
                  />
                </Text>
                {console.log(post)}
                <Links to={`/portal`}>
                  <Return>
                    <b style={{ color: "#ff00ff" }}>{"<"} Portal</b>
                  </Return>
                </Links>
              </TextWrapper>
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
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  background: #daefff;
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
  display: flex;
  @media screen and (max-width: 1023px) {
  }
  @media screen and (max-width: 600px) {
  }
`;

const CardContainer = styled(motion.div)`
  /* overflow: hidden; */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rem;
  @media screen and (max-width: 1023px) {
    width: 40rem;
  }
  @media screen and (max-width: 750px) {
    width: 30rem;
  }
  @media screen and (max-width: 600px) {
    width: 20rem;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1023px) {
  }
  @media screen and (max-width: 600px) {
    padding: 1.25rem;
  }
`;

const Header = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 2.25rem;
  font-weight: bold;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
  }
`;

const Subheader = styled.div`
  color: #080e57;
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
`;

const Text = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding: 0;
  font-size: 1rem;
  line-height: 180%;
  white-space: pre-wrap;
  @media screen and (max-width: 1023px) {
    font-size: 0.85rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.55rem;
    line-height: 170%;
  }
`;

const Return = styled.div`
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
  font-size: 1.55rem;
  padding-left: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;

  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  @media screen and (max-width: 1023px) {
    font-size: 1.162rem;
    padding-bottom: 0.75rem;
    padding-top: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.95rem;
    /* padding-bottom: 0.5rem;
    padding-top: 0.5rem; */
  }
`;

const H1 = styled.div`
  font-family: "Russo One", sans-serif;
  text-transform: uppercase;
  font-size: 5rem;
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
    padding-left: 0.5rem;
    font-size: 3.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 3.5rem;
  }
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  /* height: 5rem; */
  padding: 1rem 0;
`;
