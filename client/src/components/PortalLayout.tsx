/**
 * PortalLayout — editorial two-column shell.
 * Design: "Boardroom Editorial" — ivory paper, ink type, emerald accent,
 * sticky chapter rail on the left, wide reading column on the right.
 */
import { Link, useLocation } from "wouter";
import { CHAPTERS } from "@/lib/content";
import { useEffect, useState } from "react";
import { Presentation, FileText, Calculator } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

export function PortalLayout({ children }: Props) {
  const [active, setActive] = useState<string>("context");
  const [location] = useLocation();

  useEffect(() => {
    if (location !== "/") return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [location]);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="container flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <HexMark />
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Hex.tech · Partnership Brief
              </div>
              <div className="font-display text-[15px] font-semibold tnum">
                Opportunity Portal — May 2026
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-1.5 text-sm">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-sm text-foreground/80 hover:text-foreground hover:bg-secondary inline-flex items-center gap-1.5 transition-colors"
            >
              <FileText size={14} /> Brief
            </Link>
            <Link
              href="/simulator"
              className="px-3 py-1.5 rounded-sm text-foreground/80 hover:text-foreground hover:bg-secondary inline-flex items-center gap-1.5 transition-colors"
            >
              <Calculator size={14} /> Simulator
            </Link>
            <Link
              href="/slides"
              className="px-3 py-1.5 rounded-sm bg-primary text-primary-foreground inline-flex items-center gap-1.5 hover:opacity-95"
            >
              <Presentation size={14} /> Slide mode
            </Link>
          </nav>
        </div>
      </header>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)] gap-12">
          {/* Sticky chapter rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
                Chapters
              </div>
              <ol className="space-y-2">
                {CHAPTERS.map((c) => {
                  const isActive = active === c.id;
                  return (
                    <li key={c.id}>
                      <a
                        href={`#${c.id}`}
                        className={`group flex items-baseline gap-3 py-1 transition-colors ${
                          isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="font-display italic text-xs w-6 tnum">{c.number}</span>
                        <span className="flex-1">
                          <span className={`block text-[13px] leading-tight ${isActive ? "font-medium" : ""}`}>
                            {c.title}
                          </span>
                          <span className="block text-[11px] text-muted-foreground">{c.kicker}</span>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ol>
              <div className="rule my-6" />
              <div className="text-[11px] text-muted-foreground leading-relaxed marginalia">
                Source: structured notes from the Sr. Director of Data &amp; AI, plus the May 18 intro call with Hex (Barry &amp; Josie).
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main>{children}</main>
        </div>
      </div>

      <footer className="border-t border-border mt-24">
        <div className="container py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-display text-lg font-semibold">Hex Opportunity Portal</div>
            <div className="text-muted-foreground mt-1">
              Executive brief, scenario simulator, and slide companion. Self-hostable.
            </div>
          </div>
          <div className="text-muted-foreground">
            <div className="text-[11px] uppercase tracking-[0.18em] mb-2">Sources</div>
            <ul className="space-y-1">
              <li>Structured notes — Sr. Director, Data &amp; AI</li>
              <li>Sales intro call — Hex (Barry &amp; Josie), May 18</li>
              <li>Public visuals — hex.tech &amp; learn.hex.tech</li>
            </ul>
          </div>
          <div className="text-muted-foreground">
            <div className="text-[11px] uppercase tracking-[0.18em] mb-2">Disclaimer</div>
            Internal evaluation working document. Numbers are illustrative inputs for negotiation modeling, not a Hex commercial proposal.
          </div>
        </div>
      </footer>
    </div>
  );
}

export function HexMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 2 L29 9.5 L29 22.5 L16 30 L3 22.5 L3 9.5 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M16 2 L16 30 M3 9.5 L29 22.5 M29 9.5 L3 22.5" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}
