import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useMoralis } from "react-moralis";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import JobForum from "./pages/JobForum";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import FullPost from "./pages/FullPost";
import Nav from "./components/Nav";
import Login from "./components/Authentication/Login";
import SearchProfile from "./pages/SearchProfile";

const App = () => {
  const {
    isAuthenticated,
    authenticate,
    authError,
    isAuthenticating,
    Moralis,
  } = useMoralis();

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
            <Route
              path={`/profile/${Moralis.User.current().attributes.ethAddress}`}
              element={<Profile />}
            />
            <Route path="/profile/:userId" element={<SearchProfile />} />
            <Route
              path={`/profile/edit/${
                Moralis.User.current().attributes.ethAddress
              }`}
              element={<EditProfile />}
            />
            <Route path="/jobforum" element={<JobForum />} />
            <Route path="/jobforum/:id" element={<FullPost />} />
            <Route
              path={`/profile/posts/${
                Moralis.User.current().attributes.ethAddress
              }`}
              element={<MyPosts />}
            />
            <Route
              path={`/newpost/${Moralis.User.current().attributes.ethAddress}`}
              element={<Post />}
            />
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
