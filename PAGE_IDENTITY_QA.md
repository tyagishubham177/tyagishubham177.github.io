# Page identity verification — 3 October 2026

## Scope

Visual differentiation and navigation orientation only. No changes to case-study facts, claims, evidence boundaries or private source packets. Every destination is still a separately pre-rendered document, without client-side routing or intercepted links.

## Automated checks

Production build succeeds. All 31 tests pass, including 20 new page-identity checks written by a bounded verification agent. Tests cover static identity, exact heading, ancestor section activation, scoped breadcrumbs, native case switchers and separate chapter fragments. Existing content, route, metadata and Sites packaging tests remain intact.

## Internal-browser checks

- Desktop 1365 × 900: Work has a cream editorial index; Build Lab has an ink-blue studio layout; cases open with their project name and an individually tinted cover. Native navigation opens new documents at the top.
- Case switcher exposes all three real project routes and marks the current case. The Vascular-access route was reached by switching from Hospital; Diabetes was reached on mobile through the same control.
- Phone 390 × 844: case breadcrumbs wrap without horizontal overflow, the disclosure fits, and the dark Build Lab opens from the mobile menu.
- Mobile Diabetes Workflow anchor: chapter top approximately 159px, below the sticky navigation bottom approximately 134px; current chapter correctly marked `#workflow`.
- Motion-off persists between document navigations; the incoming view-transition animation resolves to `none`. Case chapter links remain usable with motion disabled.
- Browser Back returns to the prior case and restores its reading position. Direct document URLs and refresh load the full pre-rendered case.

Two independent agent passes informed the checks and corrections. Measured sticky offsets use ResizeObserver, with a separate fixed minimum height to avoid measurement feedback. Chapter tracking observes viewport and content size changes. Parent Work is highlighted as the current section (`aria-current="location"`), not incorrectly announced as the current document.

## Boundaries

Reduced-motion suppression is checked in source/CSS; OS preference emulation was not available in this internal-browser API. Static fallback/content is covered by generated-HTML tests, not a JavaScript-disabled browser session. Native cross-document transitions are progressive enhancement; unsupported browsers use normal document navigation. No automated contrast or screen-reader audit is claimed.
