/**
 * Struttura dati del menu.
 * È la stessa struttura che l'interfaccia /admin modifica ed esporta in JSON.
 * Prezzi pubblicati SOLO per le voci lette sul menu cartaceo del locale (foto di un utente, ~ago 2026):
 * restano "da confermare". Per gli altri piatti il prezzo è null (non inventato).
 * Gli allergeni NON sono stati compilati: vanno inseriti dal ristorante (Reg. UE 1169/2011).
 */

export type Localized = { it: string; en: string };

export type AllergenId =
  | "glutine" | "crostacei" | "uova" | "pesce" | "arachidi" | "soia" | "latte"
  | "frutta-guscio" | "sedano" | "senape" | "sesamo" | "solfiti" | "lupini" | "molluschi";

export const allergens: { id: AllergenId; it: string; en: string }[] = [
  { id: "glutine", it: "Glutine", en: "Gluten" },
  { id: "crostacei", it: "Crostacei", en: "Crustaceans" },
  { id: "uova", it: "Uova", en: "Eggs" },
  { id: "pesce", it: "Pesce", en: "Fish" },
  { id: "arachidi", it: "Arachidi", en: "Peanuts" },
  { id: "soia", it: "Soia", en: "Soy" },
  { id: "latte", it: "Latte", en: "Milk" },
  { id: "frutta-guscio", it: "Frutta a guscio", en: "Tree nuts" },
  { id: "sedano", it: "Sedano", en: "Celery" },
  { id: "senape", it: "Senape", en: "Mustard" },
  { id: "sesamo", it: "Sesamo", en: "Sesame" },
  { id: "solfiti", it: "Anidride solforosa e solfiti", en: "Sulphites" },
  { id: "lupini", it: "Lupini", en: "Lupin" },
  { id: "molluschi", it: "Molluschi", en: "Molluscs" },
];

export type CategoryId = "antipasti" | "primi" | "secondi" | "formaggi" | "contorni" | "dolci" | "bevande" | "vini";

export const categories: { id: CategoryId; label: Localized; intro: Localized }[] = [
  { id: "antipasti", label: { it: "Antipasti", en: "Starters" }, intro: { it: "Salumi, formaggi e verdure del territorio.", en: "Local cured meats, cheeses and vegetables." } },
  { id: "primi", label: { it: "Primi", en: "First courses" }, intro: { it: "Pasta fatta a mano, come vuole la tradizione lucana.", en: "Handmade pasta, the Lucanian way." } },
  { id: "secondi", label: { it: "Secondi", en: "Main courses" }, intro: { it: "Carni, arrosti e baccalà.", en: "Meat, roasts and salt cod." } },
  { id: "formaggi", label: { it: "Formaggi ai ferri", en: "Grilled cheeses" }, intro: { it: "Dal menu cartaceo del locale.", en: "From the restaurant's printed menu." } },
  { id: "contorni", label: { it: "Contorni", en: "Sides" }, intro: { it: "Verdure e accompagnamenti.", en: "Vegetables and sides." } },
  { id: "dolci", label: { it: "Dolci e frutta", en: "Desserts & fruit" }, intro: { it: "Per chiudere in dolcezza.", en: "To finish sweetly." } },
  { id: "bevande", label: { it: "Bevande", en: "Drinks" }, intro: { it: "Acque, bibite e digestivi.", en: "Water, soft drinks and digestifs." } },
  { id: "vini", label: { it: "Vini", en: "Wines" }, intro: { it: "Il territorio nel bicchiere, a partire dall'Aglianico del Vulture.", en: "The land in a glass, starting with Aglianico del Vulture." } },
];

export type MenuItem = {
  id: string;
  category: CategoryId;
  name: Localized;
  description: Localized;
  /** null = prezzo non pubblicato */
  price: number | null;
  allergens: AllergenId[];
  /** true se gli allergeni sono stati compilati e verificati dal ristorante */
  allergensVerified: boolean;
  seasonal: boolean;
  available: boolean;
  signature: boolean;
  /** Fonte da cui il piatto è stato ricavato */
  source: string;
  /** true finché il ristorante non conferma che il piatto è nel menu corrente */
  toConfirm: boolean;
  image?: string;
};

