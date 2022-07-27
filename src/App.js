import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { useMoralis } from "react-moralis";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Forum from "./pages/Forum";
import MyPosts from "./pages/MyPosts";
import Post from "./pages/Post";
import FullPost from "./pages/FullPost";
import PageNotFound from "./pages/404";
import Nav from "./components/Nav";
import Login from "./components/Authentication/Login";
import SearchProfile from "./pages/SearchProfile";
import Logout from "./components/Authentication/Logout";
import useDarkMode from "./components/Styles/useDarkMode";
import Toggle from "./components/Styles/Toggle";
import { lightTheme, darkTheme } from "./components/Styles/themes";
import PostSuccess from "./pages/PostSuccess";
import CandidatePost from "./components/Posting/CandidatePost";
import ClientPost from "./components/Posting/ClientPost";

const App = () => {
  const [theme, toggleTheme] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const {
    isAuthenticated,
    authenticate,
    authError,
    isAuthenticating,
    Moralis,
    user,
  } = useMoralis();

  const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
  const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
  Moralis.start({ serverUrl, appId });

  // const login = async () => {
  //   if (!isAuthenticated) {
  //     await authenticate({
  //       provider: "walletconnect",
  //       mobileLinks: ["metamask", "trust", "rainbow"],
  //     })
  //       .then(function (user) {
  //         console.log(user.get("ethAddress"));
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }
  // };

  // const ethereum = window.ethereum;

  return (
    <ThemeProvider theme={themeMode}>
      <GloablStyle />
      <Nav />
      {isAuthenticated ? (
        <>
          <Toggle theme={theme} toggleTheme={toggleTheme} />
          <div style={{ background: "black" }}></div>
          <Routes>
            <Route exact path="/" element={<Home />} />
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
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<FullPost />} />
            <Route
              path={`/profile/posts/${
                Moralis.User.current().attributes.ethAddress
              }`}
              element={<MyPosts />}
            />
            <Route path={`/post`} element={<Post />} />
            <Route
              path={`/post/job/${Moralis.User.current().attributes.ethAddress}`}
              element={<CandidatePost profile={false} />}
            />
            <Route
              path={`/post/candidate/${
                Moralis.User.current().attributes.ethAddress
              }`}
              element={<ClientPost profile={false} />}
            />
            <Route path="/postsuccess" element={<PostSuccess />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        <>
          <Login />
          <Toggle theme={theme} toggleTheme={toggleTheme} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/forum/:id" element={<FullPost />} />
            <Route path="/profile/:userId" element={<SearchProfile />} />
            <Route path={`/post`} element={<Post />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </ThemeProvider>
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
    max-width: 100vw;
    overflow-x: hidden;
    font-family: "Kdam Thmor Pro", sans-serif;
    letter-spacing: 1.25px;
    text-align: center;
    z-index: -1;
}

  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
