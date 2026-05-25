# Design Brainstorm — Hex Partnership Opportunity Portal

<response>
<text>
**Direction A — "Boardroom Editorial" (CHOSEN)**

- **Design Movement**: Editorial executive-brief aesthetic inspired by *The Economist*, Stripe's investor pages, and Linear's marketing site. Treats the portal as a long-form decision document rather than a marketing page.
- **Core Principles**:
  1. Reading-first hierarchy: serif display headlines paired with restrained sans-serif body text.
  2. Numerical clarity: numbers, percentages, and currency get tabular figures and oversized treatment.
  3. Quiet authority: muted ivory background, ink-black text, single deep-emerald accent. No gradients except subtle paper grain.
  4. Decision-readiness: every section ends in a takeaway or recommendation block.
- **Color Philosophy**:
  - Paper: `#F6F2EA` (warm ivory) — calm, executive.
  - Ink: `#1A1A1A` — strong contrast for headlines.
  - Accent emerald: `#0B5A4A` — used sparingly for CTAs, recommendation banners, and the active scenario state.
  - Risk amber: `#B7791F` and risk crimson: `#9B2C2C` for caution callouts.
  - Hex-brand magenta `#7B61FF` only used when referencing Hex visuals.
- **Layout Paradigm**: Two-column editorial grid with a sticky left contents rail (chapter navigation), wide content column on the right. Pricing simulator uses a 3-column lab layout: inputs left, live narrative center, summary right.
- **Signature Elements**:
  1. Chapter numerals in serif large caps (e.g., "01 · Context").
  2. Marginalia callouts (small italic notes pulled into the gutter for risks, mitigations, quotes).
  3. A horizontal "stack diagram" showing Looker / Hex / Niki coexistence.
- **Interaction Philosophy**: Calm, deliberate. No bouncing or springing. Scroll-triggered fade-up on section reveal, smooth chapter scroll, sticky number readouts in the calculator. Slide mode is a clean fullscreen flip without flashy transitions.
- **Animation**: 180–260ms ease-out for entrances. Counter values tween over 600ms. Scenario chip selection underlines with a 240ms slide. Reduced motion respected.
- **Typography System**:
  - Display: **Fraunces** (serif, optical sizing, soft) for chapter titles and headline numbers.
  - Body: **Inter Tight** for prose (note: NOT plain Inter — tight tracking and used with weight pairing 400/500/700).
  - Mono: **JJ Mono / IBM Plex Mono** for figures inside the calculator and code-style annotations.
</text>
<probability>0.07</probability>
</response>

<response>
<text>
**Direction B — "Mission Control Dashboard"**
Dark cockpit UI in slate/cyan, monospace heavy, terminal-style scenario simulator. Strong but reads more like an internal tool than an executive narrative.
</text>
<probability>0.05</probability>
</response>

<response>
<text>
**Direction C — "Hex-native Workspace Mirror"**
Mimic Hex's own marketing palette (purple/violet, white). Strong product affinity but risks looking like a Hex marketing site and weakens our editorial, decision-document tone.
</text>
<probability>0.04</probability>
</response>

**Selected: Direction A — Boardroom Editorial.**
Every component will reinforce: ivory paper, ink type, emerald accent, serif display + Inter Tight body, two-column editorial grid, marginalia, and decision-block endings.
