import React, { useState } from "react";
import styled from "styled-components";

const Post = () => {
  const [postType, setPostType] = useState(true);

  return (
    <div>
      <h2>Post</h2>
      <h2>I am a</h2>
      <button onClick={() => setPostType(true)}>Job Seeker Post</button>
      <button onClick={() => setPostType(false)}>Employer Post</button>
      {postType ? <h3>Job Seeker Post</h3> : <h3>Employer post</h3>}
    </div>
  );
};

export default Post;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
`;

const Container = styled.div``;
