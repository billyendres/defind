import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Links } from "../components/Styles/Links";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FaTwitter, FaLink, FaCheck } from "react-icons/fa";
import { useSinglePost } from "../components/custom-hooks/useSinglePost";
import LoadingSpinner from "../components/Styles/LoadingSpinner";
import Button from "../components/Styles/Button";
import { Helmet } from "react-helmet";

const readableDate = (dateString) => new Date(dateString).toDateString();

const BlogPost = () => {
  const { blogId } = useParams();
  const [post, isLoading] = useSinglePost(blogId);
  const [copied, setCopied] = useState(false);

  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  window.twttr.widgets.load();

  const renderPost = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <Wrapper>
        <CardContainer>
          <ProfileWrapper>
            <TextWrapper>
              <Header>{post.blogTitle}</Header>
              <Text id="twitter-wjs">{readableDate(post.createdDate)}</Text>
              <Img src={post.blogImage.fields.file.url} alt="img" />
              <Subheader>{post.blogSummary}</Subheader>

              <Text>
                <ReactMarkdown
                  children={post.blogContentLong}
                  rehypePlugins={[rehypeRaw]}
                />
              </Text>
              <Links to={`/`}>
                <Return>
                  <b style={{ color: "#ff00ff" }}>{"<"} I'm done here</b>
                </Return>
              </Links>
              <div
                style={{
                  display: "flex",
                  marginTop: "0.5rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Tweet
                  type="button"
                  role="button"
                  title="Share"
                  href={`https://twitter.com/intent/tweet?url=https%3A%2F%2Fworldsworstcryptoblog.com/${post.slug}&text=${post.twitterTitle}%20(via%20%40worstcryptoblog) `}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaTwitter />
                </Tweet>
                <CopyLink onClick={copy}>
                  {!copied ? <FaLink /> : <FaCheck />}
                </CopyLink>
              </div>
            </TextWrapper>
          </ProfileWrapper>
        </CardContainer>
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

  @media screen and (max-width: 1023px) {
    padding-top: 5rem;
  }
  @media screen and (max-width: 600px) {
    padding-top: 4rem;
  }
`;

const CardContainer = styled.div`
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
    /* padding: 1.25rem; */
  }
`;

const Header = styled.div`
  font-family: "Russo One", sans-serif;
  background: -webkit-linear-gradient(45deg, #31f2e4, #ff00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 2.75rem;
  font-weight: bold;
  @media screen and (max-width: 1023px) {
    font-size: 2.25rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5em;
    padding-bottom: 0.5rem;
  }
`;

const Subheader = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;

  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
    padding-bottom: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding-bottom: 1.5rem;
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
    font-size: 0.9rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
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

const Tweet = styled.a`
  padding-top: 0.25rem;
  color: #080e57;
  text-decoration: none;
  cursor: pointer;
  margin: 0 0.5rem;
  &:hover {
    color: #ff00ff;
  }
  font-size: 2rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
  }
`;

const CopyLink = styled.a`
  padding-top: 0.25rem;
  color: #080e57;
  text-decoration: none;
  cursor: pointer;
  font-size: 2rem;
  margin: 0 0.5rem;
  &:hover {
    color: #ff00ff;
  }
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.25rem;
  }
`;
