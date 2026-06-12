# Opalminds Brand Guidelines

## Colors

| CSS Token | Hex | Usage | Contrast (on `#EAF1F7`) |
|---|---|---|---|
| `--blue` | `#0398F8` | Primary: buttons, icons, links | — |
| `--cyan` | `#0FDFE3` | Accent: tags, labels, glow | — |
| `--black` | `#F7FBFF` | Primary background (ice white) | — |
| `--charcoal` | `#EAF1F7` | Section alternates (mist) | — |
| `--charcoal-2` | `#FFFFFF` | Card / form backgrounds | — |
| `--ice` | `#071018` | Headings and primary text | ~18:1 |
| `--slate` | `#1A2C3A` | Body text, strong copy | ~12:1 |
| `--muted` | `#3D5166` | Descriptions, secondary text | ~9:1 |
| `--muted-2` | `#546070` | Labels, metadata, fine print | ~6:1 |
| `--gradient` | `#0398F8 → #0FDFE3` | CTAs, connector lines | — |

All text tokens pass WCAG AA (4.5:1) on both `--black` and `--charcoal` backgrounds.

All tokens are CSS custom properties in `:root` inside `css/style.css`.

## Typography

| CSS Token | Font | Usage |
|---|---|---|
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | IBM Plex Sans | Body text |
| `--font-mono` | JetBrains Mono | Labels, tags, code |

All loaded from Google Fonts.

## Logo

| File | Usage |
|---|---|
| `assets/Only_Logo.png` | Icon mark (transparent bg) — nav, footer, dark backgrounds |
| `assets/FullLogo_Transparent_NoBuffer.png` | Full logo with dark wordmark — light backgrounds only |
| `assets/opalminds.png` | Icon + wordmark (small variant) |

`FullLogo_Transparent_NoBuffer.png` has a near-black wordmark — never use on dark backgrounds. Use `Only_Logo.png` (icon) + CSS text instead.

## CSS Utilities

**Gradient text:** Apply class `gradient-text` to any inline element.

**Button variants:**
- `.btn-primary` — filled blue
- `.btn-ghost` — outlined
- `.btn-sm` — smaller padding
- `.btn-full` — full-width

**Section backgrounds:** Light sections use default `--black`. Alternate sections use `background: var(--charcoal)`. Sections separated by `border-top/bottom: 1px solid var(--border-subtle)`.

## Responsive Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤ 1024px` | Services 2-col, process 2-col, contact stacked |
| `≤ 768px` | Mobile nav, services 1-col, process 1-col, stats vertical |
| `≤ 480px` | Reduced font sizes and padding |
