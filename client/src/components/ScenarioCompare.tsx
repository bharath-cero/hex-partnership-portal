import { LIST_PRICES, SCENARIOS } from "@/lib/content";
import { calculatePricing, fmtUSD, fmtPct, fmtInt } from "@/lib/pricing";

function buildInputs(scenarioIdx: number) {
  const s = SCENARIOS[scenarioIdx];
  const d = s.recommendedDiscount;
  return calculatePricing({
    viewerSeats: s.viewers, explorerSeats: s.explorers, authorSeats: s.authors,
    listViewer: LIST_PRICES.viewer, listExplorer: LIST_PRICES.explorer, listAuthor: LIST_PRICES.author,
    listPlatformAnnual: LIST_PRICES.platformAnnual,
    negViewer: Math.round(LIST_PRICES.viewer * (1 - d.viewer) * 100) / 100,
    negExplorer: Math.round(LIST_PRICES.explorer * (1 - d.explorer) * 100) / 100,
    negAuthor: Math.round(LIST_PRICES.author * (1 - d.author) * 100) / 100,
    negPlatformAnnual: Math.round(LIST_PRICES.platformAnnual * (1 - d.platform)),
    byot: s.byot,
    aiCreditsAnnual: 60000,
    byotEstimateAnnual: 36000,
  });
}

export function ScenarioCompare() {
  const rows = SCENARIOS.map((s, i) => ({ scenario: s, result: buildInputs(i) }));
  return (
    <div className="border border-border rounded-sm bg-card overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
        {rows.map(({ scenario, result }, idx) => (
          <div key={scenario.id} className={`p-6 ${idx === 0 ? "bg-primary/5" : ""}`}>
            <div className="flex items-baseline justify-between mb-2">
              <div className="chapter-num">0{idx + 1} · Scenario</div>
              {idx === 0 && (
                <span className="text-[10px] uppercase tracking-[0.18em] text-primary border border-primary/40 px-1.5 py-0.5 rounded-sm">
                  Recommended
                </span>
              )}
            </div>
            <div className="font-display text-2xl font-medium leading-tight">
              {scenario.name}
            </div>
            <p className="text-[13px] text-muted-foreground mt-1.5 leading-snug min-h-[3.2rem]">
              {scenario.oneliner}
            </p>
            <div className="rule my-4" />

            <dl className="text-[13px] space-y-1.5">
              <Row label="Authors / Explorers / Viewers"
                   value={`${fmtInt(scenario.authors)} / ${fmtInt(scenario.explorers)} / ${fmtInt(scenario.viewers)}`} />
              <Row label="AI mode" value={scenario.byot ? "BYOT (workspace-pooled)" : "Hex credits"} />
              <Row label="Implied discount" value={fmtPct(result.impliedDiscountPct, 1)} highlight />
            </dl>

            <div className="mt-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Annualized total</div>
              <div className="font-display tnum text-3xl font-semibold mt-1">{fmtUSD(result.totalNegotiated)}</div>
              <div className="text-[11.5px] text-muted-foreground tnum">
                vs list {fmtUSD(result.totalList)} · save {fmtUSD(result.totalSavings)}
              </div>
            </div>

            <p className="text-[12.5px] text-foreground/80 leading-snug mt-5 marginalia">
              {scenario.thesis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={`font-mono tnum text-right ${highlight ? "text-primary font-semibold" : ""}`}>{value}</dd>
    </div>
  );
}
