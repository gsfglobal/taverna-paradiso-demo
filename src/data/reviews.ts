/**
 * Sintesi di recensioni pubbliche reali (parafrasate, non citazioni integrali).
 * In produzione sostituire con testimonianze scelte dal titolare, con link alla fonte.
 */
export type ReviewSummary = {
  author: string;
  source: "Google" | "Tripadvisor";
  date: string;
  rating?: number;
  it: string;
  en: string;
  url: string;
};

const TA =
  "https://www.tripadvisor.it/Restaurant_Review-g1234704-d5532245-Reviews-Taverna_Paradiso-Rionero_in_Vulture_Province_of_Potenza_Basilicata.html";
const GO = "https://www.google.com/maps/search/?api=1&query=Taverna+Paradiso+Rionero+in+Vulture";

export const reviewSummaries: ReviewSummary[] = [
  {
    author: "Esmeralda G.", source: "Tripadvisor", date: "set 2024", rating: 5,
    it: "Arredamento accogliente e rustico, porzioni generose: consigliate le orecchiette e l'agnello alla cacciatora con l'Aglianico della casa.",
    en: "Cosy, rustic décor and generous portions: the orecchiette and the lamb cacciatora with the house Aglianico are recommended.",
    url: TA,
  },
  {
    author: "Lucia S.", source: "Tripadvisor", date: "ott 2025", rating: 5,
    it: "Una trattoria lucana genuina: bruschetta calda di benvenuto, primi saporiti, grigliata ben assortita e dolci artigianali.",
    en: "A genuine Lucanian trattoria: a warm welcome bruschetta, tasty pasta, a generous grill and artisanal desserts.",
    url: TA,
  },
  {
    author: "Ospite Google", source: "Google", date: "recensione su Google",
    it: "Strascinati piccoli e fatti davvero alla lucana, con peperoni cruschi e una mollica leggera e croccante.",
    en: "Small strascinati made truly the Lucanian way, with crusco peppers and light, crunchy breadcrumbs.",
    url: GO,
  },
  {
    author: "Saridduvisor", source: "Tripadvisor", date: "lug 2025", rating: 5,
    it: "Una taverna dove ci si sente in famiglia: cucina semplice e buona, pochi tavoli e tanta gentilezza con il nostro bambino.",
    en: "A taverna where you feel like family: simple, good food, few tables and real kindness towards our little one.",
    url: TA,
  },
  {
    author: "paolo m.", source: "Tripadvisor", date: "mar 2024", rating: 4,
    it: "Pranzo prenotato dopo la visita ai Laghi di Monticchio: diversi primi, arrosto all'Aglianico e conto onesto.",
    en: "Lunch booked after visiting the Monticchio lakes: several pasta dishes, a roast in Aglianico and a fair bill.",
    url: TA,
  },
  {
    author: "Agnese P.", source: "Tripadvisor", date: "nov 2025", rating: 5,
    it: "Locale pulito e curato, personale gentilissimo e un titolare simpatico. Ottimo vino, prezzi molto accessibili.",
    en: "Clean, well-kept, very kind staff and a friendly owner. Excellent wine, very affordable prices.",
    url: TA,
  },
];

/** Temi ricorrenti emersi dall'analisi di circa 36 recensioni (vedi RESEARCH.md) */
export const reviewThemes = [
  { it: "Primi fatti in casa", en: "Homemade pasta", note: { it: "Il piatto più lodato: strascinati, orecchiette, ravioli.", en: "The most praised dish: strascinati, orecchiette, ravioli." } },
  { it: "Accoglienza familiare", en: "Family welcome", note: { it: "Titolare simpatico, personale cordiale, attenzione ai bambini.", en: "A friendly owner, warm staff, kind to children." } },
  { it: "Prezzi onesti", en: "Honest prices", note: { it: "Il rapporto qualità-prezzo torna in quasi ogni recensione.", en: "Value for money comes up in almost every review." } },
  { it: "Vino del territorio", en: "Local wine", note: { it: "L'Aglianico della casa, consigliato in abbinamento.", en: "The house Aglianico, suggested as a pairing." } },
];
