import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
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
import Logout from "./components/Authentication/Logout";
import useDarkMode from "./components/Styles/useDarkMode";
import Toggle from "./components/Styles/Toggle";

const App = () => {
  const [theme, toggleTheme] = useDarkMode();

  const lightTheme = {
    backgroundHome: "#fff",
    textHome: "#080e57",
    backgroundNav: "inherit",
    textNav: "#080e57",
    backgroundProfile: "#a06ecc",
    textProfile: "#080e57",
    backgroundPost: "#ffffba",
    textPost: "#080e57",
    backgroundJobForum: "#57f7ac",
    textJobForum: "#fff",
    profileWrapperJobForum: "#080e57",
    backgroundProfilePosts: "#bae1ff",
    backgroundEditProfile: "#1987fe",
    textEditProfile: "#080e57",
    backgroundUsersProfile: "#03fcec",
    textUsersProfile: "#fff",
    profileWrapperUsersProfile: "#080e57",
    backgroundFullPost: "#f57971",
    textFullPost: "#fff",
    profileWrapperFullPost: "#080e57",
  };

  const darkTheme = {
    backgroundHome: "#080e57",
    textHome: "#fff",
    backgroundNav: "#080e57",
    textNav: "#fff",
    backgroundProfile: "#080e57",
    textProfile: "#fff",
    backgroundPost: "#080e57",
    textPost: "#fff",
    backgroundJobForum: "#080e57",
    textJobForum: "#080e57",
    profileWrapperJobForum: "#fff",
    backgroundProfilePosts: "#080e57",
    backgroundEditProfile: "#080e57",
    textEditProfile: "#fff",
    backgroundUsersProfile: "#080e57",
    textUsersProfile: "#080e57",
    profileWrapperUsersProfile: "#fff",
    backgroundFullPost: "#080e57",
    textFullPost: "#080e57",
    profileWrapperFullPost: "#fff",
  };
  const themeMode = theme === "light" ? lightTheme : darkTheme;

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
    <ThemeProvider theme={themeMode}>
      <GloablStyle />
      {isAuthenticated ? (
        <>
          <Toggle theme={theme} toggleTheme={toggleTheme} />
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
          <Logout />
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
    /* color: #fff; */
    font-family: 'Nunito', sans-serif;
    text-align: center;
    z-index: -1;
    /* padding-top: 7rem; */
}

  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
