import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./styles.css";

document.documentElement.dataset.js = "true";
const root = document.getElementById("root");
const path = root.dataset.path || `${location.pathname.replace(/\/(?:index\.html)?$/, "")}/`;
const app = <React.StrictMode><App path={path}/></React.StrictMode>;
if(root.hasChildNodes()) hydrateRoot(root,app);
else createRoot(root).render(app);
