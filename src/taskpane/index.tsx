import React from "react";
import App from "./components/App";
import { createRoot } from "react-dom/client";

/* global document, Office */

const title = "Contoso Task Pane Add-in";
const rootElement: HTMLElement | null = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
      <React.StrictMode>
        <App title={title} />
      </React.StrictMode>
  );
});