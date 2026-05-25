/**
 * Content & data layer for the Hex Partnership Opportunity Portal.
 * Source material: Sr. Director's structured mental model PDF + sales-call notes
 * (Hex + Bharath intro, May 18) + public Hex.tech product visuals.
 *
 * Editorial tone: decision-ready, concise, paragraph-first.
 */

export type ChapterId =
  | "context"
  | "thesis"
  | "commercial"
  | "fit"
  | "value"
  | "risks"
  | "negotiation"
  | "rollout"
  | "calculator"
  | "appendix";

export interface Chapter {
  id: ChapterId;
  number: string;
  title: string;
  kicker: string;
}

export const CHAPTERS: Chapter[] = [
  { id: "context",     number: "01", title: "Organizational context",                    kicker: "Where Hex would land" },
  { id: "thesis",      number: "02", title: "Strategic thesis",                          kicker: "Complement, not replace" },
  { id: "commercial",  number: "03", title: "Commercial structure",                      kicker: "Tiers · Platform · AI Modes" },
  { id: "fit",         number: "04", title: "Fit in the stack",                          kicker: "Looker · Hex · Niki" },
  { id: "value",       number: "05", title: "Incremental value",                         kicker: "What Hex actually adds" },
  { id: "risks",       number: "06", title: "Risks & mitigations",                       kicker: "Commercial · Strategic" },
  { id: "negotiation", number: "07", title: "Negotiation priorities",                    kicker: "What we ask for" },
  { id: "rollout",     number: "08", title: "Rollout scenarios",                         kicker: "Controlled · Broad" },
  { id: "calculator",  number: "09", title: "Pricing & scenario simulator",              kicker: "Live commercial math" },
  { id: "appendix",    number: "10", title: "Appendix · product visuals",                kicker: "From hex.tech" },
];

/* ---------- 01. Organizational context ---------- */
export const ORG_FACTS = [
  { label: "Employees",                value: "~5,000+", note: "Group-wide footprint" },
  { label: "Data org",                 value: "~120",    note: "Analysts, DS, DE" },
  { label: "Performance specialists",  value: "200–300", note: "Operational power users" },
  { label: "Looker WAU",               value: "~1,100",  note: "Existing analytics penetration" },
];

export const EXISTING_STACK = [
  { name: "Looker",        role: "Governed analytics + LookML semantic layer" },
  { name: "Tableau",       role: "Analyst dashboards" },
  { name: "Looker Studio", role: "Lightweight visual reporting" },
  { name: "Niki",          role: "Internal conversational AI assistant" },
  { name: "Anthropic",     role: "~$100/mo token allocation per data employee" },
];

/* ---------- 02. Thesis ---------- */
export const THESIS = `Hex should not be positioned as a replacement for Looker, Tableau, or Looker Studio.
It should be adopted as the advanced analytical application layer — a complement that handles the 15–20% of workflows traditional dashboards do not solve well: automated WBR/MBR reporting, highly interactive operational tools, custom investigations, modeling-heavy work, and embedded analytics for customer-facing portals and in-app decision tools.`;

/* ---------- 03. Commercial Structure ---------- */
export const SEAT_TIERS = [
  {
    name: "Viewer",
    list: "Negotiable ($0–$15)",
    audience: "Broad organization",
    capabilities: "View published data apps/dashboards. No authoring or threads.",
    note: "Primary lever for broad distribution."
  },
  {
    name: "Explorer",
    list: "$40 / user / mo",
    audience: "Power users / Performance specialists",
    capabilities: "Threads (AI chat), self-serve analytics, run governed queries.",
    note: "The 'Self-Serve' sweet spot."
  },
  {
    name: "Editor / Author",
    list: "$250 / user / mo",
    audience: "Analysts / DS / DE / Builders",
    capabilities: "Full notebook authoring (SQL/Python), build apps, maintain semantic models.",
    note: "The advanced authoring core."
  }
];

export const PLATFORM_MODES = [
  {
    mode: "Multi-tenant",
    list: "To be determined",
    benefits: "Shared SaaS cloud. Typically lower TCO, but specific platform fee requires validation.",
    target: "Default for most customers; faster to start."
  },
  {
    mode: "Single-tenant",
    list: "~$96,000 / yr",
    benefits: "Isolated infra, dedicated deployment, stricter security/compliance.",
    target: "Enterprises with high isolation requirements."
  }
];

