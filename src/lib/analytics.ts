/**
 * Eventi di conversione. Nessun tracciamento finché non c'è il consenso ai cookie statistici.
 * In produzione: collegare GA4 (gtag) o Plausible dopo il banner di consenso (vedi README).
 * In demo gli eventi vengono solo registrati in console per mostrare il funzionamento.
 */
export type TrackEvent =
  | "phone_click"
  | "booking_cta_click"
  | "menu_view"
  | "directions_click"
  | "booking_request_submitted";

type W = Window & { dataLayer?: unknown[]; __analyticsConsent?: boolean };

export function track(event: TrackEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  if (process.env.NEXT_PUBLIC_DEMO_MODE !== "false") {
    console.info("[analytics demo]", event, params);
    return;
  }
  if (!w.__analyticsConsent) return;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
