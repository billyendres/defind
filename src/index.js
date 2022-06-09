import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const appId = "GSrWtKUJMvKFYnc4nQzMaZVbAt5oiAKZKPHNuNAl";
const serverUrl = "https://5hx2kygmzsxo.usemoralis.com:2053/server";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>
);