export const AI_ECONOMICS = [
  {
    label: "Hex AI Credits",
    whoPays: "You pay Hex (credits)",
    transparency: "Abstracted via credits",
    pooling: "Per-seat (optional paid workspace pool)",
    advantage: "Hex negotiates model pricing at scale; gratis agent use."
  },
  {
    label: "BYO Tokens (BYOT)",
    whoPays: "You pay provider directly",
    transparency: "Full line-item visibility",
    pooling: "Naturally workspace-pooled",
    advantage: "Centralized governance, use custom models, removes re-pricing risk."
  }
];

/* ---------- 04. Stack diagram nodes ---------- */
export const STACK_LAYERS = [
  { tier: "Self Serve (Canonical Views)", items: ["Hex viewers / data apps", "Looker dashboards", "Tableau workbooks", "Looker Studio"] },
  { tier: "Self Serve (Bespoke Modeling + RCA)", items: ["Hex explorers · threads", "Looker explores"] },
  { tier: "Authoring",         items: ["Hex authors (notebooks, apps, modeling)", "LookML developers", "Tableau authors"] },
  { tier: "Semantic & context",items: ["dbt", "LookML", "Hex semantic models (sync from Looker)", "Hex Review Agent", "Hex BYO-MCP (Future)", "Endorsed projects · rules files"] },
  { tier: "Data platform",     items: ["BigQuery", "Service accounts / OAuth / Google Groups"] },
];

/* ---------- 05. Incremental value ---------- */
export const VALUE_CAPABILITIES = [
  { title: "Notebook-native workflows",       body: "SQL, Python, and no-code cells in one author surface, with shared execution context." },
  { title: "Rich data applications",          body: "Productionized interactive apps with LLMs, calculators, automated analysis, and scheduled refreshes." },
  { title: "Threaded collaboration",          body: "Explorers initiate threads against endorsed projects; agent returns charts and analysis with full audit trail." },
  { title: "AI-assisted semantic enrichment", body: "Review agent observes failed queries and friction, then proposes documentation and semantic layer fixes." },
  { title: "Advanced modeling from author seat", body: "Regression and ML workflows ship from the same surface — pushes the data team's frontier beyond dashboarding." },
  { title: "Future: BYO MCP",                 body: "Discussed but not yet GA. Would let Hex apps interoperate with Asana, Linear, Notion, and internal services." },
];

export const VALUE_CALLOUT = "Data apps materially help only ~15–20% of analytical use cases — but that is exactly the segment traditional analytics under-serves.";

/* ---------- 06. Risks ---------- */
export interface Risk {
  title: string;
  body: string;
  mitigation: string;
  severity: "high" | "medium" | "low";
}

export const RISKS: Risk[] = [
  {
    title: "Commercial: Viewer seat economics at scale",
    body:  "Charging per viewer across thousands of consumers undermines the broad-distribution model that makes data apps valuable.",
    mitigation: "Push aggressively for $0 viewer pricing as a condition of partnership; tie author/explorer commitment to viewer concession.",
    severity: "high",
  },
  {
    title: "Commercial: AI credits as an opaque currency",
    body:  "Hex controls credit pricing, burn rate, and model routing. Effective AI value can be silently re-priced even if seat costs stay flat.",
    mitigation: "Demand transparency into burn rates and model mapping; secure right to BYO tokens and workspace-pooled credits in the contract.",
    severity: "high",
  },
  {
    title: "Commercial: List price vs negotiated target",
    body:  "Standard list prices for Author ($250) and Explorer ($40) seats are high-water marks. Without significant volume discounts, the ROI on mid-size rollouts is thin.",
    mitigation: "Anchor negotiations on the 200+ explorer tier to trigger material volume discounts; aim for 25-35% reduction from list.",
    severity: "medium",
  },
  {
    title: "Strategic: Semantic-layer lock-in inside Hex",
    body:  "Continued enrichment of the semantic layer inside Hex creates platform gravity and portability risk.",
    mitigation: "Hex stores artifacts as Markdown / YAML with GitHub sync. Codify export and round-trip guarantees in the MSA to ensure portability.",
    severity: "medium",
  },
  {
    title: "Strategic: Incremental value vs generalist AI tools",
    body:  "The technical team already has access to Cursor, Claude Code, and direct LLMs. Hex must justify its premium over these existing toolsets.",
    mitigation: "Focus Hex on the *last mile* of delivery—where governance, collaboration, and data-native UI components provide a distinct layer above raw code generation.",
    severity: "medium",
  },
];

