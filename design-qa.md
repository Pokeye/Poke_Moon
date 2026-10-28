# Design QA

**Comparison target**

- Source visual truth: `public/assets/reference-option-1.png` (selected generated direction; 1024 x 1536 pixels).
- Implementation screenshot: `implementation-desktop.png` (browser-rendered local page; 1800 x 1280 pixels from a 1440 x 1024 CSS viewport at 1.25 device scale factor).
- State: initial dark-theme home screen, at the top of the page.
- Full-view evidence: `qa-comparison.png`, a browser-rendered side-by-side comparison of the selected reference and implementation.
- Focused regions: hero/header and initial project-section boundary were visible at readable scale in the comparison; a separate crop was not needed.

**Findings**

- No actionable P0/P1/P2 differences.
- [P3] Header information density is simplified.
  Location: persistent header.
  Evidence: the reference uses a more instrumented navigation rail; the implementation uses clear numbered anchors and an accessible labelled theme control.
  Impact: a minor reduction in decorative fidelity in exchange for practical navigation.
  Fix: add optional verified status microcopy only when a real status value is available.
- [P3] Featured case-study copy is intentionally generic.
  Location: featured engineering work.
  Evidence: no project evidence was supplied with the workspace; the implementation labels this record as needing content rather than retaining the mock's invented project details.
  Impact: correct content integrity, with less immediate portfolio specificity.
  Fix: replace the starter record with a verified project record using `docs/PROJECT_CONTENT_GUIDE.md`.

**Required fidelity surfaces**

- Fonts and typography: condensed display hierarchy, neutral body copy, and monospace labels match the selected direction's editorial hierarchy.
- Spacing and layout rhythm: the asymmetric two-column hero, horizontal rules, project boundary, and responsive one-column fallback match the target's major structure.
- Colors and tokens: charcoal base, off-white type, restrained magenta, cool technical highlight, and thin gray rules are implemented as reusable theme tokens.
- Image quality and asset fidelity: the source's technical illustrations are represented by two original local raster wireframe illustrations, not CSS or SVG approximations.
- Copy and content: source mock copy was not carried over as false project evidence; visible starter content clearly identifies missing records.

**Interactions checked**

- Dark/light theme switch changes its accessible name and persists through reload.
- Desktop anchor navigation moves to the Projects section.
- Mobile viewport exposes the labelled Menu control and opens it with `aria-expanded`.
- A 340 CSS-pixel browser viewport reported 325px document width, so no horizontal overflow was detected.
- Browser console and page-error listeners reported no errors after reload.

**Implementation checklist**

- [x] Recreate the selected direction's hero hierarchy and technical visual language.
- [x] Add responsive navigation, theme control, focus styles, and reduced-motion behavior.
- [x] Use original local raster assets.
- [x] Preserve content integrity by labelling unavailable portfolio information.

**Follow-up polish**

- Add real project screenshots and a verified contact route.
- Add an optional real status line if one becomes available.

**Comparison history**

Initial comparison completed after build; no P0/P1/P2 mismatch required an iteration.

final result: passed
