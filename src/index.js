import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";

const appId = "jwHhKFRXPRDeMkXZ2M9Nurb343UDcFcGsXcMdWBE";
const serverUrl = "https://tqqqo0mru2bn.usemoralis.com:2053/server";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MoralisProvider>
);
