import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { studies, pathForStudy } from '../src/case-studies.js';

const pages = [
  { path: '/', kind: 'home' },
  { path: '/work/', kind: 'work', heading: 'Work' },
  { path: '/build-lab/', kind: 'lab', heading: 'Build Lab' },
  { path: '/about/', kind: 'about', heading: 'About' },
  ...studies.map(study => ({ path: pathForStudy(study), kind: 'case', study })),
  { path: '/404/', kind: 'not-found' },
];
const variants = {
  'hospital-digitalisation': 'hospital',
  'vascular-access': 'platform',
  'diabetes-companion': 'engagement',
};
const fileFor = path => new URL(
  path === '/404/' ? '../dist/client/404.html' : `../dist/client${path}index.html`,
  import.meta.url,
);
const readPage = path => readFile(fileFor(path), 'utf8');

function decode(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, name) => {
    if (/^#x/i.test(name)) return String.fromCodePoint(parseInt(name.slice(2), 16));
    if (name.startsWith('#')) return String.fromCodePoint(Number(name.slice(1)));
    return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[name.toLowerCase()] ?? entity;
  });
}

function attributes(source) {
  const result = {};
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of source.matchAll(pattern)) {
    result[match[1].toLowerCase()] = decode(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return result;
}

// Balanced same-tag scopes handle nested spans/divs without a DOM dependency.
// This deliberately targets generated HTML, not arbitrary malformed HTML.
function elements(html, tag) {
  const stack = [];
  const found = [];
  const pattern = new RegExp(`<(/?)${tag}\\b((?:"[^"]*"|'[^']*'|[^'">])*)>`, 'gi');
  for (const match of html.matchAll(pattern)) {
    if (!match[1]) {
      stack.push({ attrs: attributes(match[2]), start: match.index, contentStart: match.index + match[0].length });
    } else {
      const opening = stack.pop();
      if (opening) found.push({ ...opening, inner: html.slice(opening.contentStart, match.index) });
    }
  }
  return found.sort((a, b) => a.start - b.start);
}

function text(html) {
  return decode(html
    .replace(/<!--[^]*?-->/g, '')
    .replace(/<(script|style|svg)\b[^>]*>[^]*?<\/\1\s*>/gi, '')
    .replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ').trim();
}

const hasClass = (element, name) => (element.attrs.class ?? '').split(/\s+/).includes(name);
function elementsWithClass(html, name) {
  const tags = new Set([...html.matchAll(/<([a-z][\w:-]*)\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)]
    .filter(match => hasClass({ attrs: attributes(match[2]) }, name))
    .map(match => match[1].toLowerCase()));
  return [...tags].flatMap(tag => elements(html, tag).filter(el => hasClass(el, name)));
}
function only(matches, message) {
  const [first, extra] = matches;
  assert.ok(first, `${message}: missing`);
  assert.equal(extra, undefined, `${message}: ambiguous or duplicated`);
  return first;
}
const namedNav = (html, label) => only(
  elements(html, 'nav').filter(nav => nav.attrs['aria-label'] === label),
  `${label} navigation`,
);
const currentElements = (html, tag) => elements(html, tag).filter(el => el.attrs['aria-current'] === 'page');
const hrefs = anchors => new Set(anchors.map(anchor => anchor.attrs.href));

for (const page of pages) {
  test(`${page.path}: outer page identity and primary navigation`, async () => {
    const html = await readPage(page.path);
    const frame = only(elementsWithClass(html, 'page-frame'), 'page frame');
    assert.equal(frame.attrs['data-page-kind'], page.kind);
    assert.ok(elements(frame.inner, 'main').some(main => elements(main.inner, 'h1').some(() => true)),
      'the shared frame must contain the page main and heading');
    const header = only(elements(frame.inner, 'header').filter(el =>
      elements(el.inner, 'nav').some(nav => nav.attrs['aria-label'] === 'Primary navigation')),
    'header containing primary navigation');
    const nav = namedNav(header.inner, 'Primary navigation');
    const links = elements(nav.inner, 'a');
    const expectedActive = page.kind === 'case' || page.kind === 'work' ? '/work/'
      : page.kind === 'lab' ? '/build-lab/' : page.kind === 'about' ? '/about/' : undefined;
    for (const [label, href] of [['Work', '/work/'], ['Build Lab', '/build-lab/'], ['About', '/about/']]) {
      const link = only(links.filter(el => text(el.inner) === label), `${label} primary link`);
      assert.equal(link.attrs.href, href);
      if (href === expectedActive && page.kind === 'case') {
        assert.equal(link.attrs['data-current-section'], 'true', 'Work retains its active section visual marker');
        assert.equal(link.attrs['aria-current'], 'location', 'Work is the ancestor section, not the current document');
      } else if (href === expectedActive) assert.equal(link.attrs['aria-current'], 'page');
      else assert.ok(!link.attrs['aria-current'] || link.attrs['aria-current'] === 'false',
        `${label} must not be marked current on ${page.path}`);
    }
    assert.deepEqual(hrefs(currentElements(nav.inner, 'a')),
      new Set(expectedActive && page.kind !== 'case' ? [expectedActive] : []),
      'only exact primary destinations are current pages; cases have no current-page primary link');
    if (page.heading) {
      assert.equal(text(only(elements(frame.inner, 'h1'), 'primary heading').inner), page.heading);
    }
  });
}

for (const page of pages.filter(page => page.heading || page.study)) {
  test(`${page.path}: breadcrumb identity is scoped separately from primary navigation`, async () => {
    const html = await readPage(page.path);
    const breadcrumb = namedNav(html, 'Breadcrumb');
    const links = elements(breadcrumb.inner, 'a');
    const currentName = page.study?.shortTitle ?? page.heading;
    const current = only(currentElements(breadcrumb.inner, 'span'), 'current breadcrumb span');
    assert.equal(text(current.inner), currentName);
    assert.ok(text(breadcrumb.inner).endsWith(currentName), 'current breadcrumb is the final item');
    assert.deepEqual(hrefs(currentElements(breadcrumb.inner, 'a')), new Set(),
      'current breadcrumb is text, not a document link');
    assert.deepEqual(hrefs(links), new Set(page.study ? ['/', '/work/'] : ['/']),
      'breadcrumb contains only ancestor document links');
    assert.equal(text(only(links.filter(link => link.attrs.href === '/'), 'Home breadcrumb link').inner), 'Home');
    if (page.study) {
      assert.equal(text(only(links.filter(link => link.attrs.href === '/work/'), 'Work breadcrumb link').inner), 'Work');
    }
    assert.ok(!links.some(link => text(link.inner) === currentName), 'current item must not link to itself');
  });
}

for (const study of studies) {
  const path = pathForStudy(study);
  test(`${path}: case name, variant and native document switcher`, async () => {
    const html = await readPage(path);
    const main = only(elements(html, 'main').filter(el => hasClass(el, 'case-page')), 'case main');
    assert.ok(variants[study.slug], `explicit expected variant for ${study.slug}`);
    assert.equal(main.attrs['data-case'], variants[study.slug]);
    assert.equal(text(only(elements(main.inner, 'h1'), 'case heading').inner), study.shortTitle);
    assert.ok(['p', 'h2'].some(tag => elements(main.inner, tag).some(el => text(el.inner) === study.title)),
      'original study title remains visible as a subtitle, not the primary heading');

    const switcher = only(elements(html, 'details').filter(el => hasClass(el, 'case-switcher')), 'native case switcher');
    const summary = only(elements(switcher.inner, 'summary'), 'native switcher summary');
    assert.equal(text(summary.inner), 'Switch case');
    assert.ok(!switcher.attrs.role || switcher.attrs.role === 'group', 'details retains native disclosure semantics');
    assert.ok(!summary.attrs.role || summary.attrs.role === 'button', 'summary retains native disclosure semantics');
    const links = elements(switcher.inner, 'a');
    assert.deepEqual(hrefs(links), new Set(studies.map(pathForStudy)), 'switcher offers all real case routes');
    assert.deepEqual(hrefs(currentElements(switcher.inner, 'a')), new Set([path]), 'only this case is current');
    for (const target of studies) {
      const href = pathForStudy(target);
      const link = only(links.filter(el => el.attrs.href === href), `${target.slug} switcher link`);
      assert.ok(text(link.inner).includes(target.shortTitle), 'case destinations have recognizable names');
      assert.ok(!Object.hasOwn(link.attrs, 'hidden') && link.attrs['aria-hidden'] !== 'true');
      if (href !== path) assert.ok(!link.attrs['aria-current'] || link.attrs['aria-current'] === 'false');
      await access(fileFor(href));
    }
  });

  test(`${path}: chapter navigation remains in-document, not case switching`, async () => {
    const html = await readPage(path);
    const chapters = namedNav(html, 'Case study chapters');
    const links = elements(chapters.inner, 'a');
    assert.deepEqual(hrefs(links), new Set(study.sections.map(section => `#${section.id}`)));
    const ids = new Set([...html.matchAll(/<[a-z][\w:-]*\b((?:"[^"]*"|'[^']*'|[^'">])*)>/gi)]
      .map(match => attributes(match[1]).id).filter(Boolean));
    for (const link of links) {
      assert.ok(link.attrs.href.startsWith('#'), 'chapter link is a fragment, not a document route');
      assert.ok(ids.has(link.attrs.href.slice(1)), `chapter target exists: ${link.attrs.href}`);
      assert.notEqual(link.attrs['aria-current'], 'page', 'chapter location does not claim document identity');
    }
  });
}