/* ---------- 07. Negotiation priorities ---------- */
export const NEGOTIATION_ASKS = [
  { priority: "High",   ask: "$0 viewer seats",                              rationale: "Enables broad data-app distribution without per-head cost." },
  { priority: "High",   ask: "Lower single-tenant platform fee",             rationale: "Hex list is $96k/yr; aim for material reduction tied to commitment." },
  { priority: "High",   ask: "Clarity on AI credit definition & burn rates", rationale: "Prevent silent margin shifts via credit-to-token re-pricing." },
  { priority: "High",   ask: "Right to BYO tokens / models",                 rationale: "Centralize spend, governance, and routing under our control." },
  { priority: "Medium", ask: "Workspace-level pooled credits",               rationale: "Resource pooling beats per-seat allowances; reduces stranded credits." },
  { priority: "Medium", ask: "Volume discount tiers above 200 explorers",    rationale: "Sales acknowledged volume discounts for hundreds of seats." },
  { priority: "Medium", ask: "Semantic-layer export & GitHub round-trip SLA",rationale: "Mitigates lock-in; relies on Hex's existing MD/YAML format." },
  { priority: "Low",    ask: "Slack white-labeling for Niki co-existence",   rationale: "Avoid agent collision in shared channels." },
];

/* ---------- 08. Rollout scenarios ---------- */
export interface RolloutScenario {
  id: "controlled" | "broad";
  name: string;
  oneliner: string;
  authors: number;
  explorers: number;
  viewers: number;
  byot: boolean;
  recommendedDiscount: { viewer: number; explorer: number; author: number; platform: number };
  thesis: string;
}

export const SCENARIOS: RolloutScenario[] = [
  {
    id: "controlled",
    name: "Controlled complement",
    oneliner: "Limited authors, mid-size explorer layer, free viewers. Targets performance-specialist cohorts.",
    authors: 12, explorers: 200, viewers: 1500,
    byot: false,
    recommendedDiscount: { viewer: 1.0, explorer: 0.50, author: 0.50, platform: 0.50 },
    thesis: "Matches a controlled expansion: narrow author core, 200 explorers, and free viewers to enable broad consumption.",
  },
  {
    id: "broad",
    name: "Broad rollout",
    oneliner: "All data team members as authors + large explorer pool for stakeholders.",
    authors: 100, explorers: 200, viewers: 4500,
    byot: false,
    recommendedDiscount: { viewer: 1.0, explorer: 0.50, author: 0.50, platform: 0.60 },
    thesis: "Maximum reach. Equips the core data team with author seats and provides broad explorer access for the analyst group.",
  },
];

/* ---------- Pricing defaults (from sales call) ---------- */
export const LIST_PRICES = {
  viewer: 15,      // negotiable; treated as evangelization variable
  explorer: 40,    // /seat/mo
  author: 250,     // /seat/mo
  platformAnnual: 96000, // single-tenant
};

/* ---------- Hex product visuals (uploaded to webdev storage) ---------- */
export interface ProductVisual {
  src: string;
  title: string;
  blurb: string;
  source: string;
  tag: "Notebook" | "Data apps" | "AI & agents" | "Threads" | "Semantic" | "Workspace";
}

export const VISUALS: ProductVisual[] = [
  {
    src: import.meta.env.BASE_URL + "hex-notebook-hero_64fa431f.png",
    title: "Notebook + App builder",
    blurb: "SQL, Python, and no-code cells driving a publishable interactive app from the same surface.",
    source: "hex.tech — \"So much more than the world's best notebook\"",
    tag: "Notebook",
  },
  {
    src: import.meta.env.BASE_URL + "hex-develop-notebook_c0ed3baa.png",
    title: "Mixed SQL + Python pipeline",
    blurb: "Cells reference each other; intermediate dataframes flow into downstream queries and charts.",
    source: "learn.hex.tech — \"Develop your notebook\"",
    tag: "Notebook",
  },
  {
    src: import.meta.env.BASE_URL + "hex-data-apps_3656778f.png",
    title: "Threaded comments on charts",
    blurb: "Discussion happens in-context on the artifact, not in a separate doc.",
    source: "hex.tech — \"Beautiful data apps & dashboards\"",
    tag: "Data apps",
  },
  {
    src: import.meta.env.BASE_URL + "hex-embedded-analytics_e36cb80e.png",
    title: "Embedded & published data apps",
    blurb: "Publishable apps with KPI tiles, segmentation, and interactive controls — the layer beyond standard analytics.",
    source: "hex.tech — Embedded analytics",
    tag: "Data apps",
  },
  {
    src: import.meta.env.BASE_URL + "hex-ai-agents_801f3c1a.png",
    title: "AI & agents",
    blurb: "Hex's agentic workflows: thread agent, review agent, semantic-gap suggestions.",
    source: "hex.tech — AI and agents",
    tag: "AI & agents",
  },
  {
    src: import.meta.env.BASE_URL + "hex-threads_08e8b96a.png",
    title: "Threads workspace view",
    blurb: "Conversational analysis surface where explorers ask questions against governed context.",
    source: "learn.hex.tech — Threads",
    tag: "Threads",
  },
  {
    src: import.meta.env.BASE_URL + "hex-semantic-ai_e37178c6.png",
    title: "Semantic AI",
    blurb: "Semantic models + rules + endorsed projects feed agent accuracy.",
    source: "hex.tech — Semantic AI in the world of data",
    tag: "Semantic",
  },
  {
    src: import.meta.env.BASE_URL + "hex-workspace_68ac301b.png",
    title: "Magic context studio",
    blurb: "Magic inclusion controls determine what the agent sees when generating answers.",
    source: "learn.hex.tech — Setup workspace for AI agents",
    tag: "Workspace",
  },
];

