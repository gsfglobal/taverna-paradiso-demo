"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { demoMode } from "@/config/site";
import { photos, type PhotoKey } from "@/data/photos";
import { type Locale, ui } from "@/lib/i18n";

export type Shot = {
  p: PhotoKey;
  s: [string, string];
  cat: "interni" | "tavoli" | "piatti" | "dettagli" | "esterni";
  r: string;
  span?: string;
};

const catLabel: Record<Shot["cat"], [string, string]> = {
  interni: ["Interni", "Interiors"],
  tavoli: ["Tavoli", "Tables"],
  piatti: ["Piatti", "Dishes"],
  dettagli: ["Dettagli", "Details"],
  esterni: ["Esterni", "Exterior"],
};

/** Griglia fotografica con filtri e lightbox accessibile (tastiera, Esc, frecce) */
export default function GalleryGrid({ locale, shots, filters = false }: { locale: Locale; shots: Shot[]; filters?: boolean }) {
  const it = locale === "it";
  const [cat, setCat] = useState<Shot["cat"] | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const list = cat === "all" ? shots : shots.filter((s) => s.cat === cat);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const cur = open !== null ? list[open] : null;

  return (
    <>
      {filters && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={it ? "Filtra le foto" : "Filter photos"}>
          {(["all", ...Object.keys(catLabel)] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c as Shot["cat"] | "all")}
              aria-pressed={cat === c}
              className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                cat === c ? "border-gold bg-gold/10 text-gold" : "border-cream/20 text-cream/75 hover:border-cream/40"
              }`}
            >
              {c === "all" ? (it ? "Tutte" : "All") : catLabel[c as Shot["cat"]][it ? 0 : 1]}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-4 md:grid-cols-4 md:gap-5">
        {list.map((x, i) => (
          <li key={x.p + i} className={x.span || ""} data-reveal>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className={`group relative block w-full overflow-hidden bg-espresso text-left ${x.r} h-full`}
              aria-label={`${it ? "Ingrandisci" : "Enlarge"}: ${x.s[it ? 0 : 1]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[x.p].src}
                alt={x.s[it ? 0 : 1]}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true" />
              <span className="absolute right-4 top-4 flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-cream/90 text-ink opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" aria-hidden="true">
                <Expand className="h-4 w-4" />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-gold">{catLabel[x.cat][it ? 0 : 1]}</span>
                <span className="display mt-1 block text-xl italic text-cream">{x.s[it ? 0 : 1]}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      {demoMode && (
        <p className="mt-6 text-xs text-cream/45">
          {it
            ? "Immagini illustrative (Unsplash): non ritraggono Taverna Paradiso e verranno sostituite dalle foto del locale."
            : "Illustrative images (Unsplash): they do not show Taverna Paradiso and will be replaced by the restaurant's own photos."}
        </p>
      )}

      {cur && (
        <div role="dialog" aria-modal="true" aria-label={cur.s[it ? 0 : 1]} className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm md:p-12" onClick={close}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[cur.p].src}
            alt={cur.s[it ? 0 : 1]}
            className="max-h-[82vh] max-w-full object-contain shadow-2xl animate-[lbIn_.5s_var(--ease-luxe)]"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-sm text-cream/80">
            <span className="display text-xl italic">{cur.s[it ? 0 : 1]}</span>
            {demoMode && <span className="ml-3 text-xs text-cream/50">{ui.illustrative[locale]} · Unsplash</span>}
          </p>
          <button type="button" onClick={close} autoFocus className="absolute right-5 top-5 rounded-full border border-cream/20 p-3 text-cream hover:border-gold hover:text-gold" aria-label={ui.close[locale]}>
            <X className="h-5 w-5" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-cream/20 p-3 text-cream hover:border-gold hover:text-gold md:left-8" aria-label={it ? "Foto precedente" : "Previous photo"}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-cream/20 p-3 text-cream hover:border-gold hover:text-gold md:right-8" aria-label={it ? "Foto successiva" : "Next photo"}>
            <ChevronRight className="h-5 w-5" />
          </button>
          <style>{`@keyframes lbIn{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:none}}`}</style>
        </div>
      )}
    </>
  );
}
