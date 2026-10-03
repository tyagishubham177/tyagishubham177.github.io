# Prototype Instructions

## Portfolio owner decisions — 2 October 2026

- Build a genuine multi-page portfolio, not a single-page site or client-side router masquerading as subpages. Every public route needs its own pre-rendered HTML, unique metadata, real links and direct-refresh support on GitHub Pages.
- Keep selected direction C: warm white, tomato accent, editorial serif and human illustration. Add real Three.js scroll-driven motion without scroll hijacking, with reduced-motion and WebGL fallbacks.
- Product case content comes from PML_Project. Hospital v0.2 supersedes v0.1. Preserve source status/ownership boundaries; do not publish raw source packets, clinical/customer identifiers or unsupported outcomes.
- Native Three.js geometry is explicitly requested for the animated sculpture. It is conceptual product storytelling, not a depiction of shipped product UI.
- Extend the red-sphere and cream-plane sculptural language into the homepage hero, full-width featured-project compositions, Work index and individual case covers. User prefers more layouts like the existing ball scene. Keep real multi-page navigation and readable case content; one global motion switch should control every scene.
- 3 October: Work, Build Lab and project clicks must feel like new pages, not jumps to another scroll position. Use distinct destination covers and compositions, strong active parent navigation, persistent breadcrumbs, and a native case switcher. Keep chapter fragments visibly separate from document navigation. Preserve browser Back behavior; never intercept real links to simulate an SPA.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
