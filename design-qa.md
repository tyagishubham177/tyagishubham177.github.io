# Portfolio design QA

## Sculptural work layouts — 2026-10-02

Local result: passed. This owner-requested visual iteration supersedes the old thumbnail/card layout, without changing the case-study source copy.

- Homepage now has an edge-to-edge sculptural hero, three open alternating project spreads, and a separate Build Lab strip. Work repeats the project compositions. Individual cases have distinct illustrated covers and a visual next-case link.
- Four actual Three.js variants: orbital hero, medication-workflow stepping planes, shared-platform core/satellites and engagement loop. Warm materials and the tomato sphere extend direction C. Static CSS illustrations carry the same idea before rendering or when motion is off. All are explicitly conceptual, not evidence of delivered interfaces.
- Final build and all ten tests passed. Every document route, static paragraph, table cell, case link, metadata and 404 remains validated. Source data was not edited.
- Internal-browser checks at 1365 × 900 and 390 × 844 found no horizontal overflow. Work deep-link refresh keeps its title/path and intended heading size. Case chapter links, next-case links and mobile covers work; all three variants rendered WebGL.
- Global off removed every canvas, exposed all fallbacks, disabled smooth anchor scrolling and hid the animated reading-progress bar. Off persisted when navigating from hospital to vascular; re-enabling rendered the scene. ScrollStory shares the switch. Browser warning/error log empty in tested navigation.
- Scenes lazy-initialize near the viewport and release offscreen contexts. Agent syntax/SSR and mocked lifecycle/storage checks passed; these are not a device/GPU benchmark. Actual OS preference change, forced GPU/context loss and pointer movement were not browser-automated.
- Evidence in `../outputs/sculptural-layouts-qa/`: `homepage-desktop.jpg`, `featured-desktop.jpg`, `platform-mobile.jpg`, `diabetes-mobile.jpg`. Captures use explicit viewport-sized clips. New visual composition is an intentional response to the owner's feedback, not a fidelity claim against the original flat mock.
- Independent integration review found motion-scope wording and Work-heading selector issues. Motion-off was extended beyond canvases and ScrollStory now explains its shared scope; the new Work selector was browser-verified.

Live deployment is checked after publication; earlier deployment notes below refer to prior iterations.

Live follow-up: the first publication passed CI and rendered the new hero/case covers. A CSS import-order check exposed baseline hero rules loading after composition rules; the base import was moved ahead of App and a built-stylesheet regression test added. Desktop headline scale was adjusted for the wider sculpture column. Subsequent local checks preserve desktop/mobile fit and global motion behavior.

## Multi-page and 3D update — 2026-10-02

Local result: passed. The initial single-page verification below is historical and superseded where this update changes navigation.

- Seven real document routes plus a static 404 are pre-rendered. All case paragraphs and table cells are present in generated HTML before JavaScript. Nine automated tests pass; CI now runs these after the build.
- Hospital, vascular and diabetes case links were opened in the internal browser and refreshed at their direct URLs. Page titles and document paths remain correct. Work has its own index and the mobile menu closes after document navigation.
- Hospital chapter navigation updates the active chapter and reading progress. Desktop has a sticky contents rail. At 390 × 844, pages have no horizontal overflow; 570px tables scroll within their 335px containers. Vascular and diabetes direct pages were also checked at that mobile width.
- Actual WebGL canvas confirmed. Native scroll moved sculpture progress from 0.000 to 0.997 and stage 1 to 3; images show scattered findings becoming a coherent stack. Motion-off removes the canvas and keeps text. Re-enabling recreates the renderer. Mobile WebGL view fits without page overflow. Warning/error log empty in the tested preview.
- Source direction C retains serif/sans hierarchy, white canvas, dark ink, tomato accent and warm illustrations. The user-requested sculpture adds geometry in the same palette; case readers remain restrained.
- Independent source-text review passed against Hospital v0.2 and selected vascular/diabetes sources. This checks consistency, not independent proof of delivery or impact. No raw customer or patient documents were copied into the public tree.
- Evidence: `../outputs/multipage-qa/hospital-desktop.jpg`, `vascular-mobile.jpg`, `scroll-discovery.jpg`, `scroll-alignment.jpg`. Screenshots use the actual browser viewport; no claim of a new matched-size reference comparison.
- Limits: generated static content was tested, not a browser session with JavaScript disabled. Motion-off was exercised; actual OS reduced-motion preference and forced WebGL context-loss were not emulated. GPU/device compatibility beyond this browser remains unverified. Three.js is a separate lazy chunk (about 192KB gzip); Vite's large-chunk advisory is expected, not a failed build.