const MENU = "Menu cartaceo del locale (foto caricata su Restaurant Guru, ~ago 2026)";
const TA = "Recensioni Tripadvisor (2023–2026)";
const GO = "Recensioni Google (via Wanderlog)";

type Seed = Omit<MenuItem, "allergens" | "allergensVerified" | "available" | "seasonal" | "signature" | "toConfirm"> &
  Partial<Pick<MenuItem, "seasonal" | "signature" | "toConfirm" | "available">>;

const item = (x: Seed): MenuItem => ({
  allergens: [],
  allergensVerified: false,
  available: true,
  seasonal: false,
  signature: false,
  toConfirm: true,
  ...x,
});

export const menuItems: MenuItem[] = [
  item({
    id: "antipasto-taverna", category: "antipasti", signature: true,
    name: { it: "Antipasto della taverna", en: "The taverna's starter platter" },
    description: {
      it: "Salumi e formaggi del territorio con verdure locali: il modo in cui la casa apre il pranzo.",
      en: "Local cured meats and cheeses with vegetables from the area: the house way to open a meal.",
    },
    price: null, source: `${TA}; ${GO}`,
  }),
  item({
    id: "bruschetta", category: "antipasti",
    name: { it: "Bruschetta calda", en: "Warm bruschetta" },
    description: { it: "Pane caldo, olio extravergine. Anche nella versione ai porcini, citata dagli ospiti.", en: "Warm bread and extra-virgin olive oil; guests also mention a porcini version." },
    price: null, source: `${TA}; ${GO}`,
  }),
  item({
    id: "trittico-lucano", category: "antipasti",
    name: { it: "Trittico lucano", en: "Lucanian trio" },
    description: { it: "Tre assaggi della tradizione: composizione da confermare con la cucina.", en: "Three traditional tastings: composition to be confirmed with the kitchen." },
    price: null, source: TA,
  }),
  item({
    id: "strascinati-cruschi", category: "primi", signature: true,
    name: { it: "Strascinati con peperoni cruschi e mollica", en: "Strascinati with crusco peppers and toasted breadcrumbs" },
    description: {
      it: "La pasta trascinata a mano sul tagliere, con peperoni cruschi croccanti e mollica tostata.",
      en: "Pasta dragged by hand across the board, with crunchy crusco peppers and toasted breadcrumbs.",
    },
    price: null, source: GO,
  }),
  item({
    id: "orecchiette-panfritto", category: "primi", signature: true,
    name: { it: "Orecchiette con panfritto e peperone crusco", en: "Orecchiette with fried bread and crusco pepper" },
    description: { it: "Orecchiette fatte in casa, pane fritto e peperone crusco sbriciolato.", en: "Homemade orecchiette, fried bread and crumbled crusco pepper." },
    price: null, source: `${GO}; ${TA}`,
  }),
  item({
    id: "ravioli-casa", category: "primi", signature: true,
    name: { it: "Ravioli della casa", en: "House ravioli" },
    description: { it: "Ravioli fatti a mano; gli ospiti ricordano la versione con mandorle e asparagi.", en: "Handmade ravioli; guests remember a version with almonds and asparagus." },
    price: null, seasonal: true, source: TA,
  }),
  item({
    id: "fusilli-funghi-noci", category: "primi",
    name: { it: "Fusilli funghi e noci", en: "Fusilli with mushrooms and walnuts" },
    description: { it: "Pasta con funghi e noci.", en: "Pasta with mushrooms and walnuts." },
    price: null, seasonal: true, source: TA,
  }),
  item({
    id: "agnello-cacciatora", category: "secondi", signature: true,
    name: { it: "Agnello alla cacciatora", en: "Lamb alla cacciatora" },
    description: { it: "Agnello cotto lentamente alla cacciatora, da accompagnare con l'Aglianico.", en: "Slow-cooked lamb cacciatora-style, best with an Aglianico." },
    price: null, source: TA,
  }),
  item({
    id: "baccala-cruschi", category: "secondi", signature: true,
    name: { it: "Baccalà con peperoni cruschi", en: "Salt cod with crusco peppers" },
    description: { it: "Il baccalà della tradizione lucana con i peperoni cruschi.", en: "Lucanian-style salt cod with crusco peppers." },
    price: null, source: `${TA}; ${GO}`,
  }),
  item({
    id: "arrosto-misto", category: "secondi",
    name: { it: "Arrosto misto", en: "Mixed roast" },
    description: { it: "Grigliata e arrosto di carni, anche nella versione all'Aglianico citata dagli ospiti.", en: "Grilled and roasted meats, including the Aglianico version guests mention." },
    price: null, source: TA,
  }),
  item({
    id: "salsiccia-lucana", category: "secondi",
    name: { it: "Salsiccia lucana", en: "Lucanian sausage" },
    description: { it: "Con peperoni cruschi.", en: "With crusco peppers." },
    price: null, source: TA,
  }),
  item({ id: "scamorza-ferri", category: "formaggi", name: { it: "Scamorza ai ferri", en: "Grilled scamorza" }, description: { it: "", en: "" }, price: 6, source: MENU }),
  item({ id: "caciocavallo-ferri", category: "formaggi", name: { it: "Caciocavallo ai ferri", en: "Grilled caciocavallo" }, description: { it: "", en: "" }, price: 7, source: MENU }),
  item({ id: "misto-formaggi", category: "formaggi", name: { it: "Misto di formaggi ai ferri", en: "Mixed grilled cheeses" }, description: { it: "", en: "" }, price: 7, source: MENU }),
  item({ id: "insalata-verde", category: "contorni", name: { it: "Insalata verde", en: "Green salad" }, description: { it: "", en: "" }, price: 2, source: MENU }),
  item({ id: "insalata-mista", category: "contorni", name: { it: "Insalata mista", en: "Mixed salad" }, description: { it: "", en: "" }, price: 2.5, source: MENU }),
  item({ id: "patatine", category: "contorni", name: { it: "Patatine fritte", en: "French fries" }, description: { it: "", en: "" }, price: 3, source: MENU }),
  item({ id: "verdure-grigliate", category: "contorni", name: { it: "Verdure grigliate", en: "Grilled vegetables" }, description: { it: "", en: "" }, price: 4, source: MENU }),
  item({ id: "dolce-casa", category: "dolci", name: { it: "Dolce della casa", en: "House dessert" }, description: { it: "Chiedere in sala il dolce del giorno.", en: "Ask our staff for today's dessert." }, price: 5, source: MENU }),
  item({ id: "frutta-stagione", category: "dolci", name: { it: "Frutta di stagione", en: "Seasonal fruit" }, description: { it: "", en: "" }, price: 3, source: MENU }),
  item({ id: "castagne", category: "dolci", seasonal: true, name: { it: "Castagne", en: "Chestnuts" }, description: { it: "In autunno, i prodotti del Vulture.", en: "In autumn, produce of the Vulture." }, price: null, source: TA }),
  item({ id: "acque", category: "bevande", name: { it: "Acque minerali", en: "Mineral water" }, description: { it: "Selezione da confermare.", en: "Selection to be confirmed." }, price: null, source: "Da compilare" }),
  item({ id: "digestivo", category: "bevande", name: { it: "Digestivo della casa", en: "House digestif" }, description: { it: "Citato dagli ospiti a fine pasto.", en: "Mentioned by guests at the end of the meal." }, price: null, source: TA }),
  item({
    id: "aglianico-casa", category: "vini", signature: false,
    name: { it: "Aglianico della casa", en: "House Aglianico" },
    description: { it: "Il rosso del Vulture, consigliato dal personale in abbinamento. Etichette in carta da pubblicare.", en: "The red of the Vulture, suggested by the staff. Labels on the list to be published." },
    price: null, source: TA,
  }),
];

export const signatureDishes = menuItems.filter((m) => m.signature);
