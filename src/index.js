import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import GA4React from "ga-4-react";

// try {
//   setTimeout((_) => {
//     const ga4react = new GA4React("G-ZNQRP4E5B1");
//     ga4react.initialize().catch((err) => console.error(err));
//   }, 4000);
// } catch (err) {
//   console.error(err);
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
