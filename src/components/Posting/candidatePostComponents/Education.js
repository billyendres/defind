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
        <MotionDiv
          whileHover={{ scale: 1.05 }}
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label
            onClick={onClickTwo}
            style={{ display: "flex", cursor: "pointer", alignItems: "center" }}
          >
            <FaPlus
              style={{
                marginLeft: "1rem",
                marginRight: "0.5rem",
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
        style={{ marginBottom: "1rem" }}
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
        <SubHeader>
          <FaUserGraduate
            style={{
              marginRight: "0.5rem",
            }}
          />
          <span onClick={onClick}>Add Education</span>
        </SubHeader>
      </motion.div>
    </div>
  );
};

export const EducationAdded = () => {
  return (
    <SubHeader style={{ paddingBottom: "0.5rem" }}>
      <FaUserGraduate
        style={{
          marginRight: "0.5rem",
        }}
      />
      Education
    </SubHeader>
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
  padding: 0.5rem 0 0 0;
  color: ${({ theme }) => theme.textModals};
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
  color: ${({ theme }) => theme.textModals};
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
