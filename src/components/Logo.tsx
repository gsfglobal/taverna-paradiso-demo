/**
 * Marchio provvisorio ridisegnato: tre archi con raggiera, come nel logo reale del locale
 * (che riprende il portico ad archi della facciata). Va sostituito con il file vettoriale originale.
 */
export function Arches({ className = "", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  const arch = (x: number) => (
    <g key={x} transform={`translate(${x} 0)`}>
      {Array.from({ length: 9 }).map((_, i) => {
        const a = Math.PI + (Math.PI * (i + 0.5)) / 9;
        const r1 = 13.5;
        const r2 = 17;
        return (
          <line
            key={i}
            x1={14 + Math.cos(a) * r1}
            y1={22 + Math.sin(a) * r1}
            x2={14 + Math.cos(a) * r2}
            y2={22 + Math.sin(a) * r2}
            stroke={stroke}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        );
      })}
      <path d="M3 38 V22 a11 11 0 0 1 22 0 V38" fill="none" stroke={stroke} strokeWidth="2.6" />
      <path d="M7 38 V22.5 a7 7 0 0 1 14 0 V38" fill="none" stroke={stroke} strokeWidth="1" opacity=".7" />
    </g>
  );
  return (
    <svg viewBox="0 0 92 42" className={className} aria-hidden="true">
      {[0, 32, 64].map(arch)}
      <path d="M1 40 Q46 30 91 40" fill="none" stroke={stroke} strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ size = "md", tone = "light" }: { size?: "md" | "lg"; tone?: "light" | "dark" }) {
  const big = size === "lg";
  const color = tone === "light" ? "text-cream" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-3 leading-none ${color}`} translate="no">
      <Arches className={big ? "h-11 w-auto" : "h-8 w-auto"} />
      <span className="inline-flex flex-col">
        <span className={`display italic ${big ? "text-[2.4rem]" : "text-[1.55rem]"} tracking-tight`}>Taverna Paradiso</span>
        <span className={`mt-1 font-sans ${big ? "text-[0.66rem]" : "text-[0.52rem]"} uppercase tracking-[0.42em] opacity-70`}>
          Ristorante · dal 1980
        </span>
      </span>
    </span>
  );
}
