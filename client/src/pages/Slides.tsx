/**
 * Slides — clean fullscreen presenter for the brief.
 * Editorial style preserved: serif headlines, restrained motion, decision blocks.
 */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { SLIDES } from "@/lib/content";
import { HexMark } from "@/components/PortalLayout";
import { ChevronLeft, ChevronRight, X, FileText } from "lucide-react";

export default function Slides() {
  const [idx, setIdx] = useState(0);
  const [, setLocation] = useLocation();
  const slide = SLIDES[idx];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setIdx((i) => Math.min(SLIDES.length - 1, i + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIdx((i) => Math.max(0, i - 1));
      } else if (e.key === "Escape") {
        setLocation("/");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <HexMark />
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Hex.tech · Partnership Brief
              </div>
              <div className="font-display text-[14px] font-semibold">Slide mode</div>
            </div>
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-muted-foreground font-mono tnum text-[12px]">
              {idx + 1} / {SLIDES.length}
            </span>
            <Link href="/" className="inline-flex items-center gap-1.5 text-[12.5px] text-foreground/80 hover:text-foreground border border-border px-2.5 py-1.5 rounded-sm">
              <FileText size={13} /> Brief
            </Link>
            <Link href="/" className="p-1.5 hover:bg-secondary rounded-sm" aria-label="Exit">
              <X size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Slide */}
      <main className="flex-1 grid place-items-center px-6 py-10">
        <article key={idx} className="w-full max-w-5xl animate-slide-in">
          <SlideBody slide={slide} />
        </article>
      </main>

      {/* Footer controls */}
      <div className="border-t border-border">
        <div className="container py-3 flex items-center justify-between">
          <button
            onClick={() => setIdx((i) => Math.max(0, i - 1))}
            disabled={idx === 0}
            className="inline-flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-sm border border-border disabled:opacity-40 hover:bg-secondary"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <div className="hidden md:flex items-center gap-1">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-primary" : "w-4 bg-border hover:bg-muted-foreground/50"}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIdx((i) => Math.min(SLIDES.length - 1, i + 1))}
            disabled={idx === SLIDES.length - 1}
            className="inline-flex items-center gap-1.5 text-[13px] px-3 py-2 rounded-sm bg-primary text-primary-foreground disabled:opacity-40"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Local animation */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideIn 280ms cubic-bezier(0.23, 1, 0.32, 1) both; }
      `}</style>
    </div>
  );
}

function SlideBody({ slide }: { slide: typeof SLIDES[number] }) {
  if (slide.variant === "title") {
    return (
      <div className="text-center">
        <div className="chapter-num mb-6">{slide.kicker}</div>
        <h1 className="display text-6xl md:text-8xl font-semibold leading-[0.95] tracking-tight">
          {slide.title}
        </h1>
        <p className="mt-8 text-[18px] text-foreground/80 max-w-2xl mx-auto">{slide.body}</p>
        <div className="rule w-40 mx-auto mt-12" />
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mt-6">
          Data &amp; AI · Negotiation working group
        </div>
      </div>
    );
  }

  if (slide.variant === "image" && slide.image) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 items-center">
        <div>
          <div className="chapter-num mb-3">{slide.kicker}</div>
          <h2 className="display text-4xl md:text-5xl font-medium leading-[1.05] mb-5">{slide.title}</h2>
          <p className="text-[16px] text-foreground/85 leading-[1.7]">{slide.body}</p>
          {slide.bullets && (
            <ul className="mt-5 space-y-2 text-[15px]">
              {slide.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-primary">·</span>{b}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="border border-border rounded-sm overflow-hidden bg-card">
          <img src={slide.image} alt="" className="w-full h-auto" />
        </div>
      </div>
    );
  }

  if (slide.variant === "numbers" && slide.bullets) {
    return (
      <div>
        <div className="chapter-num mb-3">{slide.kicker}</div>
        <h2 className="display text-4xl md:text-5xl font-medium leading-[1.05] mb-6">{slide.title}</h2>
        <p className="text-[17px] text-foreground/85 max-w-3xl">{slide.body}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {slide.bullets.map((b) => {
            const parts = b.split(/\s(.+)/);
            return (
              <div key={b} className="border border-border bg-card rounded-sm p-5">
                <div className="font-display tnum text-3xl font-semibold">{parts[0]}</div>
                <div className="text-[13px] text-muted-foreground mt-1">{parts[1] || ""}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (slide.variant === "decision") {
    return (
      <div>
        <div className="chapter-num mb-3">{slide.kicker}</div>
        <h2 className="display text-4xl md:text-5xl font-medium leading-[1.05] mb-6">{slide.title}</h2>
        <p className="text-[17px] text-foreground/85 max-w-3xl">{slide.body}</p>
        {slide.bullets && (
          <div className="decision rounded-sm px-6 py-5 mt-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-primary mb-3">Decision-ready takeaway</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-[15px]">
              {slide.bullets.map((b) => (
                <li key={b} className="flex gap-2"><span className="text-primary">·</span>{b}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // section
  return (
    <div>
      <div className="chapter-num mb-3">{slide.kicker}</div>
      <h2 className="display text-5xl md:text-6xl font-medium leading-[1.02] mb-6">{slide.title}</h2>
      <p className="text-[18px] text-foreground/85 leading-[1.7] max-w-3xl">{slide.body}</p>
      {slide.bullets && (
        <ul className="mt-6 space-y-2 text-[16px] max-w-3xl">
          {slide.bullets.map((b) => (
            <li key={b} className="flex gap-2"><span className="text-primary">·</span>{b}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