Publication is verified separately after the deployment workflow completes.

## Original direction C implementation

final result: passed

## Evidence

- Source visual truth: `../outputs/research-2026-09-21/direction-c-human.png`.
- Desktop implementation: `../outputs/research-2026-09-21/implementation-desktop.jpg`.
- Mobile implementation: `../outputs/research-2026-09-21/implementation-mobile.jpg`.
- Desktop CSS viewport and comparison crop: 1586 × 960. Source and implementation inspected together in the same comparison input. Source is 1586 × 960; screenshot uses an explicit equal-size clip, avoiding the default screenshot scaling seen in the earlier capture. No density resampling needed.
- State: light theme, home page, menu closed. Mobile tested at 390 × 844 and captured as a full page.
- Full-view comparison preserves the selected composition: serif name/headline, sans body, tomato-red actions, hand-drawn right-side hero, two left-side work cards and right-side Build Lab.
- Focused comparison: typography, header, hero actions, card titles and Build Lab are readable in the full desktop evidence; no separate magnification was necessary.

## Required fidelity surfaces

- Fonts and typography: DM Serif Display and DM Sans preserve the intended editorial hierarchy, three-line desktop headline and readable body. No truncated titles.
- Spacing/layout: source-aligned page gutters and divider position, relaxed hero spacing, two-card grid with adjacent sidebar. Mobile stacks cleanly; no horizontal overflow.
- Colors/tokens: white canvas, dark ink, muted supporting text, tomato accent and pale blush illustration. Focus styles and reduced-motion treatment are included.
- Images: all three generated raster assets load, retain correct aspect ratios and source art direction. Architectural art is illustrative, not evidence of delivered interfaces.
- Copy: updated from the mock to source-bounded engineering contributions and a transition into PM. Unverified metrics, confidential artifacts and an unapproved résumé download are omitted. AI project is explicitly concept/validation-stage.

## Findings and comparison history

No actionable P0/P1/P2 findings in the final matched desktop comparison. Changes in card wording and headline role line are intentional factual corrections, not design drift. Generated illustration details differ slightly from the mock but preserve composition and visual language (P3).

## Interaction verification

- See my work navigates to `#work`; Read story navigates to its case study.
- Mobile menu opens, About navigates and closes the menu; Back to top resolves.
- All three images report loaded natural dimensions.
- Horizontal overflow: false on desktop and 390px mobile.
- Browser warning/error log: empty in the tested preview.
- Email links use mailto; LinkedIn/GitHub links use explicit destinations and safe new-tab attributes. No email was sent. Availability of external destinations is verified separately from anchor behavior.
- Independent read-only review found no copy or workflow blockers.

## Follow-up polish

- Add approved case artifacts, precise personal decisions and validated outcomes after the owner's review.
- Replace illustrative thumbnails with approved project visuals if available.

## Implementation checklist

- [x] Source and render compared at matching desktop viewport.
- [x] Mobile layout and primary navigation tested.
- [x] Production build passed.
- [x] Public claims checked for evidence boundaries.
- [x] Verify final GitHub Pages deployment and live asset loading.

## Deployment verification — 2026-10-02

- Live URL: https://tyagishubham177.github.io/.
- Published application commit: `d3449cfe8830bf6545cacb120b53494e9b5ce407`.
- GitHub Actions run `37018419487`: completed successfully.
- Public page renders the portfolio; all three images loaded with natural dimensions. Work navigation resolves, no horizontal overflow, and browser warning/error log is empty.
- Live screenshot: `../outputs/research-2026-09-21/live-portfolio.jpg`.
- Both Build Lab destinations were confirmed as existing public GitHub repositories. No message/email sent and no confidential source document published.

