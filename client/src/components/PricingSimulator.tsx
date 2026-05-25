/**
 * PricingSimulator — interactive commercial scenario tool.
 * Layout: 3-pane lab (inputs / live narrative / sticky summary).
 * Honors editorial design: ivory paper, ink type, emerald accent, tabular numerals.
 */
import { useEffect, useMemo, useState } from "react";
import { LIST_PRICES, SCENARIOS, type RolloutScenario } from "@/lib/content";
import { calculatePricing, fmtUSD, fmtPct, fmtInt, type PricingInputs } from "@/lib/pricing";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";

interface Props {
  variant?: "inline" | "page";
}

const DEFAULT_AI_CREDITS_ANNUAL = 60000;
const DEFAULT_BYOT_ANNUAL       = 120000;

function round2(n: number) { return Math.round(n * 100) / 100; }

function inputsFromScenario(s: RolloutScenario, byotMode: boolean, base = LIST_PRICES): PricingInputs {
  const d = s.recommendedDiscount;
  // Apply specific discount targets based on mode as requested
  const targetDiscount = byotMode ? 0.75 : 0.50;
  
  return {
    viewerSeats: s.viewers,
    explorerSeats: s.explorers,
    authorSeats: s.authors,
    listViewer: base.viewer,
    listExplorer: base.explorer,
    listAuthor: base.author,
    listPlatformAnnual: base.platformAnnual,
    negViewer: 0, // Free viewers as requested
    negExplorer: round2(base.explorer * (1 - targetDiscount)),
    negAuthor: round2(base.author * (1 - targetDiscount)),
    negPlatformAnnual: Math.round(base.platformAnnual * (1 - d.platform)),
    byot: byotMode,
    aiCreditsAnnual: DEFAULT_AI_CREDITS_ANNUAL,
    byotEstimateAnnual: DEFAULT_BYOT_ANNUAL,
  };
}

