import React from "react";
import styled from "styled-components";
import { FaTwitter } from "react-icons/fa";
import ButtonSmall from "./ButtonSmall";

const Twitter = () => {
  return (
    <Wrapper>
      <>
        <div>
          <a
            href="https://twitter.com/defind_web3"
            alt="DeFind Twitter"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icons>
              <ButtonSmall
                text={<FaTwitter style={{ marginBottom: "-0.15rem" }} />}
              />
            </Icons>
          </a>
        </div>
      </>
    </Wrapper>
  );
};

export default Twitter;

const Icons = styled.div`
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
