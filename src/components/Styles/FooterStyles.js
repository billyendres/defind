import React from "react";
import styled from "styled-components";
import { FaTwitter, FaPhoneAlt } from "react-icons/fa";
import ButtonSmall from "./ButtonSmall";
import { Links } from "./Links";

export const Twitter = () => {
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

export const Contact = () => {
  return (
    <Wrapper>
      <>
        <div>
          <Links to="/contact">
            <Icons>
              <ButtonSmall
                text={<FaPhoneAlt style={{ marginBottom: "-0.15rem" }} />}
              />
            </Icons>
          </Links>
        </div>
      </>
    </Wrapper>
  );
};

const Icons = styled.div`
  transition: all 0.5s linear;
  color: #daefff;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
`;

const Wrapper = styled.div``;
