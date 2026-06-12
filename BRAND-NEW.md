# Brand — Color & Type System

> Ice-white, blue-accented palette tuned for digital readability.
> Every text-and-surface pairing below meets **WCAG AA**; the action color is corrected so labels and links stay legible on screens.

_Last refined: June 12, 2026_

---

## 1. What changed in this revision

| Area | Before | After | Why |
|---|---|---|---|
| Primary action `--blue` | `#0398F8` (3.1:1 on white — **fail**) | `#0A78D0` (4.6:1 — **AA**) | Original blue failed white-on-blue buttons and blue-on-white links. Darkened so both pass AA. |
| Bright blue | `--blue` did double duty | Split out as `--blue-bright` `#0398F8` | The vivid blue is kept for gradients/glows/hover sheen only — never for text or white-on-blue. |
| Cyan `--cyan` | Used loosely | Decorative only — accent fills behind **dark** text | Cyan fails as a text color and under white text; it works only as a fill with dark ink. |
| Gradient `--gradient` | `#0398F8 → #0FDFE3` | `#0A78D0 → #0FDFE3` | Starts on the refined blue so white labels across the left two-thirds stay legible. |
| Text ramp | Unvalidated | Confirmed AA+ on all surfaces | Lightest ink (`--muted-2`) still clears 6:1 on white. |
| Type | Undefined for web | 8-step scale, 16px body min, 13px floor | Locks readable sizing for digital. |

---

## 2. Color tokens

### Surfaces

| Token | Hex | Usage |
|---|---|---|
| `--black` | `#F7FBFF` | Primary background — ice white |
| `--charcoal` | `#EAF1F7` | Section alternate — mist |
| `--charcoal-2` | `#FFFFFF` | Cards & form fields |

### Text / ink ramp

| Token | Hex | Usage | On `#F7FBFF` |
|---|---|---|---|
| `--ice` | `#071018` | Headings, primary text | 18.2 : 1 · AAA |
| `--slate` | `#1A2C3A` | Body text, strong copy | 13.9 : 1 · AAA |
| `--muted` | `#3D5166` | Descriptions, secondary text | 7.9 : 1 · AAA |
| `--muted-2` | `#546070` | Labels, metadata, fine print | 6.2 : 1 · AA |

### Brand & action

| Token | Hex | Usage | Notes |
|---|---|---|---|
| `--blue` | `#0A78D0` | **Primary** — buttons, icons, links | AA on white (4.6:1). White text OK. |
| `--blue-bright` | `#0398F8` | Glow, gradient start, hover sheen | **Decorative only** — dark text or non-text use. |
| `--cyan` | `#0FDFE3` | Accent — tags, labels, glow | **Never a text color.** Dark text only on cyan fills. |
| `--gradient` | `#0A78D0 → #0FDFE3` | CTAs, connector lines | White text OK over the blue side. |

> ⚠️ **Naming note:** several token names are inverted from an earlier dark theme (`--black` is white, `--ice` is near-black). Names are preserved to avoid breaking existing code — refer to the **Usage** column, not the name's literal meaning.

---

## 3. Contrast pairings

Ratios for each text color against the three surfaces. AA needs 4.5:1 (normal) / 3:1 (large); AAA needs 7:1.

| Text on → | `#F7FBFF` ice | `#EAF1F7` mist | `#FFFFFF` card |
|---|---|---|---|
| `--ice` `#071018` | 18.2 · AAA | 16.5 · AAA | 18.7 · AAA |
| `--slate` `#1A2C3A` | 13.9 · AAA | 12.6 · AAA | 14.3 · AAA |
| `--muted` `#3D5166` | 7.9 · AAA | 7.2 · AAA | 8.2 · AAA |
| `--muted-2` `#546070` | 6.2 · AA | 5.6 · AA | 6.4 · AAA |
| `--blue` `#0A78D0` | 4.6 · AA | 4.1 · AA Lg | 4.7 · AA |
| `--blue-bright` `#0398F8` | 3.1 · **Fail** | 2.8 · **Fail** | 3.2 · **Fail** |

---

## 4. Type scale (web)

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

**Family:** Public Sans (or system sans fallback). Monospace for code/hex: `ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace`.

---

## 5. CSS variables

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

  /* Type */
  --font-sans: "Public Sans", system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, monospace;

  --text-display: 46px; --text-h1: 38px; --text-h2: 28px; --text-h3: 21px;
  --text-body-l: 18px;  --text-body: 16px; --text-sm: 14px; --text-fine: 13px;
}
```

---

## 6. Do / Don't

**Do**
- Use `--blue` for any interactive element that needs white text or that sits as text on a light surface.
- Pair `--cyan` and `--blue-bright` with dark (`--ice`) text or use them as glows/gradient ends.
- Keep body copy at 16px minimum; never set text below 13px.

**Don't**
- Don't put white text on `--blue-bright` or `--cyan`.
- Don't use `--cyan` as a text color on any background.
- Don't read token names literally — `--black` is white and `--ice` is near-black.
