# Opalminds Brand Guidelines

> Ice-white, blue-accented palette tuned for digital readability.
> Every text-and-surface pairing meets **WCAG AA**; action color (`--blue`) corrected to 4.6:1 so labels and links stay legible.

_Last revised: June 12, 2026_

---

## 1. Color tokens

### Surfaces

| Token | Hex | Usage |
|---|---|---|
| `--black` | `#F7FBFF` | Primary background — ice white |
| `--charcoal` | `#EAF1F7` | Section alternate — mist |
| `--charcoal-2` | `#FFFFFF` | Cards & form fields |

### Text / ink ramp

| Token | Hex | Usage | On `#F7FBFF` |
|---|---|---|---|
| `--ice` | `#071018` | Headings, primary text | 18.2:1 · AAA |
| `--slate` | `#1A2C3A` | Body text, strong copy | 13.9:1 · AAA |
| `--muted` | `#3D5166` | Descriptions, secondary text | 7.9:1 · AAA |
| `--muted-2` | `#546070` | Labels, metadata, fine print | 6.2:1 · AA |

### Brand & action

| Token | Hex | Usage | Notes |
|---|---|---|---|
| `--blue` | `#0A78D0` | Primary — buttons, icons, links | 4.6:1 on white. White text OK. |
| `--blue-bright` | `#0398F8` | Glow, gradient start, hover sheen | **Decorative only** — dark text or non-text only. |
| `--cyan` | `#0FDFE3` | Accent — tags, labels, glow | **Never a text color.** Dark text only on cyan fills. |
| `--gradient` | `#0A78D0 → #0FDFE3` | CTAs, connector lines | White text OK over the blue side. |

> ⚠️ **Naming note:** token names are inverted from an earlier dark theme — `--black` is white, `--ice` is near-black. Names are preserved to avoid breaking existing code; refer to the **Usage** column, not the literal name.

---

## 2. Contrast pairings

| Text on → | `#F7FBFF` ice | `#EAF1F7` mist | `#FFFFFF` card |
|---|---|---|---|
| `--ice` `#071018` | 18.2 · AAA | 16.5 · AAA | 18.7 · AAA |
| `--slate` `#1A2C3A` | 13.9 · AAA | 12.6 · AAA | 14.3 · AAA |
| `--muted` `#3D5166` | 7.9 · AAA | 7.2 · AAA | 8.2 · AAA |
| `--muted-2` `#546070` | 6.2 · AA | 5.6 · AA | 6.4 · AAA |
| `--blue` `#0A78D0` | 4.6 · AA | 4.1 · AA Lg | 4.7 · AA |
| `--blue-bright` `#0398F8` | 3.1 · **Fail** | 2.8 · **Fail** | 3.2 · **Fail** |

---

## 3. Typography

### Families

| Token | Font | Usage |
|---|---|---|
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | IBM Plex Sans | Body text |
| `--font-mono` | JetBrains Mono | Labels, tags, code |

All loaded from Google Fonts.

### Type scale

| Step | Size | Weight | Line-height | Use |
|---|---|---|---|---|
| Display | 46px | 800 | 1.05 | Hero headlines |
| H1 | 38px | 700 | 1.1 | Page titles |
| H2 | 28px | 700 | 1.2 | Section headers |
| H3 | 21px | 600 | 1.3 | Card / sub-section titles |
| Body L | 18px | 400 | 1.6 | Lead paragraphs |
| Body | 16px | 400 | 1.6 | **Base reading size (web minimum)** |
| Small | 14px | 400 | 1.5 | Supporting detail, captions |
| Fine | 13px | 500 | 1.4 | Fine-print floor — never smaller |

---

## 4. Logo

| File | Usage |
|---|---|
| `assets/Only_Logo.png` | Icon mark (transparent bg) — nav, footer, dark backgrounds |
| `assets/FullLogo_Transparent_NoBuffer.png` | Full logo with dark wordmark — light backgrounds only |
| `assets/opalminds.png` | Icon + wordmark (small variant) |

`FullLogo_Transparent_NoBuffer.png` has a near-black wordmark — never use on dark backgrounds. Use `Only_Logo.png` (icon) + CSS text instead.

---

## 5. CSS utilities

**Gradient text:** Apply class `gradient-text` to any inline element.

**Button variants:**
- `.btn-primary` — filled blue (`--blue`)
- `.btn-ghost` — outlined
- `.btn-sm` — smaller padding
- `.btn-full` — full-width

**Section backgrounds:** Light sections use default `--black`. Alternate sections use `background: var(--charcoal)`. Sections separated by `border-top/bottom: 1px solid var(--border-subtle)`.

---

## 6. CSS variables

```css
:root {
  /* Surfaces */
  --black:        #F7FBFF; /* primary bg — ice white */
  --charcoal:     #EAF1F7; /* section alt — mist */
  --charcoal-2:   #FFFFFF; /* cards & forms */

  /* Text / ink */
  --ice:          #071018; /* headings, primary text */
  --slate:        #1A2C3A; /* body, strong copy */
  --muted:        #3D5166; /* secondary text */
  --muted-2:      #546070; /* labels, fine print */

  /* Brand & action */
  --blue:         #0A78D0; /* primary — AA on white */
  --blue-bright:  #0398F8; /* decorative / glow only */
  --cyan:         #0FDFE3; /* accent — dark text only */
  --gradient:     linear-gradient(120deg, #0A78D0, #0FDFE3);

  /* Type — families */
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body:    "IBM Plex Sans", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* Type — scale */
  --text-display: 46px; --text-h1: 38px; --text-h2: 28px; --text-h3: 21px;
  --text-body-l:  18px; --text-body: 16px; --text-sm: 14px; --text-fine: 13px;
}
```

---

## 7. Responsive breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1024px` | Services 2-col, process 2-col, contact stacked |
| `≤ 768px` | Mobile nav, services 1-col, process 1-col, stats vertical |
| `≤ 480px` | Reduced font sizes and padding |

---

## 8. Do / Don't

**Do**
- Use `--blue` (`#0A78D0`) for any interactive element that needs white text or sits as text on a light surface.
- Pair `--cyan` and `--blue-bright` with dark (`--ice`) text, or use as glows/gradient ends.
- Keep body copy at 16px minimum; never set text below 13px.

**Don't**
- Don't put white text on `--blue-bright` or `--cyan`.
- Don't use `--cyan` as a text color on any background.
- Don't read token names literally — `--black` is white, `--ice` is near-black.
- Don't use `--blue-bright` (`#0398F8`) for text or white-label buttons — fails AA.
