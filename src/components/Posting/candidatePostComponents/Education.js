import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaUserGraduate } from "react-icons/fa";

export const Education = ({
  onChange,
  valueOne,
  valueTwo,
  onClickOne,
  onClickTwo,
}) => {
  return (
    <>
      <EducationWrapper>
        <MotionDiv
          whileHover={{ scale: 1.05 }}
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
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Label>Date from - Date to</Label>
      </MotionDiv>
      <MotionDiv
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Label>
          <Input
            type="date"
            name="dateFrom"
            label="dateFrom"
            onChange={onChange}
          />
        </Label>
        <Label>
          <Input type="date" name="dateTo" label="dateTo" onChange={onChange} />
        </Label>
      </MotionDiv>
    </>
  );
};

export const AddEducation = ({ onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Subheader>
          <FaUserGraduate
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.25rem",
            }}
          />
          <span onClick={onClick}>Add Education</span>
        </Subheader>
      </motion.div>
    </div>
  );
};

export const EducationAdded = () => {
  return (
    <Subheader style={{ paddingBottom: "0.5rem" }}>
      <FaUserGraduate
        size={30}
        style={{
          marginRight: "0.5rem",
          marginBottom: "-0.25rem",
        }}
      />
      Education
    </Subheader>
  );
};

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
  color: #080e57;
  width: 12rem;
  /* letter-spacing: 2px; */
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
