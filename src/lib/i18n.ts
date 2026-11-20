export type Locale = "it" | "en";

export type RouteKey =
  | "home"
  | "story"
  | "cuisine"
  | "menu"
  | "gallery"
  | "vulture"
  | "reviews"
  | "contact";

export const routes: Record<RouteKey, Record<Locale, string>> = {
  home: { it: "/", en: "/en" },
  story: { it: "/la-nostra-storia", en: "/en/our-story" },
  cuisine: { it: "/la-nostra-cucina", en: "/en/our-cuisine" },
  menu: { it: "/menu", en: "/en/menu" },
  gallery: { it: "/gallery", en: "/en/gallery" },
  vulture: { it: "/il-vulture", en: "/en/the-vulture" },
  reviews: { it: "/recensioni", en: "/en/reviews" },
  contact: { it: "/contatti", en: "/en/contact" },
};

export const navLabels: Record<RouteKey, Record<Locale, string>> = {
  home: { it: "Home", en: "Home" },
  story: { it: "La nostra storia", en: "Our story" },
  cuisine: { it: "La cucina", en: "Our cuisine" },
  menu: { it: "Menu", en: "Menu" },
  gallery: { it: "Gallery", en: "Gallery" },
  vulture: { it: "Il Vulture", en: "The Vulture" },
  reviews: { it: "Recensioni", en: "Reviews" },
  contact: { it: "Contatti", en: "Contact" },
};

export const mainNav: RouteKey[] = ["story", "cuisine", "menu", "vulture", "gallery", "reviews"];

export function href(key: RouteKey, locale: Locale) {
  return routes[key][locale];
}

/** Trova la stessa pagina nell'altra lingua */
export function alternatePath(pathname: string, target: Locale): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const key of Object.keys(routes) as RouteKey[]) {
    if (routes[key].it === clean || routes[key].en === clean) return routes[key][target];
  }
  return routes.home[target];
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "it";
}

export const ui = {
  book: { it: "Prenota il tuo tavolo", en: "Book your table" },
  bookShort: { it: "Prenota", en: "Book" },
  discover: { it: "Scopri la nostra cucina", en: "Discover our cuisine" },
  call: { it: "Chiama il ristorante", en: "Call the restaurant" },
  directions: { it: "Indicazioni stradali", en: "Get directions" },
  exploreMenu: { it: "Esplora il menu", en: "Explore the menu" },
  toConfirm: { it: "Da confermare", en: "To be confirmed" },
  hours: { it: "Orari", en: "Opening hours" },
  closed: { it: "Chiuso", en: "Closed" },
  address: { it: "Indirizzo", en: "Address" },
  readMore: { it: "Approfondisci", en: "Read more" },
  skip: { it: "Salta al contenuto", en: "Skip to content" },
  menuToggle: { it: "Apri il menu", en: "Open menu" },
  close: { it: "Chiudi", en: "Close" },
  photoPending: { it: "Foto autentica da fornire", en: "Authentic photo to be supplied" },
  illustrative: { it: "Immagine illustrativa", en: "Illustrative image" },
};

export function t<T extends Record<Locale, string>>(entry: T, locale: Locale) {
  return entry[locale];
}
