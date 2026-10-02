import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./styles.css";
import { App } from "./App.jsx";

document.documentElement.dataset.js = "true";
document.documentElement.dataset.motionState = "off";
const root = document.getElementById("root");
const path = root.dataset.path || `${location.pathname.replace(/\/(?:index\.html)?$/, "")}/`;
const app = <React.StrictMode><App path={path}/></React.StrictMode>;
if(root.hasChildNodes()) hydrateRoot(root,app);
else createRoot(root).render(app);
