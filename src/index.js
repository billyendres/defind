import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>
);
