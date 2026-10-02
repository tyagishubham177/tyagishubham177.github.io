import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {studies,pathForStudy} from '../src/case-studies.js';

const routes=['/','/work/','/about/','/build-lab/',...studies.map(pathForStudy)];
const fileFor=path=>new URL(`../dist/client${path}index.html`,import.meta.url);
test('every public route has full static HTML and unique metadata',async()=>{
 const titles=new Set();
 for(const path of routes){
  const html=await readFile(fileFor(path),'utf8');
  assert.match(html,/<h1[\s>]/);
  assert.match(html,new RegExp(`data-path="${path}"`));
  assert.ok(html.includes(`rel="canonical" href="https://tyagishubham177.github.io${path}"`));
  assert.equal((html.match(/property="og:title"/g)||[]).length,1);
  const title=html.match(/<title>(.*?)<\/title>/s)[1];assert.ok(!titles.has(title));titles.add(title);
 }
});
test('case studies contain all chapters before JavaScript runs',async()=>{
 for(const study of studies){const html=await readFile(fileFor(pathForStudy(study)),'utf8');
  for(const section of study.sections)assert.ok(html.includes(`id="${section.id}"`),`${study.slug}: ${section.id}`);
  assert.ok(html.includes('Evidence boundary'));assert.ok(html.includes('reconstruction')||html.includes('reconstructed'));
  const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
  for(const section of study.sections){
   for(const paragraph of section.paragraphs)assert.ok(html.includes(escape(paragraph)),`${study.slug}: missing paragraph in ${section.id}`);
   if(section.table)for(const row of section.table.rows)for(const cell of row)assert.ok(html.includes(escape(cell)),`${study.slug}: missing table content`);
  }
 }
});
test('internal page links resolve to real files rather than an SPA fallback',async()=>{
 for(const path of routes){const html=await readFile(fileFor(path),'utf8');
  for(const match of html.matchAll(/href="(\/[^"?#]*)(?:[^" ]*)?"/g)){
   const target=match[1];if(target.startsWith('//')||target.startsWith('/assets/'))continue;
   await access(fileFor(target));
  }
 }
});
test('static 404, sitemap and no-Jekyll marker are generated',async()=>{
 const html=await readFile(new URL('../dist/client/404.html',import.meta.url),'utf8');assert.ok(html.includes('This page isn’t here.'));
 await access(new URL('../dist/client/.nojekyll',import.meta.url));
 const map=await readFile(new URL('../dist/client/sitemap.xml',import.meta.url),'utf8');for(const path of routes)assert.ok(map.includes(`https://tyagishubham177.github.io${path}`));
});
test('source content does not resurrect retired claims or PM job titles',()=>{
 assert.equal(studies[0].role,'Technical Lead · HCLTech');assert.ok(studies[1].role.startsWith('Lead Developer'));assert.ok(studies[2].role.startsWith('Software Engineer II'));
 const content=JSON.stringify(studies);assert.ok(!content.includes('increased retention by'));assert.ok(!content.includes('statistically significant'));
 assert.ok(studies[0].sections.find(s=>s.id==='decisions').note.includes('removed'));
});
test('sculptural layouts preserve static content, navigation and conceptual labels',async()=>{
 const home=await readFile(fileFor('/'),'utf8');
 for(const variant of ['hero','hospital','platform','engagement'])assert.ok(home.includes(`data-variant="${variant}"`));
 for(const study of studies){
  assert.ok(home.includes(`href="${pathForStudy(study)}"`));
  const html=await readFile(fileFor(pathForStudy(study)),'utf8');
  assert.ok(html.includes('Conceptual illustration'));
  assert.ok(html.includes('not a delivered interface'));
  assert.ok(html.includes('class="case-cover"'));
  assert.ok(html.includes('Reduced motion preference active'));
 }
 assert.ok(home.includes('Conceptual study'));
});
