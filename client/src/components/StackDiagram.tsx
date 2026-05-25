import { STACK_LAYERS } from "@/lib/content";

const HEX_BADGE = "bg-primary text-primary-foreground";
const NEUTRAL = "bg-secondary text-secondary-foreground";

export function StackDiagram() {
  return (
    <div className="border border-border rounded-sm overflow-hidden bg-card">
      <div className="px-5 py-4 border-b border-border flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Stack fit</div>
          <div className="font-display text-lg font-medium">Hex as the advanced analytical app layer</div>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] text-muted-foreground">
          <Legend swatch={HEX_BADGE} label="Hex" />
          <Legend swatch={NEUTRAL} label="Existing" />
        </div>
      </div>
      <div className="divide-y divide-border">
        {STACK_LAYERS.map((layer) => (
          <div key={layer.tier} className="grid grid-cols-[140px_1fr] gap-4 px-5 py-4">
            <div className="text-[12px] uppercase tracking-[0.16em] text-muted-foreground self-center">
              {layer.tier}
            </div>
            <div className="flex flex-wrap gap-2">
              {layer.items.map((item) => {
                const isHex = item.toLowerCase().includes("hex");
                return (
                  <span
                    key={item}
                    className={`text-[12.5px] px-2.5 py-1 rounded-sm tnum ${
                      isHex ? HEX_BADGE : NEUTRAL
                    }`}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Legend({ swatch, label }: { swatch: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`inline-block w-3 h-3 rounded-sm ${swatch}`} />
      {label}
    </span>
  );
}
