import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Styles/Button";
import {
  FaRegHandPointLeft,
  FaRegThumbsUp,
  FaSpinner,
  FaRegThumbsDown,
} from "react-icons/fa";

const CustomForm = ({ status, onValidated }) => {
  const [email, setEmail] = useState("");
  const [buttonStatus, setButtonStatus] = useState(
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <FaRegHandPointLeft style={{ marginRight: "0.5rem" }} />
      you do you
    </div>
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    const subscribe = () => {
      if (status === "sending") {
        setButtonStatus(
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaSpinner
              style={{ marginRight: "0.5rem", marginBottom: "-0.15rem" }}
            />
            Loading
          </div>
        );
      }
      if (status === "error") {
        setButtonStatus(
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaRegThumbsDown
              style={{ marginRight: "0.5rem", marginBottom: "-0.15rem" }}
            />
            Nope, wrong email :/
          </div>
        );
        setTimeout(() => {
          setButtonStatus(
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <FaRegHandPointLeft style={{ marginRight: "0.5rem" }} />
              you do you
            </div>
          );
        }, [3000]);
      }
      if (status === "success") {
        setButtonStatus(
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaRegThumbsUp style={{ marginRight: "0.5rem" }} />
            All done, cheers :D
          </div>
        );
        setEmail("");
      }
    };
    subscribe();
  }, [status]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Label style={{ display: "flex", alignItems: "center" }}>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="subscribe-or-don't@dm.me"
          required={true}
          maxLength="40"
          type="email"
          value={email}
        />
        <Button type="submit" text={buttonStatus} />
      </Label>
    </form>
  );
};

export default CustomForm;

const Label = styled.div`
  padding: 0.5rem 0.75rem;
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
  width: 17rem;
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
    padding: 0.35rem;
    width: 13rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 0.55rem;
    padding: 0.3rem;
    width: 10rem;
  }
`;
