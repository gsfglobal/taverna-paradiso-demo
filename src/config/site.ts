/**
 * Configurazione centrale del sito Taverna Paradiso.
 * demoMode: true finché il titolare non approva il progetto.
 * Si controlla con la variabile d'ambiente NEXT_PUBLIC_DEMO_MODE ("false" per disattivare).
 * Fonti e date di verifica: vedi RESEARCH.md.
 */
export const demoMode = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.tavernaparadiso.it").replace(/\/$/, "");

export const restaurant = {
  name: "Taverna Paradiso",
  fullName: "Taverna Paradiso — Ristorante",
  since: 1980,
  phone: "+39 339 105 1967",
  phoneHref: "tel:+393391051967",
  /** Pubblicata solo su Facebook: DA CONFERMARE prima della messa online */
  email: "tavernaparadiso@live.it",
  emailToConfirm: true,
  /** Nessun numero WhatsApp verificato: lasciare null finché il titolare non lo conferma */
  whatsapp: null as string | null,
  street: "Via Roma 180",
  postalCode: "85028",
  city: "Rionero in Vulture",
  province: "PZ",
  region: "Basilicata",
  country: "IT",
  landmark: { it: "a circa 100 m dalla stazione ferroviaria", en: "about 100 m from the railway station" },
  geo: { lat: 40.9230295, lng: 15.6776669 },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Taverna+Paradiso+Via+Roma+180+Rionero+in+Vulture",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Taverna+Paradiso+Via+Roma+180+Rionero+in+Vulture",
  mapsEmbed: "https://www.google.com/maps?q=Taverna+Paradiso,+Via+Roma+180,+Rionero+in+Vulture&output=embed",
  instagram: "https://www.instagram.com/ristorantetavernaparadiso/",
  facebook: "https://www.facebook.com/p/Ristorante-Taverna-Paradiso-100063653675053/",
  tripadvisor:
    "https://www.tripadvisor.it/Restaurant_Review-g1234704-d5532245-Reviews-Taverna_Paradiso-Rionero_in_Vulture_Province_of_Potenza_Basilicata.html",
  googleReviews: "https://www.google.com/maps/search/?api=1&query=Taverna+Paradiso+Rionero+in+Vulture",
  priceRange: "€€",
};

/**
 * Orari: Tripadvisor (scheda rivendicata) e Google (via Wanderlog) letti il 20/11/2026;
 * mercoledì chiuso confermato dalla bio Instagram del locale.
 * La domenica sera è discordante: Google la indica aperta, Tripadvisor no.
 */
export type DayHours = { day: number; it: string; en: string; slots: [string, string][]; note?: { it: string; en: string } };
export const hours: DayHours[] = [
  { day: 1, it: "Lunedì", en: "Monday", slots: [["12:30", "15:00"], ["19:30", "22:00"]] },
  { day: 2, it: "Martedì", en: "Tuesday", slots: [["12:30", "15:00"], ["19:30", "22:00"]] },
  { day: 3, it: "Mercoledì", en: "Wednesday", slots: [] },
  { day: 4, it: "Giovedì", en: "Thursday", slots: [["12:30", "15:00"], ["19:30", "22:00"]] },
  { day: 5, it: "Venerdì", en: "Friday", slots: [["12:30", "15:00"], ["19:30", "22:00"]] },
  { day: 6, it: "Sabato", en: "Saturday", slots: [["12:30", "15:00"], ["19:30", "22:00"]] },
  {
    day: 0,
    it: "Domenica",
    en: "Sunday",
    slots: [["12:30", "15:00"], ["19:30", "22:00"]],
    note: { it: "cena da confermare", en: "dinner to be confirmed" },
  },
];
export const hoursToConfirm = true;

export const ratings = {
  tripadvisor: { value: 4.0, count: 217, checked: "20/11/2026", extra: { it: "N. 2 di 44 ristoranti a Rionero in Vulture", en: "No. 2 of 44 restaurants in Rionero in Vulture" } },
  google: { value: 4.4, count: 514, checked: "dato aggregato (Wanderlog) del 20/11/2026, da riconfermare su Google" },
  facebook: { percent: 94, count: 44, checked: "20/11/2026" },
};