export function PricingSimulator({ variant = "inline" }: Props) {
  const [scenarioId, setScenarioId] = useState<RolloutScenario["id"]>("controlled");
  const [byotMode, setByotMode] = useState<boolean>(false);
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const [inputs, setInputs] = useState<PricingInputs>(() => inputsFromScenario(scenario, false));

  // When scenario or mode changes, reset inputs
  useEffect(() => {
    setInputs(inputsFromScenario(scenario, byotMode));
  }, [scenarioId, byotMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => calculatePricing(inputs), [inputs]);

  // Smoothly animate numeric values
  const animatedTotal = useAnimatedNumber(result.totalNegotiated);
  const animatedDiscount = useAnimatedNumber(result.impliedDiscountPct);

  function update<K extends keyof PricingInputs>(key: K, value: PricingInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function resetScenario() {
    setInputs(inputsFromScenario(scenario, byotMode));
  }

  return (
    <div className={variant === "page" ? "" : "border border-border rounded-sm bg-card overflow-hidden"}>
      {/* AI Mode Tabs */}
      <div className="flex border-b border-border bg-secondary/20">
        <button
          onClick={() => setByotMode(false)}
          className={`flex-1 py-3 text-[13px] font-medium tracking-wide uppercase transition-colors ${!byotMode ? "bg-card text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          Standard Model (50% target)
        </button>
        <button
          onClick={() => setByotMode(true)}
          className={`flex-1 py-3 text-[13px] font-medium tracking-wide uppercase transition-colors ${byotMode ? "bg-card text-foreground border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          BYOT Model (75% target)
        </button>
      </div>

      {/* Scenario chips */}
      <div className="px-5 pt-5 pb-3 border-b border-border flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {byotMode ? "Bring Your Own Tokens Model" : "Standard Per-Seat Credit Model"}
          </div>
          <div className="font-display text-2xl font-medium mt-1">
            {scenario.name}
          </div>
          <div className="text-[14px] text-muted-foreground mt-1 max-w-2xl">
            {scenario.oneliner}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              data-active={s.id === scenarioId}
              onClick={() => setScenarioId(s.id)}
              className="chip relative px-3.5 py-2 text-[13px] rounded-sm hover:bg-secondary transition-colors data-[active=true]:text-foreground text-muted-foreground"
            >
              {s.name.split(" ")[0]}
            </button>
          ))}
          <button
            onClick={resetScenario}
            className="ml-2 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground px-2 py-1.5 rounded-sm"
            title="Reset to scenario defaults"
          >
            <RotateCcw size={12} /> reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Inputs + narrative */}
        <div className="p-6 space-y-8">
          {/* Narrative / Strategy Callout */}
          <div className="bg-primary/[0.03] border border-primary/10 rounded-sm p-4 text-[14px] leading-relaxed italic text-foreground/80">
            {byotMode ? (
              <p>
                <strong>BYOT Strategy:</strong> Pooled tokens at the workspace level. High up-front discounts (75%) 
                offset the requirement to cover all token use (including Review and App Builder agents). 
                Best for uneven usage and centralized cost management.
              </p>
            ) : (
              <p>
                <strong>Standard Strategy:</strong> Seat-based non-transferable credits. Gratis agent token use. 
                Targeting 50% discount to list to justify per-seat overhead.
              </p>
            )}
          </div>

          {/* Seat counts */}
          <Block title="Seat counts" subtitle="Configure rollout shape. Viewers are assumed free ($0).">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NumberField label="Authors / admins" hint="Notebook & app builders" value={inputs.authorSeats} step={1} min={0} onChange={(v) => update("authorSeats", v)} />
              <NumberField label="Explorers"        hint="Threads + self-serve"   value={inputs.explorerSeats} step={5} min={0} onChange={(v) => update("explorerSeats", v)} />
              <NumberField label="Viewers"          hint="Consume data apps"      value={inputs.viewerSeats} step={50} min={0} onChange={(v) => update("viewerSeats", v)} />
            </div>
          </Block>

          {/* List vs negotiated */}
          <Block title="Seat pricing" subtitle="Calculated based on model-specific discount targets.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PriceField label="Author"   list={inputs.listAuthor}   neg={inputs.negAuthor}   onList={(v) => update("listAuthor", v)}   onNeg={(v) => update("negAuthor", v)}   suffix="/mo" />
              <PriceField label="Explorer" list={inputs.listExplorer} neg={inputs.negExplorer} onList={(v) => update("listExplorer", v)} onNeg={(v) => update("negExplorer", v)} suffix="/mo" />
              <div className="opacity-50 grayscale pointer-events-none">
                <PriceField label="Viewer (Target: $0)"   list={inputs.listViewer}   neg={0}   onList={() => {}}   onNeg={() => {}}   suffix="/mo" />
              </div>
            </div>
          </Block>

          {/* Platform fee */}
          <Block title="Single-tenant platform fee" subtitle="Hex list is $96k/yr; we are anchoring for material reduction.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PriceField label="Platform (list)"      list={inputs.listPlatformAnnual} neg={inputs.negPlatformAnnual} onList={(v) => update("listPlatformAnnual", v)} onNeg={(v) => update("negPlatformAnnual", v)} suffix="/yr" annual />
              <div className="self-end text-[13px] text-muted-foreground">
                <span className="font-mono tnum">{fmtPct(((inputs.listPlatformAnnual - inputs.negPlatformAnnual) / Math.max(1, inputs.listPlatformAnnual)) * 100, 0)}</span>{" "}
                fee reduction vs list.
              </div>
            </div>
          </Block>

          {/* AI economics */}
          <Block title="AI costs" subtitle={byotMode ? "Pooled workspace tokens" : "Hex per-seat credits"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <NumberField
                label={byotMode ? "BYOT spend (est. annual)" : "Hex shared credits (annual)"}
                hint={byotMode ? "Tokens for Review/App agents + user use" : "Gratis agent use + user seat credits"}
                value={byotMode ? inputs.byotEstimateAnnual : inputs.aiCreditsAnnual}
                step={1000}
                min={0}
                onChange={(v) => byotMode ? update("byotEstimateAnnual", v) : update("aiCreditsAnnual", v)}
                prefix="$"
              />
              <div className="text-[12.5px] text-muted-foreground leading-snug">
                {byotMode 
                  ? "Everything is pooled at the workspace level. Cover token use for all agents in exchange for steeper seat discounts."
                  : "Standard seat credits + gratis token use for Review and App Builder agents. Best for predictable individual usage."}
              </div>
            </div>
          </Block>

          {/* Line items */}
          <Block title="Line-item breakdown" subtitle="Annualized, in USD.">
            <div className="border border-border rounded-sm overflow-hidden">
              <table className="w-full text-[13.5px]">
                <thead className="bg-secondary/60">
                  <tr className="text-left">
                    <th className="px-4 py-2.5 font-medium">Line</th>
                    <th className="px-4 py-2.5 font-medium text-right">List (annual)</th>
                    <th className="px-4 py-2.5 font-medium text-right">Negotiated</th>
                    <th className="px-4 py-2.5 font-medium text-right">Δ</th>
                  </tr>
                </thead>
                <tbody className="font-mono tnum">
                  <Row label={`Authors × ${fmtInt(inputs.authorSeats)}`}     list={result.authorListAnnual}     neg={result.authorNegAnnual} />
                  <Row label={`Explorers × ${fmtInt(inputs.explorerSeats)}`} list={result.explorerListAnnual}   neg={result.explorerNegAnnual} />
                  <Row label={`Viewers × ${fmtInt(inputs.viewerSeats)}`}     list={result.viewerListAnnual}     neg={result.viewerNegAnnual} />
                  <Row label="Single-tenant platform fee"                    list={result.platformListAnnual}   neg={result.platformNegAnnual} />
                  <Row
                    label={byotMode ? "AI · BYOT (you control)" : "AI · Hex shared credits"}
                    list={byotMode ? 0 : inputs.aiCreditsAnnual}
                    neg={result.aiAnnual}
                  />
                </tbody>
                <tfoot>
                  <tr className="border-t border-border bg-secondary/40">
                    <td className="px-4 py-3 font-medium">Total</td>
                    <td className="px-4 py-3 font-mono tnum text-right">{fmtUSD(result.totalList)}</td>
                    <td className="px-4 py-3 font-mono tnum text-right font-semibold">{fmtUSD(result.totalNegotiated)}</td>
                    <td className="px-4 py-3 font-mono tnum text-right text-primary">−{fmtUSD(result.totalSavings)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </Block>
        </div>

        {/* Sticky summary */}
        <aside className="lg:border-l border-border bg-secondary/30">
          <div className="lg:sticky lg:top-24 p-6 space-y-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Implied discount
              </div>
              <div className="font-display tnum text-5xl font-semibold mt-1">
                {fmtPct(animatedDiscount, 1)}
              </div>
              <div className="text-[12.5px] text-muted-foreground mt-1">
                vs Hex list across seats, platform &amp; AI
              </div>
            </div>

            <div className="rule" />

            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Annualized total
              </div>
              <div className="font-display tnum text-3xl font-semibold mt-1">
                {fmtUSD(animatedTotal)}
              </div>
              <div className="text-[12.5px] text-muted-foreground mt-1">
                {fmtUSD(result.blendedPerSeat)} / seat blended
              </div>
            </div>

            <div className="rule" />

            <SummaryRow label="Authors"   value={fmtInt(inputs.authorSeats)} />
            <SummaryRow label="Explorers" value={fmtInt(inputs.explorerSeats)} />
            <SummaryRow label="Viewers"   value={fmtInt(inputs.viewerSeats)} />
            <SummaryRow label="Total seats" value={fmtInt(result.totalSeats)} />
            <div className="rule" />
            <SummaryRow label="Seat cost (neg.)"     value={fmtUSD(result.authorNegAnnual + result.explorerNegAnnual + result.viewerNegAnnual)} />
            <SummaryRow label="Platform fee (neg.)"  value={fmtUSD(result.platformNegAnnual)} />
            <SummaryRow label={byotMode ? "BYOT spend" : "AI costs"}  value={fmtUSD(result.aiAnnual)} />

            <div className="rule" />

            <div className="text-[12.5px] leading-snug">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-1">Scenario thesis</div>
              <p className="text-foreground/80">{scenario.thesis}</p>
            </div>

            <a
              href="#calculator"
              className="inline-flex items-center gap-1 text-[12.5px] text-primary"
            >
              compare scenarios <ArrowRight size={12} />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ---------- helpers ---------- */

function Block({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3">
        <div className="font-display text-lg font-medium">{title}</div>
        {subtitle && <div className="text-[13px] text-muted-foreground">{subtitle}</div>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, list, neg }: { label: string; list: number; neg: number }) {
  const delta = neg - list;
  return (
    <tr className="border-t border-border">
      <td className="px-4 py-2.5">{label}</td>
      <td className="px-4 py-2.5 text-right text-muted-foreground">{fmtUSD(list)}</td>
      <td className="px-4 py-2.5 text-right">{fmtUSD(neg)}</td>
      <td className={`px-4 py-2.5 text-right ${delta < 0 ? "text-primary" : delta > 0 ? "text-destructive" : "text-muted-foreground"}`}>
        {delta === 0 ? "—" : (delta < 0 ? "−" : "+") + fmtUSD(Math.abs(delta))}
      </td>
    </tr>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between text-[13px]">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono tnum">{value}</span>
    </div>
  );
}

function NumberField({
  label, hint, value, onChange, step = 1, min = 0, prefix,
}: {
  label: string; hint?: string; value: number; onChange: (v: number) => void;
  step?: number; min?: number; prefix?: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        {hint && <span className="text-[11px] text-muted-foreground">{hint}</span>}
      </div>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">{prefix}</span>}
        <input
          type="number"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value || 0))}
          className={`w-full border border-input bg-background rounded-sm py-2 text-right font-mono tnum text-[15px] focus:outline-none focus:ring-2 focus:ring-ring ${prefix ? "pl-8 pr-3" : "px-3"}`}
        />
      </div>
    </label>
  );
}

function PriceField({
  label, list, neg, onList, onNeg, suffix, annual,
}: {
  label: string;
  list: number; neg: number;
  onList: (v: number) => void; onNeg: (v: number) => void;
  suffix?: string; annual?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        <span className="text-[11px] text-muted-foreground">
          list / negotiated {suffix}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="number" min={0} step={annual ? 1000 : 1}
          value={list}
          onChange={(e) => onList(Number(e.target.value || 0))}
          className="border border-input bg-background rounded-sm py-2 px-3 text-right font-mono tnum text-[14px] text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="number" min={0} step={annual ? 1000 : 1}
          value={neg}
          onChange={(e) => onNeg(Number(e.target.value || 0))}
          className="border border-primary/40 bg-primary/5 rounded-sm py-2 px-3 text-right font-mono tnum text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </div>
  );
}

/* Smoothly tween numeric values for executive polish. */
function useAnimatedNumber(target: number, ms = 500) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = value;
    const delta = target - from;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(from + delta * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}
