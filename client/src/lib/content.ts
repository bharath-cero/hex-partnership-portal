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
  { id: "fit",         number: "03", title: "Fit in the stack",                          kicker: "Looker · Hex · Niki" },
  { id: "value",       number: "04", title: "Incremental value",                         kicker: "What Hex actually adds" },
  { id: "risks",       number: "05", title: "Risks & mitigations",                       kicker: "Credits, lock-in, BYOT" },
  { id: "negotiation", number: "06", title: "Negotiation priorities",                    kicker: "What we ask for" },
  { id: "rollout",     number: "07", title: "Rollout scenarios",                         kicker: "Controlled · Heavy · Broad" },
  { id: "calculator",  number: "08", title: "Pricing & scenario simulator",              kicker: "Live commercial math" },
  { id: "appendix",    number: "09", title: "Appendix · product visuals",                kicker: "From hex.tech" },
];

/* ---------- 01. Organizational context ---------- */
export const ORG_FACTS = [
  { label: "Employees",                value: "~5,000+", note: "Group-wide footprint" },
  { label: "Data org",                 value: "~120",    note: "Analysts, DS, DE" },
  { label: "Performance specialists",  value: "200–300", note: "Operational power users" },
  { label: "Looker WAU",               value: "~1,100",  note: "Existing BI penetration" },
];

export const EXISTING_STACK = [
  { name: "Looker",        role: "Governed BI + LookML semantic layer" },
  { name: "Tableau",       role: "Analyst dashboards" },
  { name: "Looker Studio", role: "Lightweight visual reporting" },
  { name: "Niki",          role: "Internal conversational AI assistant" },
  { name: "Anthropic",     role: "~$100/mo token allocation per data employee" },
];

/* ---------- 02. Thesis ---------- */
export const THESIS = `Hex should not be positioned as a replacement for Looker, Tableau, or Looker Studio.
It should be adopted as the advanced analytical application layer — a complement that handles the 15–20% of workflows traditional dashboards do not solve well: highly interactive operational tools, custom investigations, modeling-heavy and embedded use cases.`;

/* ---------- 04. Incremental value ---------- */
export const VALUE_CAPABILITIES = [
  { title: "Notebook-native workflows",       body: "SQL, Python, and no-code cells in one author surface, with shared execution context." },
  { title: "Rich data applications",          body: "Productionized interactive apps with LLMs, calculators, automated analysis, and scheduled refreshes." },
  { title: "Threaded collaboration",          body: "Explorers initiate threads against endorsed projects; agent returns charts and analysis with full audit trail." },
  { title: "AI-assisted semantic enrichment", body: "Review agent observes failed queries and friction, then proposes documentation and semantic layer fixes." },
  { title: "Advanced modeling from author seat", body: "Regression and ML workflows ship from the same surface — pushes the data team's frontier beyond dashboarding." },
  { title: "Future: BYO MCP",                 body: "Discussed but not yet GA. Would let Hex apps interoperate with Asana, Linear, Notion, and internal services." },
];

export const VALUE_CALLOUT = "Data apps materially help only ~15–20% of analytical use cases — but that is exactly the segment traditional BI under-serves.";

/* ---------- 05. Risks ---------- */
export interface Risk {
  title: string;
  body: string;
  mitigation: string;
  severity: "high" | "medium" | "low";
}

export const RISKS: Risk[] = [
  {
    title: "AI credits as an opaque intermediary currency",
    body:  "Hex controls credit pricing, burn rate, model routing, and credit-to-token conversion. Even if list pricing drops, effective AI value can be silently re-priced.",
    mitigation: "Demand transparency into burn rates and model mapping; secure right to BYO tokens and workspace-pooled credits in the contract.",
    severity: "high",
  },
  {
    title: "Semantic-layer lock-in inside Hex",
    body:  "Continued enrichment of the semantic layer inside Hex creates platform gravity and portability risk.",
    mitigation: "Hex stores artifacts as Markdown / YAML with GitHub sync — extraction is technically feasible. Codify export and round-trip guarantees in the MSA.",
    severity: "medium",
  },
  {
    title: "Per-seat AI credits cannot be pooled",
    body:  "Idle author/explorer credits are stranded; usage is rigid and fragmented across seats.",
    mitigation: "Negotiate workspace-level pooled AI usage so tokens behave as shared infrastructure rather than per-seat allowances.",
    severity: "medium",
  },
  {
    title: "Viewer seat economics at our scale",
    body:  "Charging per viewer across thousands of consumers undermines the broad-distribution model that makes data apps valuable.",
    mitigation: "Push aggressively for $0 viewer pricing as a condition of partnership; tie author/explorer commitment to viewer concession.",
    severity: "high",
  },
  {
    title: "Editor pricing vs existing Cursor/Claude access",
    body:  "Author seats at $250/mo overlap with capabilities our technical team already has via Cursor and direct Claude access.",
    mitigation: "Keep author seats intentionally small and targeted; justify each seat against a concrete data-app or modeling workload.",
    severity: "medium",
  },
  {
    title: "Delivery Hero group-level licensing constraints",
    body:  "Some BI licensing decisions are centralized above us, complicating wholesale replacement of existing tools.",
    mitigation: "Frame Hex as additive to the group stack; do not premise the business case on retiring Looker or Tableau seats.",
    severity: "low",
  },
];

/* ---------- 06. Negotiation priorities ---------- */
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

