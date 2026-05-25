import type { ReactNode } from "react";

interface ChapterProps {
  id: string;
  number: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}

export function Chapter({ id, number, title, kicker, children }: ChapterProps) {
  return (
    <section id={id} className="scroll-mt-24 mb-24">
      <header className="mb-8">
        <div className="chapter-num mb-2">
          <span className="tnum">{number}</span>
          {kicker && <span className="mx-2">·</span>}
          {kicker && <span>{kicker}</span>}
        </div>
        <h2 className="display text-4xl md:text-5xl text-foreground">
          {title}
        </h2>
        <div className="rule mt-6" />
      </header>
      <div className="space-y-6 text-[16px] leading-[1.75] text-foreground/85">
        {children}
      </div>
    </section>
  );
}

export function Decision({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="decision rounded-sm px-6 py-5 mt-8">
      <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-1">
        Decision-ready takeaway
      </div>
      <div className="font-display text-xl font-medium mb-2">{title}</div>
      <div className="text-[15px] leading-relaxed text-foreground/85">{children}</div>
    </aside>
  );
}

export function Marginalia({ children }: { children: ReactNode }) {
  return (
    <aside className="marginalia text-[14px] leading-snug border-l-2 border-border pl-4 my-6">
      {children}
    </aside>
  );
}
