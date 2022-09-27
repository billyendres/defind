import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Home from "./pages/Home";
import PageNotFound from "./pages/404";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BlogPost from "./pages/BlogPost";
import Nav from "./components/Nav";
import Logo from "./pages/Logo";
import Footer from "./components/Home/Footer";
import { useLocation } from "react-router-dom";
import Phatt from "./fonts/Phatt.ttf";

const App = () => {
  const location = useLocation();

  // useEffect(() => {
  //   window.gtag("event", "page_view", {
  //     page_path: location.pathname + location.search + location.hash,
  //     page_search: location.search,
  //     page_hash: location.hash,
  //   });
  // }, [location]);

  return (
    <>
      <GloablStyle />
      <Nav />

      <>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/:blogId" element={<BlogPost />} />
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
    background: #daefff;
    display: flex;
    flex-direction: column;
    width: auto;
    font-family: "Kdam Thmor Pro", sans-serif;
    letter-spacing: 1.25px;
    overflow-x: hidden;
    @media screen and (min-width: 1023px) {
    }
}

@font-face {
  font-family: 'Phatt';
  src: url(${Phatt});
}
  ul,
  li {
    margin: 0;
    padding: 0;
  }
`;
