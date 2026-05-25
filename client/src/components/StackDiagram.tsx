import React from "react";
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
      
      <div className="p-5 grid grid-cols-[160px_140px_1fr] gap-x-6 gap-y-0 relative">
        {/* Niki straddle badge - spans first two rows of the 3-column grid */}
        <div className="hidden md:flex row-start-1 row-end-3 col-start-2 items-center py-4">
          <div className={`w-full h-full flex items-center justify-center text-center text-[12px] px-3 py-4 rounded-sm tnum ${NEUTRAL} border border-border shadow-sm`}>
            Niki (conversational AI)
          </div>
        </div>

        {STACK_LAYERS.map((layer, idx) => {
          const isStraddled = idx < 2;
          return (
            <React.Fragment key={layer.tier}>
              <div className="col-start-1 py-4 text-[11px] uppercase tracking-[0.16em] text-muted-foreground self-center border-t border-border/50">
                {layer.tier}
              </div>
              <div className={`${isStraddled ? "col-start-3" : "col-start-2 col-end-4"} py-4 flex flex-wrap gap-2 border-t border-border/50`}>
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
                {/* Fallback for mobile Niki */}
                {idx === 0 && (
                  <span className={`text-[12.5px] px-2.5 py-1 rounded-sm tnum ${NEUTRAL} md:hidden`}>
                    Niki (conversational AI)
                  </span>
                )}
              </div>
            </React.Fragment>
          );
        })}
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