/* ---------- Slide deck definition (slide mode) ---------- */
export interface Slide {
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  image?: string;
  variant: "title" | "section" | "image" | "numbers" | "decision";
}

export const SLIDES: Slide[] = [
  {
    kicker: "Hex.tech · Partnership opportunity",
    title: "Decision-ready brief",
    body: "A strategic rubric for evaluating the Hex partnership, commercial structure, and rollout scenarios.",
    variant: "title",
  },
  {
    kicker: "01 · Context",
    title: "Where Hex lands in our org",
    body: "Hex enters an ecosystem with 5,000+ employees and an established analytics stack. It must be a complement, not a replacement.",
    bullets: ["~1,100 Looker WAU", "200-300 Performance Specialists", "~120-person Data Org"],
    variant: "numbers",
  },
  {
    kicker: "02 · Thesis",
    title: "The advanced analytics app layer",
    body: "Hex handles the 15-20% of workflows traditional dashboards miss: WBR/MBR automations, data apps, and custom investigations.",
    variant: "section",
  },
  {
    kicker: "03 · Commercial",
    title: "Three-tier seat model",
    body: "Author ($250/mo), Explorer ($40/mo), and Viewer ($0-$15/mo). Negotiation focuses on 'narrow authoring, wide viewing'.",
    bullets: ["Authors: Builders/Analysts", "Explorers: Power users", "Viewers: Broad consumers"],
    variant: "numbers",
  },
  {
    kicker: "03 · Commercial",
    title: "AI Economics: Credits vs BYOT",
    body: "Hex credits offer simplicity and gratis agent use; BYOT offers full transparency, centralized governance, and pooled usage.",
    variant: "decision",
  },
  {
    kicker: "04 · Fit",
    title: "Three layers, distinct jobs",
    body: "Niki for conversational access · Looker / Tableau for governed reporting · Hex for advanced analytical apps.",
    variant: "section",
  },
  {
    kicker: "05 · Value",
    title: "What Hex actually adds",
    body: "Notebooks, data apps, threads, AI-assisted semantic enrichment, and future BYO-MCP interoperability.",
    image: import.meta.env.BASE_URL + "hex-notebook-hero_64fa431f.png",
    variant: "image",
  },
  {
    kicker: "06 · Risk",
    title: "Commercial & Strategic Risks",
    body: "Primary risks center on viewer seat economics at scale and opaque AI credit re-pricing.",
    bullets: ["Push for $0 viewer seats", "Demand AI burn-rate transparency", "Secure right to BYO tokens"],
    variant: "decision",
  },
  {
    kicker: "07 · Negotiation",
    title: "Negotiation Priorities",
    body: "Our asks are sequenced by leverage: $0 viewers, BYOT rights, workspace pooling, and volume tiers.",
    variant: "decision",
  },
  {
    kicker: "08 · Rollout",
    title: "Recommended: Controlled complement",
    body: "Small author core (12), 150-300 explorers, and free viewers. Anchored on deep discounts (50-75% target).",
    variant: "numbers",
  },
  {
    kicker: "09 · Commercial",
    title: "Pressure-test in the simulator",
    body: "The interactive simulator toggles between Standard and BYOT models with model-specific discount targets.",
    variant: "section",
  },
  {
    kicker: "Close",
    title: "Securing a sustainable partnership",
    body: "Narrow authoring, wide viewing, and controlled AI economics to complement our modern data stack.",
    variant: "decision",
  },
];
