import React from "react";
import ReactDOMClient from "react-dom/client";
import { App } from "./App";

import "./reset.scss";

const rootElement = document.getElementById("root");

const content = (
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

const root = ReactDOMClient.createRoot(rootElement);

root.render(content);
