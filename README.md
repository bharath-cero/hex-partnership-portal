# Hex Partnership Opportunity Portal

An executive-ready evaluation portal for the **Hex.tech** partnership opportunity.
Reads the sales conversation against the existing Looker / Tableau / Niki footprint,
surfaces value, risk, and negotiation priorities, and ships an **interactive pricing
& scenario simulator** plus a **slide mode** companion for live presentation.

> **Audience.** Data &amp; AI leadership and the negotiation working group.
> **Posture.** Hex as a complement to existing analytics, controlled rollout, aggressive on commercial protections.

---

## What's inside

| Surface | Path | Purpose |
| --- | --- | --- |
| Executive brief | `/` | Long-form narrative (chapters 01–09) with sticky chapter rail, decision blocks, marginalia callouts, and a stack-fit diagram. |
| Pricing & scenario simulator | `/simulator` | Configure seat counts, list vs negotiated prices, BYOT toggle, and view annualized total + implied discount live. Three preset rollout scenarios. |
| Slide mode | `/slides` | Clean fullscreen presenter (←/→/space to navigate, Esc to exit). 11 slides distilled from the brief. |

### Information architecture

```
01 · Organizational context        — Where Hex would land
02 · Strategic thesis              — Complement, not replace
03 · Fit in the stack              — Looker · Hex · Niki layered model
04 · Incremental value             — What Hex actually adds
05 · Risks & mitigations           — AI credits, lock-in, BYOT
06 · Negotiation priorities        — What we ask for, prioritized
07 · Rollout scenarios             — Controlled · Explorer-heavy · Broad
08 · Pricing & scenario simulator  — Live commercial math
09 · Appendix · product visuals    — From hex.tech & learn.hex.tech
```

### Sources