/* ---------- 07. Rollout scenarios ---------- */
export interface RolloutScenario {
  id: "controlled" | "heavy" | "broad";
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
    oneliner: "Small author core, mid explorer layer, free viewers. Recommended starting point.",
    authors: 12, explorers: 80, viewers: 1500,
    byot: true,
    recommendedDiscount: { viewer: 1.0, explorer: 0.25, author: 0.20, platform: 0.40 },
    thesis: "Matches the Sr. Director's recommendation: narrow authoring, mid-size explorer tier, wide viewership at $0.",
  },
  {
    id: "heavy",
    name: "Explorer-heavy operational tier",
    oneliner: "Full performance-specialist coverage with explorer seats; minimal authors.",
    authors: 18, explorers: 250, viewers: 2500,
    byot: true,
    recommendedDiscount: { viewer: 1.0, explorer: 0.30, author: 0.20, platform: 0.45 },
    thesis: "Saturates the 200–300 performance specialists with explorer access — leans into Hex's self-serve sweet spot.",
  },
  {
    id: "broad",
    name: "Broad rollout",
    oneliner: "Aggressive distribution: more authors, large explorer pool, organization-wide viewers.",
    authors: 30, explorers: 350, viewers: 4500,
    byot: true,
    recommendedDiscount: { viewer: 1.0, explorer: 0.35, author: 0.25, platform: 0.50 },
    thesis: "Maximum reach. Useful as a negotiating anchor and to test where Hex's commercial flexibility breaks.",
  },
];

/* ---------- Pricing defaults (from sales call) ---------- */
export const LIST_PRICES = {
  viewer: 15,      // negotiable; treated as evangelization variable
  explorer: 40,    // /seat/mo
  author: 250,     // /seat/mo
  platformAnnual: 96000, // single-tenant
};

/* ---------- Stack diagram nodes ---------- */
export const STACK_LAYERS = [
  { tier: "Consumption",       items: ["Niki (conversational AI)", "Hex viewers / data apps", "Looker dashboards", "Tableau workbooks"] },
  { tier: "Self-serve",        items: ["Hex explorers · threads", "Looker explores", "Looker Studio"] },
  { tier: "Authoring",         items: ["Hex authors (notebooks, apps, modeling)", "LookML developers", "Tableau authors"] },
  { tier: "Semantic & context",items: ["LookML", "Hex semantic models (sync from Looker)", "Endorsed projects · rules files"] },
  { tier: "Data platform",     items: ["BigQuery", "Service accounts / OAuth / Google Groups"] },
];

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
    blurb: "Publishable apps with KPI tiles, segmentation, and interactive controls — the layer beyond BI.",
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
    blurb: "Per-database inclusion controls determine what the agent sees when generating answers.",
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
    body: "Where Hex fits, what it adds, what it costs, and what we should negotiate.",
    variant: "title",
  },
  {
    kicker: "01 · Context",
    title: "Hex is not entering greenfield",
    body: "Looker, Tableau, Looker Studio, and Niki are already operating at scale. Any Hex motion must be additive.",
    bullets: ["~5,000+ employees", "~120-person data org", "200–300 performance specialists", "~1,100 Looker WAU"],
    variant: "numbers",
  },
  {
    kicker: "02 · Thesis",
    title: "Complement, not replace",
    body: "Position Hex as the advanced analytical application layer for the 15–20% of workflows traditional BI does not solve well.",
    variant: "section",
  },
  {
    kicker: "03 · Fit",
    title: "Three layers, distinct jobs",
    body: "Niki for conversational access · Looker / Tableau for governed reporting · Hex for advanced analytical apps and AI-native workflows.",
    variant: "section",
  },
  {
    kicker: "04 · Value",
    title: "What Hex actually adds",
    body: "Notebooks, data apps, threads, AI-assisted semantic enrichment, modeling from the author seat, and a future BYO-MCP path.",
    image: "/manus-storage/hex-notebook-hero_64fa431f.png",
    variant: "image",
  },
  {
    kicker: "05 · Risk",
    title: "AI credits are the biggest commercial risk",
    body: "Hex controls credit pricing, burn rate, and model routing. Effective AI value can move opaquely.",
    bullets: ["Demand burn-rate transparency", "Secure right to BYO tokens / models", "Pool credits at workspace level"],
    variant: "decision",
  },
  {
    kicker: "05 · Risk",
    title: "Semantic-layer lock-in is real but mitigable",
    body: "Artifacts are MD/YAML with GitHub sync. Codify export and round-trip in the MSA.",
    variant: "section",
  },
  {
    kicker: "06 · Negotiation",
    title: "What we ask for",
    body: "Top of the list: free viewers, lower platform fee, AI-credit transparency, BYOT, workspace pooling.",
    bullets: ["$0 viewer seats", "Lower platform fee", "Burn-rate transparency", "BYO tokens", "Pooled workspace credits"],
    variant: "decision",
  },
  {
    kicker: "07 · Rollout",
    title: "Recommended: controlled complement",
    body: "Small author core, mid explorer layer, broad viewers. Keep authors scarce and intentional.",
    bullets: ["~12 authors", "~80 explorers", "1,500 free viewers", "BYOT enabled"],
    variant: "numbers",
  },
  {
    kicker: "08 · Commercial",
    title: "Use the simulator",
    body: "The interactive simulator lets us toggle scenarios, BYOT, and counter-pricing, and see implied discount and annualized total live.",
    variant: "section",
  },
  {
    kicker: "Close",
    title: "Hex as the advanced AI-native analytical app layer",
    body: "Sitting between conversational AI (Niki) and traditional BI — narrow authoring, wide viewing, controlled credit economics.",
    variant: "decision",
  },
];
