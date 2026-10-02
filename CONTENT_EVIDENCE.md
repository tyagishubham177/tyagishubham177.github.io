# Public content and evidence boundaries

The owner requested detailed product pages from `PML_Project`. Original files are read-only inputs and are not distributed. No extracts, customer forms, hospital names, staff names, private telemetry or source packets belong in the public repository.

## Case sources

- Hospital: nine numbered v0.2 artifacts, START_HERE and v2 quick audit. v0.2 supersedes v0.1 and the old homepage summary.
- Vascular access: case study and v0.1 build/buy, PRD and metrics artifacts. Existing source-account claims remain distinct from reconstructed strategy/chronology.
- Diabetes: v0.1 story, PRD, experiment, metrics and decision-log artifacts. Exact experiments, results and ownership remain unresolved.

## Editorial decisions

- Hospital workflow corrected to medication/cannula records. No invented interview counts, historical RICE use or proof of approved control implementation.
- Retired scope/acceleration claims are not used as outcomes. Held turnaround/labour claims and ambiguous scale figures are not promoted into headline proof.
- Vascular title is Lead Developer, diabetes title is Software Engineer II / Developer; PM/PO authority is not claimed.
- Tables and flows are public explanatory reconstructions, visibly labelled. No score matrix is presented as original evidence.
- No causal clinical, adherence, patient-care or sales effects; no exact financial saving, retention lift or significance claim.
- Recollected delivery stages, source-account contributions, current interpretation and proposed measurement are distinguished in the prose.
- The Three.js sculpture is conceptual product philosophy, not an actual employer interface or project result.

These boundaries were checked by an independent agent before publication. Full original artifact reconstruction and measured-outcome validation remain separate from building the website.

## Technical references

- Static HTML generation follows [Vite's SSR and pre-rendering approach](https://vite.dev/guide/ssr.html). Each route is rendered at build time; hyperlinks trigger document navigation rather than client-side routing.
- Motion uses [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer.html), lazy loading, an optional motion toggle, reduced-motion fallback and explicit resource disposal.
