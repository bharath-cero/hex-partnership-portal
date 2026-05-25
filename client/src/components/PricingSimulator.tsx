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

const DEFAULT_AI_CREDITS_ANNUAL = 60000; // illustrative Hex credit purchase
const DEFAULT_BYOT_ANNUAL       = 36000; // illustrative BYOT spend

function inputsFromScenario(s: RolloutScenario, base = LIST_PRICES): PricingInputs {
  const d = s.recommendedDiscount;
  return {
    viewerSeats: s.viewers,
    explorerSeats: s.explorers,
    authorSeats: s.authors,
    listViewer: base.viewer,
    listExplorer: base.explorer,
    listAuthor: base.author,
    listPlatformAnnual: base.platformAnnual,
    negViewer: round2(base.viewer * (1 - d.viewer)),
    negExplorer: round2(base.explorer * (1 - d.explorer)),
    negAuthor: round2(base.author * (1 - d.author)),
    negPlatformAnnual: Math.round(base.platformAnnual * (1 - d.platform)),
    byot: s.byot,
    aiCreditsAnnual: DEFAULT_AI_CREDITS_ANNUAL,
    byotEstimateAnnual: DEFAULT_BYOT_ANNUAL,
  };
}

function round2(n: number) { return Math.round(n * 100) / 100; }

export function PricingSimulator({ variant = "inline" }: Props) {
  const [scenarioId, setScenarioId] = useState<RolloutScenario["id"]>("controlled");
  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const [inputs, setInputs] = useState<PricingInputs>(() => inputsFromScenario(scenario));

  // When scenario changes, reset inputs to that scenario's defaults
  useEffect(() => {
    setInputs(inputsFromScenario(scenario));
  }, [scenarioId]); // eslint-disable-line react-hooks/exhaustive-deps

  const result = useMemo(() => calculatePricing(inputs), [inputs]);

  // Smoothly animate the total
  const animatedTotal = useAnimatedNumber(result.totalNegotiated);
  const animatedDiscount = useAnimatedNumber(result.impliedDiscountPct);

  function update<K extends keyof PricingInputs>(key: K, value: PricingInputs[K]) {
    setInputs((prev) => ({ ...prev, [key]: value }));
  }

  function resetScenario() {
    setInputs(inputsFromScenario(scenario));
  }

  return (
    <div className={variant === "page" ? "" : "border border-border rounded-sm bg-card overflow-hidden"}>
      {/* Scenario chips */}
      <div className="px-5 pt-5 pb-3 border-b border-border flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Pricing &amp; scenario simulator
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
          {/* Seat counts */}
          <Block title="Seat counts" subtitle="Configure rollout shape.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NumberField label="Authors / admins" hint="Notebook & app builders" value={inputs.authorSeats} step={1} min={0} onChange={(v) => update("authorSeats", v)} />
              <NumberField label="Explorers"        hint="Threads + self-serve"   value={inputs.explorerSeats} step={5} min={0} onChange={(v) => update("explorerSeats", v)} />
              <NumberField label="Viewers"          hint="Consume data apps"      value={inputs.viewerSeats} step={50} min={0} onChange={(v) => update("viewerSeats", v)} />
            </div>
          </Block>

          {/* List vs negotiated */}
          <Block title="Seat pricing" subtitle="List comes from Hex sales call; negotiated is our counter-offer.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PriceField label="Author"   list={inputs.listAuthor}   neg={inputs.negAuthor}   onList={(v) => update("listAuthor", v)}   onNeg={(v) => update("negAuthor", v)}   suffix="/mo" />
              <PriceField label="Explorer" list={inputs.listExplorer} neg={inputs.negExplorer} onList={(v) => update("listExplorer", v)} onNeg={(v) => update("negExplorer", v)} suffix="/mo" />
              <PriceField label="Viewer"   list={inputs.listViewer}   neg={inputs.negViewer}   onList={(v) => update("listViewer", v)}   onNeg={(v) => update("negViewer", v)}   suffix="/mo" />
            </div>
          </Block>

          {/* Platform fee */}
          <Block title="Single-tenant platform fee" subtitle="Hex sales referenced $96k/yr list; we are anchoring lower.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PriceField label="Platform (list)"      list={inputs.listPlatformAnnual} neg={inputs.negPlatformAnnual} onList={(v) => update("listPlatformAnnual", v)} onNeg={(v) => update("negPlatformAnnual", v)} suffix="/yr" annual />
              <div className="self-end text-[13px] text-muted-foreground">
                <span className="font-mono tnum">{fmtPct(((inputs.listPlatformAnnual - inputs.negPlatformAnnual) / Math.max(1, inputs.listPlatformAnnual)) * 100, 0)}</span>{" "}
                fee reduction vs list.
              </div>
            </div>
          </Block>

          {/* AI economics */}
          <Block title="AI economics" subtitle="Hex credits vs Bring-Your-Own-Tokens (BYOT).">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="block text-[12px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                  Mode
                </label>
                <div className="inline-flex border border-border rounded-sm overflow-hidden">
                  <button
                    onClick={() => update("byot", false)}
                    className={`px-3 py-2 text-[12.5px] ${!inputs.byot ? "bg-primary text-primary-foreground" : "bg-card text-foreground/80"}`}
                  >
                    Hex AI credits
                  </button>
                  <button
                    onClick={() => update("byot", true)}
                    className={`px-3 py-2 text-[12.5px] inline-flex items-center gap-1 ${inputs.byot ? "bg-primary text-primary-foreground" : "bg-card text-foreground/80"}`}
                  >
                    <Sparkles size={12} /> BYOT
                  </button>
                </div>
              </div>
              <NumberField
                label={inputs.byot ? "BYOT spend (est. annual)" : "Hex credits (annual)"}
                hint={inputs.byot ? "Model + infra estimate under your control" : "Hex-issued credits, per workspace"}
                value={inputs.byot ? inputs.byotEstimateAnnual : inputs.aiCreditsAnnual}
                step={1000}
                min={0}
                onChange={(v) => inputs.byot ? update("byotEstimateAnnual", v) : update("aiCreditsAnnual", v)}
                prefix="$"
              />
              <div className="text-[12.5px] text-muted-foreground leading-snug">
                BYOT centralizes token economics and avoids opaque credit-to-token re-pricing. Hex credits remain useful for low-volume pilots.
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
                    label={inputs.byot ? "AI · BYOT (you control)" : "AI · Hex credits"}
                    list={inputs.byot ? 0 : inputs.aiCreditsAnnual}
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
            <SummaryRow label={inputs.byot ? "BYOT spend" : "Hex credits"}  value={fmtUSD(result.aiAnnual)} />

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
