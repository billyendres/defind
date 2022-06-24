import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
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
      <div>
        <EducationWrapper>
          <AnimatePresence>
            <motion.div
              style={{ display: "flex", flexWrap: "wrap" }}
              key="box"
              initial={{ y: "50%", opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{
                x: "100%",
                opacity: 0,
                transition: { duration: 0.2 },
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
          </AnimatePresence>
        </EducationWrapper>
        <Label>Date from - Date to</Label>
        <div style={{ display: "flex" }}>
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
        </div>
      </div>
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
