import React from "react";
import { useMoralis } from "react-moralis";

const Logout = () => {
  const { Moralis } = useMoralis();

  return (
    <div>
      <button
        onClick={() => {
          Moralis.User.logOut().then(() => {
            window.location.reload();
          });
        }}
      >
        <h1>Logout</h1>
      </button>
    </div>
  );
};

export default Logout;
