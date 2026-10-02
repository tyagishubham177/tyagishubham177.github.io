import React from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App.jsx";
import { studies } from "./case-studies.js";

export const routes = [
  {path:"/",title:"Shubham Tyagi — Product Portfolio",description:"Healthcare product stories, technical leadership and useful things built by Shubham Tyagi."},
  {path:"/work/",title:"Product Work — Shubham Tyagi",description:"Detailed hospital digitalisation, vascular-access and diabetes companion product case studies."},
  ...studies.map(study=>({path:`/work/${study.slug}/`,title:`${study.shortTitle} — Shubham Tyagi`,description:study.description})),
  {path:"/about/",title:"About — Shubham Tyagi",description:"Engineering and technical leadership experience moving towards product management."},
  {path:"/build-lab/",title:"Build Lab — Shubham Tyagi",description:"Public code projects and an in-progress AI document-triage product exploration."},
  {path:"/404/",title:"Page Not Found — Shubham Tyagi",description:"Find Shubham Tyagi’s product work and portfolio."}
];
export function render(path){return renderToString(<App path={path}/>)}
