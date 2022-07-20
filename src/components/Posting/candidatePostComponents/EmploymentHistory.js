import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus, FaMinus, FaLaptopCode } from "react-icons/fa";

export const EmploymentHistory = ({
  onChange,
  valueOne,
  valueTwo,
  valueThree,
  onClickOne,
  onClickTwo,
}) => {
  return (
    <div>
      <EmploymentWrapper>
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
      </EmploymentWrapper>
      <EmploymentWrapper>
        <MotionDiv
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
        >
          <Label>
            <Input
              placeholder="Job Title"
              name="jobTitle"
              label="jobTitle"
              value={valueOne}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
          <Label>
            <Input
              placeholder="Company"
              name="company"
              label="company"
              value={valueTwo}
              maxLength="50"
              onChange={onChange}
            />
          </Label>
        </MotionDiv>
      </EmploymentWrapper>
      <MotionDiv
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Textarea
          placeholder="Summarise your responsibilities, skills and achievements."
          value={valueThree}
          onChange={onChange}
          name="description"
          label="description"
          maxLength="1000"
        />
      </MotionDiv>
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
    </div>
  );
};

export const AddEmploymentHistory = ({ onClick }) => {
  return (
    <div style={{ display: "flex", cursor: "pointer", alignItems: "center" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <SubHeader>
          <FaLaptopCode
            style={{
              marginRight: "0.5rem",
            }}
          />
          <span onClick={onClick}>Add Employment History</span>
        </SubHeader>
      </motion.div>
    </div>
  );
};

export const EmploymentHistoryAdded = () => {
  return (
    <SubHeader style={{ paddingBottom: "0.5rem" }}>
      <FaLaptopCode
        style={{
          marginRight: "0.5rem",
        }}
      />
      Employment History
    </SubHeader>
  );
};

const EmploymentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
  justify-content: flex-start;
  color: ${({ theme }) => theme.textModals};
  transition: all 0.5s linear;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  font-family: "Kdam Thmor Pro", sans-serif;
  max-width: 37rem;
  min-width: 37rem;
  max-height: 12rem;
  margin-top: 1rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
  @media screen and (max-width: 1023px) {
    max-width: 29rem;
    min-width: 29rem;
    max-height: 9rem;
    font-size: 0.75rem;
  }
  @media screen and (max-width: 600px) {
    max-width: 16rem;
    min-width: 16rem;
    max-height: 5rem;
    font-size: 0.75rem;
    margin-top: 0.75rem;
  }
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
