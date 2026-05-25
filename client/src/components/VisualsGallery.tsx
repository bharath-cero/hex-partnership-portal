import { useState } from "react";
import { VISUALS } from "@/lib/content";
import { X } from "lucide-react";

const TAGS = ["All", "Notebook", "Data apps", "AI & agents", "Threads", "Semantic", "Workspace"] as const;
type Tag = typeof TAGS[number];

export function VisualsGallery() {
  const [tag, setTag] = useState<Tag>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = VISUALS.filter((v) => tag === "All" || v.tag === tag);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-1 mb-5">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            data-active={t === tag}
            className="chip relative px-3 py-1.5 text-[12.5px] rounded-sm hover:bg-secondary transition-colors data-[active=true]:text-foreground text-muted-foreground"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((v, i) => (
          <figure key={v.src} className="lift border border-border rounded-sm bg-card overflow-hidden">
            <button onClick={() => setLightbox(VISUALS.indexOf(v))} className="block w-full text-left">
              <div className="aspect-[16/10] bg-secondary/40 border-b border-border overflow-hidden">
                <img
                  src={v.src}
                  alt={v.title}
                  className="w-full h-full object-cover object-top"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              </div>
              <figcaption className="p-4">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <div className="font-display text-lg font-medium leading-tight">{v.title}</div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground whitespace-nowrap">
                    {v.tag}
                  </span>
                </div>
                <p className="text-[13px] text-foreground/80 leading-snug">{v.blurb}</p>
                <div className="text-[11px] text-muted-foreground mt-2 marginalia">{v.source}</div>
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/85 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-background/90 hover:text-background p-2"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <figure className="max-w-6xl w-full">
            <img
              src={VISUALS[lightbox].src}
              alt={VISUALS[lightbox].title}
              className="w-full h-auto rounded-sm shadow-2xl"
            />
            <figcaption className="text-background/85 text-sm mt-3 text-center">
              <span className="font-display text-base">{VISUALS[lightbox].title}</span> · {VISUALS[lightbox].source}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
