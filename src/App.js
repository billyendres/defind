import React from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
// import Navbar from "./components/Navbar";
import Nav from "./components/Nav";

const App = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Nav />
      <GloablStyle />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
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
    /* padding: 0 1rem; */
    background: black;
    z-index: -1;

    /* @media screen and (min-width: 768px) {
      padding: 0 1.5rem;
    }

    @media screen and (min-width: 1200px) {
      padding: 0 2rem;
    } */
}

  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
