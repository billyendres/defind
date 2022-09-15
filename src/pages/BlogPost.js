import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Links } from "../components/Styles/Links";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { FaTwitter } from "react-icons/fa";
import { useSinglePost } from "../components/custom-hooks/useSinglePost";
import LoadingSpinner from "../components/Styles/LoadingSpinner";

const readableDate = (dateString) => new Date(dateString).toDateString();

const BlogPost = () => {
  const { blogId } = useParams();
  const [post, isLoading] = useSinglePost(blogId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderPost = () => {
    if (isLoading) return <LoadingSpinner />;
    return (
      <Wrapper>
        <Grid>
          {/* <H1 className="main">{post.blogTitle}</H1> */}
          <br />
          <CardContainer>
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
                  {/* <table style="width: 100%;">
                    <thead style="text-align: center;">
                      <td style="border: 2px solid #54CAE9; width: 50%; font-weight:  bold;">
                        Pros
                      </td>
                      <td style="border: 2px solid #ff00ff; width: 50%; font-weight:  bold;">
                        Cons
                      </td>
                    </thead>
                    <tbody style="text-align: center;">
                      <tr>
                        <td>Sue</td>
                        <td>00002</td>
                      </tr>
                      <tr>
                        <td>Barb</td>
                        <td>00003</td>
                      </tr>
                      <tr>
                        <td>Barb</td>
                      </tr>
                    </tbody>
                  </table> */}
                </Text>
                <Links to={`/portal`}>
                  <Return>
                    <b style={{ color: "#ff00ff" }}>{"<"} Portal</b>
                  </Return>
                </Links>
                <div
                  style={{
                    display: "flex",
                    marginTop: "0.5rem",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Tweet
                    type="button"
                    role="button"
                    title="Share"
                    href={`https://twitter.com/intent/tweet?url=https://defind.tech/portal/${post.slug}&text=${post.blogTitle}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FaTwitter />
                  </Tweet>
                </div>
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
  color: #080e57;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 2.25rem;
  font-weight: bold;
  @media screen and (max-width: 1023px) {
    font-size: 1.75rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }
`;

const Subheader = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding-bottom: 0.75rem;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.1rem;
    padding-bottom: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.9rem;
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
  font-size: 2rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
`;
