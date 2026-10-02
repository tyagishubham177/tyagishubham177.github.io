import {readFile,writeFile,mkdir} from "node:fs/promises";
import {join} from "node:path";
import {routes,render} from "../dist/ssr/entry-server.js";

const dir="dist/client";
const template=await readFile(join(dir,"index.html"),"utf8");
const escape=value=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
for(const route of routes){
  const canonical=`https://tyagishubham177.github.io${route.path}`;
  let html=template.replace(/<title>.*?<\/title>/s,`<title>${escape(route.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(route.description)}" />`)
    .replace(/<div id="root"><\/div>/,`<div id="root" data-path="${route.path}">${render(route.path)}</div>`)
    .replace(/<\/head>/,`<link rel="canonical" href="${canonical}" /><meta property="og:title" content="${escape(route.title)}" /><meta property="og:description" content="${escape(route.description)}" /><meta property="og:url" content="${canonical}" /></head>`);
  if(!html.includes('data-path='))throw Error(`Failed to prerender ${route.path}`);
  const target=route.path==='/404/'?join(dir,'404.html'):join(dir,route.path.slice(1),'index.html');
  await mkdir(join(target,'..'),{recursive:true});
  await writeFile(target,html);
  console.log(`Pre-rendered ${route.path}`);
}
await writeFile(join(dir,'.nojekyll'),'');
await writeFile(join(dir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.filter(r=>r.path!='/404/').map(r=>`<url><loc>https://tyagishubham177.github.io${r.path}</loc></url>`).join('')}</urlset>`);
await writeFile(join(dir,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://tyagishubham177.github.io/sitemap.xml\n');
