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
      </EmploymentWrapper>
      <EmploymentWrapper>
        <MotionDiv
          key="box 2"
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
        key="box 3"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Textarea
          placeholder="Summarise your responsibilities, skills and achievements."
          style={{ padding: "1rem" }}
          value={valueThree}
          onChange={onChange}
          name="description"
          label="description"
        />
      </MotionDiv>
      <MotionDiv
        key="box 4"
        initial={{ y: "50%", opacity: 0, scale: 0.5 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
      >
        <Label>Date from - Date to</Label>
      </MotionDiv>
      <MotionDiv
        key="box 5"
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
    <div style={{ display: "flex", cursor: "pointer" }}>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Subheader>
          <FaLaptopCode
            size={30}
            style={{
              marginRight: "0.5rem",
              marginBottom: "-0.25rem",
            }}
          />
          <span onClick={onClick}>Add Employment History</span>
        </Subheader>
      </motion.div>
    </div>
  );
};

export const EmploymentHistoryAdded = () => {
  return (
    <Subheader style={{ paddingBottom: "0.5rem" }}>
      <FaLaptopCode
        size={30}
        style={{
          marginRight: "0.5rem",
          marginBottom: "-0.25rem",
        }}
      />
      Employment History
    </Subheader>
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
  font-family: "Kdam Thmor Pro", sans-serif;
  color: #080e57;
  letter-spacing: 2px;
  max-width: 37rem;
  min-width: 37rem;
  max-height: 15rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
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
