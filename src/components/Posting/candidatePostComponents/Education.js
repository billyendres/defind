import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const Education = ({
  onChange,
  valueOne,
  valueTwo,
  onClickOne,
  onClickTwo,
}) => {
  return (
    <div>
      <EducationWrapper>
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          key="box"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label
            onClick={onClickOne}
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
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          key="box 1"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label
            onClick={onClickTwo}
            style={{ display: "flex", cursor: "pointer" }}
          >
            <FaPlus
              size={17}
              style={{
                marginLeft: "1.25rem",
                marginRight: "0.75rem",
                marginTop: "0.1rem",
              }}
            />
            Add More
          </Label>
        </MotionDiv>
      </EducationWrapper>
      <EducationWrapper>
        <MotionDiv
          key="box 2"
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label>
            <Input
              placeholder="Course"
              name="course"
              label="course"
              value={valueOne}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
          <Label>
            <Input
              placeholder="Institution"
              name="institution"
              label="institution"
              value={valueTwo}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
        </MotionDiv>
      </EducationWrapper>
      <MotionDiv
        key="box 3"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Label>Date from - Date to</Label>
      </MotionDiv>
      <MotionDiv
        key="box 4"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Label>
          <Input
            type="date"
            name="date from"
            label="date from"
            onChange={onChange}
          />
        </Label>
        <Label>
          <Input
            type="date"
            name="date to"
            label="date to"
            onChange={onChange}
          />
        </Label>
      </MotionDiv>
    </div>
  );
};

export default Education;

const EducationWrapper = styled.div`
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
