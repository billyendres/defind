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
            style={{ display: "flex", cursor: "pointer" }}
          >
            <FaMinus
              size={17}
              style={{
                marginRight: "0.75rem",
                marginTop: "0.2rem",
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
              maxLength="20"
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
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Subheader>
          <FaPhone
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.25rem",
            }}
          />
          <span onClick={onClick}>Add Contact Information</span>
        </Subheader>
      </motion.div>
    </div>
  );
};

export const ContactAdded = () => {
  return (
    <Subheader style={{ paddingBottom: "0.5rem" }}>
      <FaPhone
        size={30}
        style={{
          marginRight: "0.5rem",
          marginBottom: "-0.25rem",
        }}
      />
      Contact Information
    </Subheader>
  );
};

const ContactWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: flex-start;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;

const Label = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #080e57;
  width: 12rem;
  letter-spacing: 2px;
  margin-right: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
`;

const MotionDiv = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
`;

const Subheader = styled.div`
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
  font-size: 1.25rem;
  padding: 1.25rem 0;
`;
