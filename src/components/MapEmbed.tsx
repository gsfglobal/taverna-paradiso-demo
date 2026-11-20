"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { restaurant } from "@/config/site";
import type { Locale } from "@/lib/i18n";
import { Arches } from "./Logo";

/**
 * Google Maps caricata solo su richiesta dell'utente (nessun cookie di terze parti prima del click).
 */
export default function MapEmbed({ locale }: { locale: Locale }) {
  const it = locale === "it";
  const [load, setLoad] = useState(false);
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-cream/10 bg-espresso sm:aspect-[4/3]">
      {load ? (
        <iframe
          title={it ? "Mappa: Taverna Paradiso, Via Roma 180, Rionero in Vulture" : "Map: Taverna Paradiso, Via Roma 180, Rionero in Vulture"}
          src={restaurant.mapsEmbed}
          className="absolute inset-0 h-full w-full grayscale-[35%] sepia-[20%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center">
          <svg className="absolute inset-0 h-full w-full opacity-[0.12]" aria-hidden="true">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="#d4c2a7" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <path d="M-20 300 C 200 240, 380 360, 900 200" stroke="#ba945c" strokeWidth="6" fill="none" />
            <path d="M300 -20 C 330 200, 280 400, 360 900" stroke="#d4c2a7" strokeWidth="3" fill="none" />
          </svg>
          <div className="relative flex flex-col items-center">
            <Arches className="h-10 w-auto text-gold" />
            <MapPin className="mt-3 h-8 w-8 text-terra" aria-hidden="true" />
            <p className="display mt-4 text-3xl text-cream">Via Roma 180</p>
            <p className="text-sm text-cream/60">85028 Rionero in Vulture (PZ)</p>
          </div>
          <button
            type="button"
            onClick={() => setLoad(true)}
            className="relative rounded-full border border-cream/25 px-6 py-3 text-sm text-cream transition-colors hover:border-gold hover:text-gold"
          >
            {it ? "Carica la mappa di Google" : "Load Google Maps"}
          </button>
          <p className="relative max-w-sm text-xs text-cream/45">
            {it
              ? "Caricando la mappa accetti i cookie di Google Maps. In alternativa usa il pulsante Indicazioni stradali."
              : "Loading the map accepts Google Maps cookies. Alternatively, use the Get directions button."}
          </p>
        </div>
      )}
    </div>
  );
}
