import React from "react";
import styled from "styled-components";

const Post = () => {
  return (
    <Wrapper>
      <h1>hkh</h1>
    </Wrapper>
  );
};

export default Post;

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background: ${({ theme }) => theme.background};
  transition: all 0.5s linear;
`;
