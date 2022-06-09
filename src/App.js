import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Nav from "./components/Nav";
import Login from "./components/Authentication/Login";
import { useMoralis } from "react-moralis";

const App = () => {
  const { isAuthenticated, Moralis } = useMoralis();

  return (
    <>
      <Nav />
      <GloablStyle />
      {isAuthenticated ? (
        <>
          <div
            onClick={() => {
              Moralis.User.logOut().then(() => {
                window.location.reload();
              });
            }}
          >
            Logout
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </>
      ) : (
        <div style={{ width: "50vw", position: "fixed", top: 0, right: 0 }}>
          <Login />
        </div>
      )}
    </>
  );
};

export default App;

const GloablStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    color: #fff;
    font-family: 'Nunito', sans-serif;
    text-align: center;
    background: black;
    z-index: -1;
}

  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
