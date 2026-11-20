"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, type ReactNode, useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { href, type Locale, ui } from "@/lib/i18n";
import { restaurant } from "@/config/site";

const TavernaScene = dynamic(() => import("./three/TavernaScene"), { ssr: false });

type Mode = "pending" | "3d" | "static";

function canRun3D(): boolean {
  if (typeof window === "undefined") return false;
  // Override per test e presentazioni: ?scene=3d oppure ?scene=static
  const forced = new URLSearchParams(window.location.search).get("scene");
  if (forced === "static") return false;
  if (forced === "3d") return hasWebGL();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 3) return false;
  if ((navigator.hardwareConcurrency || 8) < 4) return false;
  return hasWebGL();
}

function hasWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Se la scena 3D fallisce per qualsiasi motivo resta il fondo statico: la pagina non si rompe mai */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const copy = {
  eyebrow: { it: "Cucina lucana dal 1980 · Rionero in Vulture", en: "Lucanian cooking since 1980 · Rionero in Vulture" },
  title1: { it: "Il Vulture ha", en: "The Vulture tastes" },
  title2: { it: "il sapore di casa.", en: "like home." },
  sub: {
    it: "A Rionero in Vulture, i sapori della tradizione lucana incontrano il piacere di stare insieme.",
    en: "In Rionero in Vulture, the flavours of Lucanian tradition meet the pleasure of being together.",
  },
  scroll: { it: "Scorri", en: "Scroll" },
};

export default function Hero({ locale }: { locale: Locale }) {
  const [mode, setMode] = useState<Mode>("pending");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setCompact(window.innerWidth < 768);
    setMode(canRun3D() ? "3d" : "static");
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#1f1914]" aria-labelledby="hero-title">
      {/* Fondo: statico subito, 3D quando pronto */}
      <div className="hero-static absolute inset-0" aria-hidden="true" />
      {mode === "3d" && (
        <SceneBoundary>
          <TavernaScene compact={compact} />
        </SceneBoundary>
      )}

      {/* Velature per leggibilità */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1a1511]/90 via-[#1a1511]/45 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-ink via-ink/85 to-transparent md:h-56 md:via-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#1a1511]/80 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-end px-6 pb-24 md:justify-center md:px-12 md:pb-0">
        <p className="eyebrow mb-6 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_0.2s_forwards]">{copy.eyebrow[locale]}</p>
        <h1 id="hero-title" className="display max-w-[12ch] text-[clamp(3.2rem,8vw,7.6rem)] text-cream">
          <span className="block opacity-0 animate-[fadeUp_1.4s_var(--ease-luxe)_0.35s_forwards]">{copy.title1[locale]}</span>
          <span className="block italic text-sand opacity-0 animate-[fadeUp_1.4s_var(--ease-luxe)_0.55s_forwards]">
            {copy.title2[locale]}
          </span>
        </h1>
        <p className="mt-8 max-w-md text-base leading-relaxed text-cream/80 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_0.8s_forwards] md:text-lg">
          {copy.sub[locale]}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-[fadeUp_1.2s_var(--ease-luxe)_1s_forwards]">
          <Link
            href={href("contact", locale) + "#prenota"}
            data-track="hero"
            className="group inline-flex items-center gap-3 rounded-full bg-terra-deep px-7 py-4 text-sm font-semibold tracking-wide text-cream transition-colors duration-500 hover:bg-gold hover:text-ink"
          >
            {ui.book[locale]}
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href={href("cuisine", locale)}
            className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-4 text-sm font-medium tracking-wide text-cream backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:text-gold"
          >
            {ui.discover[locale]}
          </Link>
          <a href={restaurant.phoneHref} data-track="hero" className="link-underline ml-1 text-sm text-cream/70 hover:text-cream">
            {restaurant.phone}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/60 md:flex" aria-hidden="true">
        <span className="eyebrow text-[0.6rem]">{copy.scroll[locale]}</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </div>

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion: reduce){[class*="animate-[fadeUp"]{animation:none!important;opacity:1!important}}`}</style>
    </section>
  );
}
