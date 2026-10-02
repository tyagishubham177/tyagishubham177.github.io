# Shubham Tyagi — product portfolio

A responsive portfolio based on the selected warm, human visual direction. Content is a first public draft grounded in Shubham's July 2026 résumé, career reflection, and public GitHub projects. Case-study figures and internal artifacts are intentionally omitted pending review.

## Run locally

```powershell
npm ci --cache .npm-cache
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173/`. This production preview works in the restricted Windows workspace. On a normal local checkout, `npm run dev` starts the editable development server, usually on port 5173.

## Build

```powershell
npm run build
```

The GitHub Pages workflow uploads `dist/client` on pushes to `main`. The published URL is `https://tyagishubham177.github.io/`.

## Content updates

Edit `src/App.jsx` for text and links, `src/styles.css` for layout and colors, and `public/assets/` for the three generated editorial images. The architectural thumbnails are illustrations, not photographs of the work. The site deliberately omits an unapproved résumé download and unverified outcome metrics.
