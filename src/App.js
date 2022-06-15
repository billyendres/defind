import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useMoralis } from "react-moralis";

import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import EditUserProfile from "./pages/EditUserProfile";
import BusinessProfile from "./pages/BusinessProfile";
import EditBusinessProfile from "./pages/EditBusinessProfile";
import JobForum from "./pages/JobForum";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import Nav from "./components/Nav";
import Login from "./components/Authentication/Login";

const App = () => {
  const { isAuthenticated, authenticate, authError, isAuthenticating } =
    useMoralis();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({
        provider: "walletconnect",
        mobileLinks: ["metamask", "trust", "rainbow"],
      })
        .then(function (user) {
          console.log(user.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const ethereum = window.ethereum;

  return (
    <>
      <GloablStyle />
      {isAuthenticated ? (
        <>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/businessprofile" element={<BusinessProfile />} />
            <Route path="/edituserprofile" element={<EditUserProfile />} />
            <Route
              path="/editbusinessprofile"
              element={<EditBusinessProfile />}
            />
            <Route path="/jobforum" element={<JobForum />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </>
      ) : (
        <>
          {ethereum ? (
            <Login />
          ) : (
            <div>
              {isAuthenticating && <p>Authenticating</p>}
              {authError && <p>{JSON.stringify(authError.message)}</p>}
              <button style={{ padding: "2rem" }} onClick={login}>
                Wallet Connect
              </button>
            </div>
          )}
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
