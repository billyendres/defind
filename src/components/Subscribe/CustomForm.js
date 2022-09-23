import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";

const CustomForm = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setEmail("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {status === "sending" && <Label>sending...</Label>}
      {status === "error" && (
        <Label dangerouslySetInnerHTML={{ __html: message }} />
      )}
      {status === "success" && (
        <Label dangerouslySetInnerHTML={{ __html: message }} />
      )}
      <Label style={{ display: "flex", alignItems: "center" }}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="subscribe@email.com"
          required={true}
          maxLength="40"
          type="email"
        />
        <Button type="submit" text="Subscribe" />
      </Label>
    </form>
  );
};

export default CustomForm;

const Label = styled.div`
  padding: 0.5rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: #daefff;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1023px) {
    font-size: 1rem;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #080e57;
  font-family: "Kdam Thmor Pro", sans-serif;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #080e57;
    opacity: 0.5;
  }
  @media screen and (max-width: 1023px) {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
`;
