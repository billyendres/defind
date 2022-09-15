import React from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import PageNotFound from "./pages/404";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Nav from "./components/Nav";
import Logo from "./pages/Logo";
import Footer from "./components/Home/Footer";

const App = () => {
  return (
    <>
      <GloablStyle />
      <Nav />

      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/portal" element={<Blog />} />
          <Route path="/portal/:blogId" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="unknownPage" element={<Logo />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </>
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
    background: #040010;
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    overflow-x: hidden;
    font-family: "Kdam Thmor Pro", sans-serif;
    letter-spacing: 1.25px;
    /* text-align: center; */
    z-index: -1;

}

img {

  }

  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
