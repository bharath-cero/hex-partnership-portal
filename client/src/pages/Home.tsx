/**
 * Home / Brief page — the executive narrative.
 * Design: "Boardroom Editorial". Chapters 01–10, each ending in a decision block where appropriate.
 */
import { PortalLayout } from "@/components/PortalLayout";
import { Chapter, Decision, Marginalia } from "@/components/Chapter";
import { StackDiagram } from "@/components/StackDiagram";
import { PricingSimulator } from "@/components/PricingSimulator";
import { ScenarioCompare } from "@/components/ScenarioCompare";
import { VisualsGallery } from "@/components/VisualsGallery";
import {
  ORG_FACTS, EXISTING_STACK, THESIS, VALUE_CAPABILITIES, VALUE_CALLOUT,
  RISKS, NEGOTIATION_ASKS, SEAT_TIERS, PLATFORM_MODES, AI_ECONOMICS,
} from "@/lib/content";
import { Link } from "wouter";
import { ArrowRight, Presentation, Calculator } from "lucide-react";

export default function Home() {
  return (
    <PortalLayout>
      <Hero />

      <Chapter id="context" number="01" title="Where Hex would land" kicker="Organizational context">
        <p>
          The Hex conversation is not entering greenfield. We operate at meaningful scale with an established
          governed data stack, an existing semantic layer in LookML, and a growing internal AI assistant (Niki).
          Any commercial move with Hex must therefore be evaluated as an <em>additive</em> motion, not a
          replacement. The question is which workflows justify a second authoring surface and a new commercial line.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {ORG_FACTS.map((f) => (
            <div key={f.label} className="border border-border bg-card rounded-sm p-4">
              <div className="font-display tnum text-3xl font-semibold">{f.value}</div>
              <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground mt-1">{f.label}</div>
              <div className="text-[12px] text-foreground/70 mt-1">{f.note}</div>
            </div>
          ))}
        </div>

        <h3 className="font-display text-2xl font-medium mt-10 mb-3">Existing analytics ecosystem</h3>
        <div className="border border-border bg-card rounded-sm divide-y divide-border">
          {EXISTING_STACK.map((s) => (
            <div key={s.name} className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3">
              <div className="font-display text-[15px] font-medium">{s.name}</div>
              <div className="text-[14px] text-foreground/80">{s.role}</div>
            </div>
          ))}
        </div>

        <Marginalia>
          Looker WAU already exceeds ~1,100. LookML is mature. Hex's value must be measured at the margin —
          what does it enable that the current stack cannot?
        </Marginalia>
      </Chapter>

      <Chapter id="thesis" number="02" title="Complement, not replace" kicker="Strategic thesis">
        <p className="pull-quote text-[22px] md:text-[26px] text-foreground border-l-2 border-primary pl-5 -ml-5">
          {THESIS}
        </p>
        <p>
          Replacing Looker, Tableau, or Looker Studio would create migration overhead, dependency risk, and
          duplicated functionality without unlocking commensurate value. The defensible adoption posture is to
          treat Hex as the <strong>advanced analytical application layer</strong>, sitting above governed
          dashboards and below conversational AI.
        </p>
        <Decision title="Adopt Hex narrowly and intentionally">
          Reserve Hex for the 15–20% of workflows that traditional analytics under-serves: interactive operational
          tools, custom investigations, embedded analytics, and modeling-heavy work. Do not commit to a
          wholesale analytics migration in this contract cycle.
        </Decision>
      </Chapter>

      <Chapter id="commercial" number="03" title="Commercial structure" kicker="Tiers · Platform · AI Modes">
        <p>
          Hex licenses access by role, not by usage. The pricing curve incentivizes a "narrow author core + mid
          explorer layer + wide viewer base" — the exact shape recommended for our organizational complexity.
        </p>

        <h3 className="font-display text-xl font-medium mt-8 mb-4">Three-tier seat model</h3>
        <div className="border border-border rounded-sm overflow-hidden">
          <table className="w-full text-[14px]">
            <thead className="bg-secondary/60">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-medium">Seat Tier</th>
                <th className="px-4 py-2.5 font-medium">List Price</th>
                <th className="px-4 py-2.5 font-medium">Capabilities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {SEAT_TIERS.map((t) => (
                <tr key={t.name} className="align-top">
                  <td className="px-4 py-3">
                    <div className="font-medium">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">{t.audience}</div>
                  </td>
                  <td className="px-4 py-3 font-mono tnum text-foreground/80">{t.list}</td>
                  <td className="px-4 py-3">
                    <div className="text-foreground/80 leading-snug">{t.capabilities}</div>
                    <div className="text-[11px] italic text-muted-foreground mt-1">{t.note}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-display text-xl font-medium mt-10 mb-4">Platform &amp; AI economics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border bg-card rounded-sm p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Deployment Modes</div>
            <div className="space-y-4">
              {PLATFORM_MODES.map((m) => (
                <div key={m.mode}>
                  <div className="flex items-baseline justify-between">
                    <div className="font-medium text-[15px]">{m.mode}</div>
                    <div className="font-mono text-xs text-muted-foreground">{m.list}</div>
                  </div>
                  <p className="text-[13px] text-foreground/70 mt-1">{m.benefits}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border bg-card rounded-sm p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">AI Credits vs BYOT</div>
            <div className="space-y-4">
              {AI_ECONOMICS.map((a) => (
                <div key={a.label}>
                  <div className="font-medium text-[15px]">{a.label}</div>
                  <p className="text-[13px] text-foreground/70 mt-1">{a.advantage}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-sm text-muted-foreground uppercase tracking-wider">{a.whoPays}</span>
                    <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded-sm text-muted-foreground uppercase tracking-wider">{a.pooling}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Decision title="Treat the platform fee as a primary negotiation lever">
          The $96k/yr single-tenant fee is list; in practice, it is the standard lever Hex uses to trade for seat commitments. If isolated infra is not a hard requirement, multi-tenant removes this line entirely.
        </Decision>
      </Chapter>

      <Chapter id="fit" number="04" title="Fit in the stack" kicker="Looker · Hex · Niki">
        <p>
          The clearest narrative for internal communication is a three-layer model. Niki remains the
          conversational access layer for organization-wide ad-hoc questions; Looker, Tableau, and Looker
          Studio remain the standardized reporting backbone; Hex slots in as the authoring surface for
          notebook-native, AI-assisted, and app-style analytical workflows.
        </p>

        <StackDiagram />

        <p className="mt-6">
          Importantly, Hex strengthens Niki rather than competing with it. Better semantic models, richer
          metadata, and observed exploratory behavior all flow back into the context Niki uses to recommend
          looks, dashboards, and studio assets. Over time the two surfaces may converge, but today they
          address different interaction modes.
        </p>
        <Marginalia>
          Explorers in Hex gain access to notebooks, custom modeling, and richer investigation than
          conversational analytics alone can offer.
        </Marginalia>
      </Chapter>

      <Chapter id="value" number="05" title="What Hex actually adds" kicker="Incremental value">
        <p>
          The capabilities below were validated against the sales call and the product surface. Each is
          framed as an incremental addition to today's stack, not a replacement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {VALUE_CAPABILITIES.map((c, i) => (
            <div key={c.title} className="border border-border bg-card rounded-sm p-5 lift">
              <div className="chapter-num mb-1">0{i + 1}</div>
              <div className="font-display text-lg font-medium leading-tight mb-1.5">{c.title}</div>
              <p className="text-[14px] text-foreground/80 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>

        <Decision title={VALUE_CALLOUT}>
          The commercial case is strongest when scoped to workflows traditional analytics cannot serve. Avoid
          paying author-seat prices for dashboards that already work in Looker.
        </Decision>
      </Chapter>

      <Chapter id="risks" number="06" title="Risks &amp; mitigations" kicker="Commercial · Strategic">
        <p>
          The substantive risks cluster around the AI economics and the semantic layer. Both are
          addressable, but only if we negotiate the right contractual protections now.
        </p>

        <div className="space-y-4 mt-4">
          {RISKS.map((r) => (
            <div key={r.title} className="border border-border bg-card rounded-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-medium leading-tight">{r.title}</div>
                  <p className="text-[14px] text-foreground/80 mt-1 leading-relaxed">{r.body}</p>
                </div>
                <SeverityPill severity={r.severity} />
              </div>
              <div className="px-5 py-3 bg-secondary/40 text-[13.5px] text-foreground/85">
                <span className="text-[10px] uppercase tracking-[0.22em] text-primary mr-2">Mitigation</span>
                {r.mitigation}
              </div>
            </div>
          ))}
        </div>

        <Decision title="Make AI credit transparency and BYOT contractually binding">
          List-price reductions mean little if Hex can re-price the credit-to-token ratio. We need explicit
          burn-rate visibility, the option to bring our own tokens, and the right to pool credits at the
          workspace level rather than per seat.
        </Decision>
      </Chapter>

      <Chapter id="negotiation" number="07" title="What we ask for" kicker="Negotiation priorities">
        <p>
          The asks are sequenced by leverage and economic impact. The first three are conditions of
          partnership; the remainder shape long-term operability.
        </p>

        <div className="border border-border rounded-sm overflow-hidden mt-4">
          <table className="w-full text-[14px]">
            <thead className="bg-secondary/60">
              <tr className="text-left">
                <th className="px-4 py-2.5 font-medium w-24">Priority</th>
                <th className="px-4 py-2.5 font-medium">Ask</th>
                <th className="px-4 py-2.5 font-medium">Rationale</th>
              </tr>
            </thead>
            <tbody>
              {NEGOTIATION_ASKS.map((a) => (
                <tr key={a.ask} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <PriorityPill p={a.priority as "High" | "Medium" | "Low"} />
                  </td>
                  <td className="px-4 py-3 font-medium">{a.ask}</td>
                  <td className="px-4 py-3 text-foreground/80">{a.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Marginalia>
          Volume discounts were referenced by Hex sales for "hundreds of seats." Anchor the explorer
          commitment against that threshold to compound discount with the other asks.
        </Marginalia>
      </Chapter>

      <Chapter id="rollout" number="08" title="Rollout scenarios" kicker="Controlled · Broad">
        <p>
          Two rollout shapes are useful: a controlled complement (recommended) and a broad rollout 
          that functions both as a stretch case and as a negotiation anchor.
        </p>
        <ScenarioCompare />
      </Chapter>

      <Chapter id="calculator" number="09" title="Pricing &amp; scenario simulator" kicker="Live commercial math">
        <p>
          The simulator below uses the inputs Hex sales surfaced on the call ($250 author, $40 explorer,
          $96k single-tenant platform fee) and lets you key in counter-pricing, toggle between 
          Standard and BYOT models, and watch the implied discount update live.
        </p>
        <PricingSimulator />
        <Marginalia>
          Numbers here are illustrative for negotiation modeling. The BYOT line is an estimate to compare
          against Hex-issued credits, not a Hex quote.
        </Marginalia>
      </Chapter>

      <Chapter id="appendix" number="10" title="Product visuals" kicker="From hex.tech &amp; learn.hex.tech">
        <p>
          A small curated gallery to ground the narrative in the actual product surface. Each image
          links back to the public Hex page it was captured from.
        </p>
        <VisualsGallery />
      </Chapter>

      <ClosingCTA />
    </PortalLayout>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="mb-20">
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
        Internal evaluation · Data &amp; AI · May 2026
      </div>
      <h1 className="display text-[58px] md:text-[80px] leading-[0.95] font-semibold tracking-tight">
        Hex.tech,<br />
        <span className="italic font-light text-foreground/85">opportunity examined.</span>
      </h1>
      <p className="mt-8 max-w-2xl text-[17px] leading-[1.75] text-foreground/80">
        A strategic framework for integrating Hex.tech into the modern analytics ecosystem. 
        This brief evaluates Hex as a high-leverage complement to our existing Looker and Niki 
        footprint, detailing the incremental value, commercial risks, and negotiation 
        priorities required to secure a sustainable partnership.
      </p>

      <div className="flex flex-wrap items-center gap-3 mt-8">
        <a href="#thesis" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-sm text-[14px] hover:opacity-95 transition-opacity">
          Read the brief <ArrowRight size={14} />
        </a>
        <Link href="/simulator" className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-sm text-[14px] hover:bg-secondary transition-colors">
          <Calculator size={14} /> Open simulator
        </Link>
        <Link href="/slides" className="inline-flex items-center gap-2 border border-border px-4 py-2.5 rounded-sm text-[14px] hover:bg-secondary transition-colors">
          <Presentation size={14} /> Present in slide mode
        </Link>
      </div>

      <div className="rule mt-14" />

      <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 mt-8 text-sm">
        <dt className="col-span-2 md:col-span-1 text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Prepared for</dt>
        <dd className="md:col-span-3">Data &amp; AI leadership · negotiation working group</dd>
        <dt className="col-span-2 md:col-span-1 text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Posture</dt>
        <dd className="md:col-span-3">Complement to existing analytics; controlled rollout; aggressive on commercial protections</dd>
        <dt className="col-span-2 md:col-span-1 text-muted-foreground uppercase tracking-[0.16em] text-[11px]">Key tension</dt>
        <dd className="md:col-span-3">Real product value vs opaque AI-credit economics and viewer-seat pricing at scale</dd>
      </dl>
    </section>
  );
}

function ClosingCTA() {
  return (
    <section className="mt-12 border border-primary/30 bg-primary/[0.04] rounded-sm p-8">
      <div className="chapter-num mb-2">Close · the ask</div>
      <h3 className="display text-3xl font-medium leading-tight">
        Hex as the advanced AI-native analytical app layer — sitting between conversational AI and traditional analytics.
      </h3>
      <p className="mt-3 text-[15px] text-foreground/85 max-w-3xl">
        Narrow authoring, wide viewing, controlled credit economics. Use the simulator to anchor the
        commercial position; use the slide mode to walk leadership through the narrative.
      </p>
      <div className="flex flex-wrap gap-3 mt-5">
        <Link href="/simulator" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-sm text-[14px]">
          <Calculator size={14} /> Open simulator <ArrowRight size={14} />
        </Link>
        <Link href="/slides" className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 rounded-sm text-[14px]">
          <Presentation size={14} /> Present in slide mode
        </Link>
      </div>
    </section>
  );
}

function SeverityPill({ severity }: { severity: "high" | "medium" | "low" }) {
  const cfg = {
    high:   { bg: "bg-destructive/10",  fg: "text-destructive",  label: "High" },
    medium: { bg: "bg-[oklch(0.92_0.08_75)]", fg: "text-[oklch(0.45_0.10_60)]", label: "Medium" },
    low:    { bg: "bg-secondary",       fg: "text-muted-foreground", label: "Low" },
  }[severity];
  return (
    <span className={`text-[10.5px] uppercase tracking-[0.18em] px-2 py-1 rounded-sm shrink-0 ${cfg.bg} ${cfg.fg}`}>
      {cfg.label}
    </span>
  );
}

function PriorityPill({ p }: { p: "High" | "Medium" | "Low" }) {
  const map = {
    High:   "bg-primary/10 text-primary",
    Medium: "bg-secondary text-foreground/80",
    Low:    "bg-secondary/60 text-muted-foreground",
  };
  return (
    <span className={`inline-block text-[10.5px] uppercase tracking-[0.18em] px-2 py-1 rounded-sm ${map[p]}`}>
      {p}
    </span>
  );
}
