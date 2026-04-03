# TODO — girishp.in Portfolio Improvements

---

## Critical / Quick Fixes

- [x] **Fix page title** — change `Girishkumar Ponkiya — iOS v2` to `Girishkumar Ponkiya — Data Scientist & NLP Researcher` ("iOS v2" is a dev artefact that leaks into browser tabs and Google results)
- [x] **Add meta description** — `<meta name="description" content="Girishkumar Ponkiya — VP & Data Scientist specialising in NLP, LLM systems, and Applied AI. Ph.D. IIT Bombay.">`
- [x] **Add Open Graph tags** for LinkedIn/Twitter sharing previews (currently blank):
  ```html
  <meta property="og:title" content="Girishkumar Ponkiya">
  <meta property="og:description" content="VP & Data Scientist | NLP · LLM Systems · Applied AI">
  <meta property="og:image" content="https://www.girishp.in/images/profile.jpeg">
  <meta property="og:url" content="https://www.girishp.in">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary">
  ```
- [x] **Add canonical URL** — `<link rel="canonical" href="https://www.girishp.in">`
- [x] **Add favicon** — a text-based SVG initial ("G") requires no image editing:
  ```html
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>G</text></svg>">
  ```
- [x] **Fix `data-theme="auto"` flash** — the HTML starts with `data-theme="auto"` but CSS has no rule for it; before JS runs there's a style-less flash. Remove the attribute from HTML or default to `data-theme="light"`.
- [x] **Add year to footer** — change `© Girishkumar Ponkiya` to use `new Date().getFullYear()` dynamically, or hardcode current year.

---

## Content — Correctness & Consistency

- [x] **Fix role line** — change to `Data Scientist (Vice President) · Applied AI & NLP` (functional role first, seniority in parens).
- [x] **Expand TRDDC abbreviation** — `(TRDDC, TCS Research)` is opaque outside Indian academia; change to `Tata Research Development and Design Centre (TRDDC), TCS Research` on first use (line 235); keep abbreviation on second use (line 248).
- [ ] **Remove stale citation count** — remove `~56 citations` from the scholar link line; keep just the Google Scholar link.
- [n/a] **Clarify arXiv authorship** — skipping; not a priority.
- [ ] **Clarify UnFound role** — restructure the entry as: title · `Mumbai, India · Dec 2018 – Jun 2019 · Part-time` (subtitle) · meta: `Part-time engagement during PhD research, taken deliberately to gain industry exposure and bridge the transition from academia to applied ML.` · body: existing two bullet points (BERT QA pipeline, multi-task stance detection). Keep title as "Machine Learning Consultant".
- [ ] **Add missing skills** — add Docling and Memgraph to "LLM Infrastructure"; add CoreNLP and Diffbot to a new fourth category **"Tools & Integrations"** (production NLP tools/APIs, not languages or frameworks).
- [x] **Clarify NLP-progress link** — already done; label reads `NLP-progress (proposed noun compound task)`.
- [ ] **Update tagline** — two shortlisted options (pick one):
  - `From Research to Production: Teaching Machines · Training Developers` (retains original wit, adds the arc)
  - `Built the models · Shipped the systems · Runs the workshops` (direct, maps precisely to each career phase)

---

## Visuals & Layout

- [ ] **Increase profile avatar size on desktop** — currently 100×100px; increase to ~116px on desktop via media query for better visual weight relative to the name block.
- [ ] **Fix clear mode text readability** — in `[data-style="clear"]`, body text over a complex wallpaper can lose contrast. Add a subtle `text-shadow` on prose or increase `--page-overlay` opacity slightly.
- [ ] **Improve "Detailed contributions" label** in Experience — it's generic. Change to something like `Technical contributions (NER · LLM · Knowledge Graphs)` so users know what they'll see before expanding.
- [ ] **Add tooltips to publication venue badges** — recruiters and non-NLP readers won't know what ACL or EMNLP are. Add `title="Annual Conference of the ACL — top-tier NLP venue"` (etc.) to each badge.
- [ ] **Improve Skills section subtitle** — `Technical toolkit.` is noticeably shorter and flatter than the others (`Applied AI meets research rigour.`, `From research to production AI.`). Try `Tools that shape the work.` or `Where theory meets tooling.`
- [ ] **Add "Themes" label to the toolbar button on desktop** — the palette icon has no visible text; a short label would make the control self-explanatory without a tooltip.
- [ ] **Add scroll-to-top on mobile** — once scrolled to Publications/Projects there is no quick return; a small floating button (or tapping the controls bar) would help.
- [ ] **Consider in-page navigation** — sections have `id` anchors but no nav. A minimal sticky pill-nav above the stack (desktop only) would help longer-form readers.

---

## Technical & Cleanup

- [ ] **Decide on `profile.md` visibility** — it is a public file deployed to GitHub Pages. If it contains more detail than intended for public view, add it to `.gitignore` or move to a private gist.
- [ ] **Decide on `old-index.html`** — it is live at `www.girishp.in/old-index.html`. Remove or add to `.gitignore` if not intentional.
- [ ] **Convert background image to WebP** — `back-ground.jpg` is served as JPEG for the full-page fixed background. Convert to WebP with a JPEG fallback for better compression.
- [ ] **Protect email from scrapers** — `mailto:girish.isical@gmail.com` is plaintext in the HTML source and will be harvested by bots. Options: CSS-based obfuscation, a contact form, or a custom `@girishp.in` address.
- [ ] **Review `themes/` being public** — all prototypes are reachable at `www.girishp.in/themes/`. Confirm this is intentional; if not, GitHub Pages has no directory-level access control so you'd need to restructure.

---

## Enhancements (Nice to Have)

- [ ] **Add a Talks / Teaching section** — the company-wide LLM workshop series (~70 participants/session) is a significant contribution but has no dedicated card. A short section would be a strong signal for consulting/advisory interest.
- [ ] **Add location to meta pills** — add `Mumbai, India` as a fourth pill in the profile widget so recruiters don't have to scroll to Experience to find geography.
- [ ] **Add Hugging Face profile link** to the social icons row (if you have a profile), given the Transformers contributions.
- [ ] **Add print stylesheet** — `@media print` rule to strip glass effects and render clean text for users who save to PDF or print.
- [ ] **Add scroll animations** — subtle `IntersectionObserver` fade-in on cards; respect `prefers-reduced-motion`.
