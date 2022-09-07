import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPhone, FaMinus } from "react-icons/fa";

export const Contact = ({
  onChange,
  valueOne,
  valueTwo,
  valueThree,
  valueFour,
  valueFive,
  valueSix,
  onClick,
}) => {
  return (
    <div>
      <ContactWrapper>
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          key="box"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label
            onClick={onClick}
            style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
          >
            <FaMinus
              style={{
                marginRight: "0.5rem",
              }}
            />
            Remove
          </Label>
        </MotionDiv>
      </ContactWrapper>
      <ContactWrapper>
        <MotionDiv
          key="box 2"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label>
            <Input
              type="email"
              placeholder="Email"
              name="email"
              label="email"
              value={valueOne}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
          <Label>
            <Input
              type="tel"
              placeholder="Phone"
              name="phone"
              label="phone"
              value={valueTwo}
              maxLength="20"
              onChange={onChange}
            />
          </Label>
        </MotionDiv>
      </ContactWrapper>
      <ContactWrapper>
        <MotionDiv
          key="box 3"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label>
            <Input
              type="text"
              placeholder="Twitter"
              name="twitter"
              label="twitter"
              value={valueThree}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
          <Label>
            <Input
              type="url"
              placeholder="Github"
              name="github"
              label="github"
              value={valueFour}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
        </MotionDiv>
      </ContactWrapper>
      <ContactWrapper>
        <MotionDiv
          key="box 3"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label>
            <Input
              type="text"
              placeholder="Telegram"
              name="telegram"
              label="telegram"
              value={valueFive}
              maxLength="30"
              onChange={onChange}
            />
          </Label>
          <Label>
            <Input
              type="url"
              placeholder="Website"
              name="website"
              label="website"
              value={valueSix}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
        </MotionDiv>
      </ContactWrapper>
    </div>
  );
};

export const AddContact = ({ onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer", alignItems: "center" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <SubHeader>
          <FaPhone
            style={{
              marginRight: "0.5rem",
            }}
          />
          <span onClick={onClick}>Add Contact Information</span>
        </SubHeader>
      </motion.div>
    </div>
  );
};

export const ContactAdded = () => {
  return (
    <SubHeader style={{ paddingBottom: "0.5rem" }}>
      <FaPhone
        style={{
          marginRight: "0.5rem",
        }}
      />
      Contact Information
    </SubHeader>
  );
};

const ContactWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: flex-start;
  color: #080e57;
  transition: all 0.5s linear;
`;

const Label = styled.div`
  padding: 0.5rem 0 0 0;
  color: #080e57;
  transition: all 0.5s linear;
  font-size: 1.25rem;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const Input = styled.input`
  font-family: "Kdam Thmor Pro", sans-serif;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  width: 12rem;
  margin-right: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.75rem;
  }
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
`;

const SubHeader = styled.div`
  color: #080e57;
  transition: all 0.5s linear;
  padding: 1rem 0;
  font-size: 1.5rem;
  @media screen and (max-width: 1023px) {
    font-size: 1.25rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
`;
