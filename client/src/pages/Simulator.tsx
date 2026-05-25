import { PortalLayout } from "@/components/PortalLayout";
import { PricingSimulator } from "@/components/PricingSimulator";
import { ScenarioCompare } from "@/components/ScenarioCompare";

export default function Simulator() {
  return (
    <PortalLayout>
      <section className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
          08 · Pricing &amp; scenario simulator
        </div>
        <h1 className="display text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
          Pressure-test the commercial.
        </h1>
        <p className="mt-6 max-w-2xl text-[16px] leading-[1.75] text-foreground/80">
          Pick a rollout shape, key in counter-pricing, toggle BYOT, and watch implied discount and
          annualized total update live. The list inputs are anchored on the Hex sales call: $250/mo author,
          $40/mo explorer, $96k/yr single-tenant platform fee. Viewer list is treated as a negotiation
          variable — push for $0.
        </p>
      </section>

      <PricingSimulator variant="page" />

      <section className="mt-16">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
          Compare scenarios at a glance
        </div>
        <h2 className="display text-3xl font-medium mb-5">Three shapes, three commercial postures.</h2>
        <ScenarioCompare />
      </section>
    </PortalLayout>
  );
}
