import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Twitter = () => {
  return (
    <Wrapper>
      <>
        <div>
          <a
            href="https://twitter.com/billy_3nd"
            alt="DeFind Twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons>
              <LinkHeaders>
                <FaTwitter style={{ marginBottom: "-0.2rem" }} />
              </LinkHeaders>
            </Icons>
          </a>
        </div>
      </>
    </Wrapper>
  );
};

export default Twitter;

const Icons = styled.h2`
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.icon};
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`;

const Wrapper = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0;
  bottom: 0;
`;

const LinkHeaders = styled.div`
  padding: 0.2rem 0.6rem;
  margin: 1rem 0.5rem;
  border-radius: 50%;
  font-size: 1.5rem;
  transition: all 0.5s linear;
  color: ${({ theme }) => theme.textModals};
  background: ${({ theme }) => theme.button};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }

  @media screen and (max-width: 600px) {
    margin: 0.5rem;
    font-size: 1rem;
    padding: 0.2rem 0.4rem;
  }
`;
