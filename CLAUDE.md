# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Opalminds company website — plain HTML/CSS/JS, no build step. Open `index.html` directly in a browser to preview.

## Commands

```bash
# Preview (any local HTTP server)
npx serve .
# or
python3 -m http.server 8080

# Validate HTML
npx html-validate index.html

# Lint CSS
npx stylelint "css/*.css"
```

No build, no bundler, no package.json. All dependencies are CDN (Google Fonts only).

## Architecture

```
index.html      — single-page site, all sections inline
css/style.css   — all styles; CSS custom properties in :root
js/main.js      — six self-executing IIFEs (one concern each)
```

**JS modules in `main.js` (in order):**
- `NeuralCanvas` — canvas particle animation; `CFG` object at top controls count, speeds, distances
- `NavScroll` — adds `.scrolled` class to `#nav` after 24px scroll
- `MobileNav` — builds a `.nav-drawer` DOM element dynamically from `.nav-links` contents
- `ScrollReveal` — IntersectionObserver adds `.in-view` to `.reveal` elements; siblings stagger by 90ms each
- `ProcessLine` — triggers `.process-connector-fill.active` when `#process` enters viewport
- `ContactForm` — form submit handler; replace the `setTimeout` mock with a real `fetch()` when backend exists
- `AnchorScroll` — smooth scroll to `#id` anchors accounting for fixed nav height (`--nav-h`)

**CSS structure:** All design tokens are CSS custom properties in `:root`. Sections are visually separated by `border-top/bottom: 1px solid var(--border-subtle)`. Dark sections use `background: var(--charcoal)`.

## Brand Tokens

| Token | Value | Usage |
|---|---|---|
| `--blue` | `#0398F8` | Primary: buttons, icons, links |
| `--cyan` | `#0FDFE3` | Accent: tags, labels, glow |
| `--black` | `#F7FBFF` | Primary background (ice white) |
| `--charcoal` | `#EAF1F7` | Section alternates (mist) |
| `--charcoal-2` | `#FFFFFF` | Card / form backgrounds |
| `--ice` | `#F7FBFF` | Headings and primary text |
| `--muted` | `#6B7C8F` | Body text, descriptions |
| `--gradient` | `#0398F8 → #0FDFE3` | CTAs, connector lines |

**Fonts:** Space Grotesk (headings, `--font-display`), IBM Plex Sans (body, `--font-body`), JetBrains Mono (labels/tags, `--font-mono`). All loaded from Google Fonts.

## Assets

```
assets/
├── Only_Logo.png                  — icon mark (transparent bg) — used in nav + footer
├── FullLogo_Transparent_NoBuffer.png — full logo, dark wordmark — for light-bg use only
├── opalminds.png                  — icon + wordmark (small)
├── 27001.pdf                      — ISO 27001 certificate (linked from #trust)
├── 9001.pdf                       — ISO 9001 certificate (linked from #trust)
└── soc3.pdf                       — SOC 3 report (linked from #trust)
```

`FullLogo_Transparent_NoBuffer.png` has a near-black wordmark — only use on light backgrounds. For dark backgrounds, use `Only_Logo.png` (icon) + CSS text.

## Sections

| ID | Purpose |
|---|---|
| `#hero` | Canvas animation + main headline |
| `#stats` | Four capability callouts |
| `#services` | 6-card grid (3-col → 2-col → 1-col responsive) |
| `#process` | 4-step timeline with animated gradient connector |
| `#contact` | Info panel + contact form |
| `#trust` | Cert badges linking to PDF certificates (ISO 27001, ISO 9001, SOC 3) |

## Key Patterns

**Adding a service card:** Copy any `.service-card` div in `#services`. The `.card-tag`, `h3`, and `p` are the only required children. SVG icon is decorative.

**Scroll animations:** Add class `reveal` to any element — IntersectionObserver handles the rest. Stagger is automatic for siblings.

**Gradient text:** Apply class `gradient-text` to any inline element.

**Button variants:** `.btn-primary` (filled blue), `.btn-ghost` (outlined), `.btn-sm` (smaller padding), `.btn-full` (full-width).

## Contact Form Backend

`ContactForm` IIFE in `main.js` has a `setTimeout` mock. To wire a real backend:
```js
// Replace the setTimeout block with:
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(Object.fromEntries(new FormData(form)))
}).then(() => { /* show success */ });
```

## Responsive Breakpoints

- `≤ 1024px`: services 2-col, process 2-col, contact stacked
- `≤ 768px`: mobile nav, services 1-col, process 1-col, stats vertical
- `≤ 480px`: reduced font sizes and padding