- Structured notes — Sr. Director, Data &amp; AI (Hex.Tech evaluation & commercial strategy PDF).
- Sales intro call — Hex (Barry &amp; Josie), May 18 (`hex-meetings-notes.tex`,
  full transcript at https://notes.granola.ai/t/8d34e564-4b50-429a-aa62-4ceefd9085f6).
- Public visuals — hex.tech, learn.hex.tech (captured screenshots, attributed in the gallery).

---

## Design philosophy — "Boardroom Editorial"

- **Paper:** warm ivory, subtle dot grain.
- **Ink:** near-black for headlines; muted graphite for prose.
- **Accent:** a single deep emerald (`oklch(0.42 0.09 165)`) — used sparingly for CTAs,
  decision blocks, recommended-scenario state, and the active chapter indicator.
- **Type:** **Fraunces** display serif (italics for marginalia) + **Inter Tight** body
  + **JetBrains Mono** for figures, with tabular numerals enforced.
- **Layout:** two-column editorial grid (sticky chapter rail + wide reading column).
  The simulator uses a 3-pane lab (inputs · narrative · sticky summary).
- **Motion:** calm. 180–260ms ease-out entrances, smooth chapter scroll, animated number
  tweens in the simulator, respect `prefers-reduced-motion`.

The decision rationale and rejected alternatives live in [`ideas.md`](./ideas.md).

---

## Repository structure

```
hex-partnership-portal/
├─ client/
│  ├─ index.html                 ← Google Fonts (Fraunces / Inter Tight / JetBrains Mono)
│  └─ src/
│     ├─ App.tsx                 ← Routes: /, /simulator, /slides
│     ├─ main.tsx
│     ├─ index.css               ← Design tokens (ivory paper, ink, emerald)
│     ├─ pages/
│     │  ├─ Home.tsx             ← Editorial brief — chapters 01–09
│     │  ├─ Simulator.tsx        ← Standalone simulator surface
│     │  └─ Slides.tsx           ← Slide-mode presenter
│     ├─ components/
│     │  ├─ PortalLayout.tsx     ← Top bar + sticky chapter rail + footer
│     │  ├─ Chapter.tsx          ← Chapter / Decision / Marginalia primitives
│     │  ├─ StackDiagram.tsx     ← Looker / Hex / Niki stack-fit diagram
│     │  ├─ PricingSimulator.tsx ← Interactive simulator (3-pane lab)
│     │  ├─ ScenarioCompare.tsx  ← 3-up scenario comparison
│     │  └─ VisualsGallery.tsx   ← Hex product screenshots + lightbox
│     └─ lib/
│        ├─ content.ts           ← All narrative content + scenarios + visuals + slide deck
│        └─ pricing.ts           ← Pricing math + formatters
├─ server/
│  └─ index.ts                   ← Production Express static server
├─ ideas.md                      ← Design brainstorm + chosen direction
├─ package.json
└─ README.md                     ← This file
```

The content layer is **a single file** (`client/src/lib/content.ts`).
Edit it to refine narrative, scenarios, risks, or negotiation asks — the UI re-renders automatically.

---

## Running locally

Requirements: **Node 22+** and **pnpm 10+** (or **npm**).

```bash
# 1. install dependencies
pnpm install

# 2. dev server (Vite, hot-reload at http://localhost:3000)
pnpm dev

# 3. type-check (optional)
pnpm check
```

### Production build

```bash
pnpm build       # → dist/public (client) + dist/index.js (server)
pnpm start       # serves dist on PORT (default 3000)
```

### Self-host

The portal is a **fully static** React app served by a thin Express process.
Any of the following will work:

| Target | How |
| --- | --- |
| Node host (Render, Fly.io, Railway, your VM) | `pnpm build && pnpm start` — listens on `$PORT`. |
| Docker | Multi-stage: build with `node:22`, copy `dist/`, run `node dist/index.js`. |
| Pure static (Netlify, Vercel, S3, GitHub Pages) | Run `pnpm build`, deploy `dist/public/`. Configure SPA fallback to `index.html` for the `/simulator` and `/slides` routes. |

There is **no database, no auth, no external API** — the portal is self-contained.
All product images are bundled via the `/manus-storage/...` URLs (issued at build time);
to fully air-gap, swap those URLs for locally hosted copies.

---

## Editing the content

All narrative lives in `client/src/lib/content.ts`:

- `ORG_FACTS`, `EXISTING_STACK` — chapter 01 numerical facts and stack listing.
- `THESIS`, `VALUE_CAPABILITIES`, `VALUE_CALLOUT` — strategic narrative.
- `RISKS` — risk register with `severity` and `mitigation`.
- `NEGOTIATION_ASKS` — prioritized commercial ask list.
- `SCENARIOS` — rollout scenarios (seat shape + recommended discount profile + thesis).
- `LIST_PRICES` — anchor list prices (sourced from the Hex sales call).
- `STACK_LAYERS` — stack-fit diagram rows.
- `VISUALS` — Hex product screenshot gallery (title, blurb, source attribution).
- `SLIDES` — slide-mode deck.

The pricing math (`client/src/lib/pricing.ts`) is intentionally small and unit-test friendly.

---

## Pricing simulator — what it computes

Inputs:

- Seat counts (authors, explorers, viewers)
- List prices per tier (`$/seat/mo`) — defaults from the Hex sales call: $250 / $40 / negotiable
- Negotiated counter-prices per tier
- Single-tenant platform fee (list & negotiated) — Hex list reference is $96k/yr
- AI economics: **Hex credits** (annual budget) **or BYOT** (your model + infra estimate)

Outputs (recalculated live):

- **Implied discount %** vs Hex list across seats, platform, and AI
- **Annualized total** (negotiated) and per-seat blended cost
- Line-item breakdown with Δ per line
- Sticky summary panel for hand-off-ready numbers

Three preset scenarios — **Controlled complement** (recommended), **Explorer-heavy operational tier**,
**Broad rollout** — pre-populate counts and discount profiles, and can be edited from there.

---

## Disclaimer

This is an internal evaluation working document.
All inputs are illustrative anchors for negotiation modeling, not a Hex commercial proposal.
