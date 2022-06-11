import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useMoralis } from "react-moralis";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import MyPosts from "./pages/MyPosts";
import Nav from "./components/Nav";
import Login from "./components/Authentication/Login";

const App = () => {
  const {
    isAuthenticated,
    authenticate,
    user,
    enableWeb3,
    isWeb3Enabled,
    authError,
    isAuthenticating,
    isWeb3EnableLoading,
  } = useMoralis();

  const walletConnectAuth = () => {
    authenticate({
      provider: "walletconnect",
      mobileLinks: [
        "rainbow",
        "metamask",
        "argent",
        "trust",
        "imtoken",
        "pillar",
      ],
      signingMessage: "Auth required",
    });
    // console.log("Authentication:", authentication);
  };

  return (
    <>
      <GloablStyle />
      {isAuthenticated ? (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/myposts" element={<MyPosts />} />
          </Routes>
        </>
      ) : (
        <>
          <Login />
          <div>
            {isAuthenticating && <p>Authenticating</p>}
            {authError && <p>{JSON.stringify(authError.message)}</p>}
            <button style={{ padding: "2rem" }} onClick={walletConnectAuth}>
              Wallet Connect
            </button>
          </div>
        </>
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
