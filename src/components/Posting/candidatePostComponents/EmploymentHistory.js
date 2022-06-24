import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const EmploymentHistory = ({
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
        <motion.div
          style={{ display: "flex", flexWrap: "wrap" }}
          key="box"
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
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
            <Label
              onClick={onClickOne}
              style={{ display: "flex", cursor: "pointer" }}
            >
              <FaMinus
                size={20}
                style={{
                  marginLeft: "0.75rem",
                  marginRight: "0.75rem",
                  marginTop: "0.5rem",
                }}
              />
            </Label>
          </motion.div>
          <motion.div whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.8 }}>
            <Label
              onClick={onClickTwo}
              style={{ display: "flex", cursor: "pointer" }}
            >
              <FaPlus
                size={20}
                style={{
                  marginLeft: "0.75rem",
                  marginTop: "0.5rem",
                }}
              />
            </Label>
          </motion.div>
        </motion.div>
      </EmploymentWrapper>
      <motion.div
        style={{ display: "flex", flexWrap: "wrap" }}
        key="box"
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
      </motion.div>
    </div>
  );
};

export default EmploymentHistory;

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
