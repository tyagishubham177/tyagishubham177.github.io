# Shubham Tyagi — product portfolio

A multi-page portfolio in the selected warm, human direction C. Every page is pre-rendered as a complete HTML document; links navigate between documents, not through an SPA router. React hydrates optional interactions. A lazy-loaded Three.js sculpture responds to native scroll on the home page, with motion-off and reduced-motion fallbacks.

## Run locally

```powershell
npm ci --cache .npm-cache
npm run build
npm test
npm run preview -- --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173/`. This production preview works in the restricted Windows workspace. On a normal local checkout, `npm run dev` starts the editable development server, usually on port 5173.

## Build

```powershell
npm run build
```

The GitHub Pages workflow uploads `dist/client` on pushes to `main`. The published URL is `https://tyagishubham177.github.io/`.

## Content updates

Edit `src/case-studies.js` for the three detailed product cases and `src/CasePage.jsx` for the reader layout. Edit `src/App.jsx` for Home, Work, About and Build Lab. `src/ScrollStory.jsx` controls the scroll sculpture. Styling lives in `src/styles.css`, `src/case-pages.css` and `src/scroll-story.css`.

Routes: `/`, `/work/`, `/work/hospital-digitalisation/`, `/work/vascular-access/`, `/work/diabetes-companion/`, `/about/`, `/build-lab/`. Build metadata lives in `src/entry-server.jsx`; `scripts/prerender.mjs` emits document files, a sitemap and a static 404.

Cases use the private PML_Project pack: Hospital v0.2 and Vascular/Diabetes v0.1. Public content is anonymised and separates recollection, source-supported contribution and retrospective reconstruction. Original documents, clinical records and unverified achieved outcomes must not be added to the public repository. See `CONTENT_EVIDENCE.md`. Architectural thumbnails and the 3D sculpture are conceptual illustrations, not delivered-product screenshots.

To review: open Work, read each case, refresh its direct URL, then scroll the home page's “A way of working” section and try “Turn motion off”. Check the narrow-screen menu and tables on your phone.
