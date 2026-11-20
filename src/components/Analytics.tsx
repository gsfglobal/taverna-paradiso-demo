"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Intercetta i click su telefono, prenotazione e indicazioni; registra la visualizzazione del menu. */
export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (/\/menu\/?$/.test(pathname || "")) track("menu_view", { path: pathname });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      if (!a) return;
      const h = a.getAttribute("href") || "";
      if (h.startsWith("tel:")) track("phone_click", { location: a.dataset.track || "link" });
      else if (h.includes("#prenota")) track("booking_cta_click", { location: a.dataset.track || "link" });
      else if (h.includes("google.com/maps/dir")) track("directions_click");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
