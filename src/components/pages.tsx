import { Clock, Mail, Phone, HeartHandshake, Users, Utensils } from "lucide-react";
import { demoMode, restaurant } from "@/config/site";
import { menuItems } from "@/data/menu";
import { href, type Locale, ui } from "@/lib/i18n";
import CtaBand from "./CtaBand";
import GalleryGrid, { type Shot } from "./GalleryGrid";
import Hero from "./Hero";
import { HoursList } from "./Hours";
import { Arches } from "./Logo";
import MenuView from "./MenuView";
import {
  Aglianico, Atmosphere, Booking, Dishes, Flavours, Location, MenuTeaser, Reviews, Signatures, Territory, Welcome,
} from "./sections/home";
import TiltCard from "./TiltCard";
import { ButtonLink, Container, PageHero, PhotoFrame, SectionHeading, ToConfirm } from "./ui";

type P = { locale: Locale };

/* HOME — 12 sezioni + footer ----------------------------------------- */
export function HomePage({ locale }: P) {
  return (
    <>
      <Hero locale={locale} /> {/* 01 */}
      <Welcome locale={locale} /> {/* 02 */}
      <Flavours locale={locale} /> {/* 03 */}
      <Dishes locale={locale} /> {/* 04 */}
      <Signatures locale={locale} /> {/* 05 */}
      <MenuTeaser locale={locale} /> {/* 06 */}
      <Territory locale={locale} /> {/* 07 */}
      <Aglianico locale={locale} /> {/* 08 */}
      <Atmosphere locale={locale} /> {/* 09 */}
      <Reviews locale={locale} /> {/* 10 */}
      <Booking locale={locale} /> {/* 11 */}
      <Location locale={locale} /> {/* 12 */}
    </>
  );
}

/* LA NOSTRA STORIA ---------------------------------------------------- */
export function StoryPage({ locale }: P) {
  const it = locale === "it";
  const values = [
    {
      icon: HeartHandshake,
      t: it ? "Accoglienza di famiglia" : "A family welcome",
      d: it
        ? "Gli ospiti raccontano di un titolare simpatico e di un personale che mette a proprio agio, bambini compresi."
        : "Guests talk about a good-humoured owner and staff who make everyone feel at ease, children included.",
    },
    {
      icon: Utensils,
      t: it ? "Cucina della tradizione" : "Traditional cooking",
      d: it
        ? "Specialità tipiche lucane: pasta fatta a mano, peperoni cruschi, salumi e formaggi, carni e baccalà."
        : "Typical Lucanian specialities: handmade pasta, crusco peppers, cured meats and cheeses, meat and salt cod.",
    },
    {
      icon: Users,
      t: it ? "Una sala raccolta" : "An intimate room",
      d: it
        ? "Pochi tavoli, un ambiente curato e pulito, arredato con richiami alla tradizione lucana."
        : "A handful of tables in a clean, well-kept room decorated with nods to Lucanian tradition.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={it ? "La nostra storia" : "Our story"}
        title={it ? "Specialità lucane" : "Lucanian specialities"}
        italic={it ? "dal 1980." : "since 1980."}
        intro={
          it
            ? "È così che la taverna si presenta, sui suoi canali: \"I sapori autentici del Vulture e della tradizione lucana dal 1980\"."
            : "That's how the taverna introduces itself on its own channels: \"The authentic flavours of the Vulture and of Lucanian tradition since 1980\"."
        }
      />
      <section className="pb-28">
        <Container className="grid items-center gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="arch-mask overflow-hidden" data-reveal>
              <PhotoFrame locale={locale} photo="archiPietra2" subject={it ? "Il portico ad archi" : "The arched portico"} ratio="aspect-[3/4]" />
            </div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <SectionHeading
              eyebrow={it ? "Tre archi" : "Three arches"}
              title={it ? "Il segno" : "The sign"}
              italic={it ? "della casa." : "of the house."}
            />
            <div className="mt-8 space-y-5 text-cream/75 md:text-lg" data-reveal>
              <p>
                {it
                  ? "Il logo della taverna disegna tre archi, gli stessi del portico in pietra che accoglie gli ospiti in Via Roma. Sono la porta d'ingresso di una cucina che da oltre quarant'anni porta in tavola i sapori del Vulture."
                  : "The taverna's logo draws three arches, the same as the stone portico that welcomes guests on Via Roma. They are the doorway to a kitchen that has been serving the flavours of the Vulture for over forty years."}
              </p>
              <p>
                {it
                  ? "Qui non si cerca l'effetto: si cucina come in famiglia, con prodotti del territorio e ricette che si tramandano."
                  : "Nothing here is about showing off: the cooking is family-style, with local produce and handed-down recipes."}
              </p>
            </div>
            {demoMode && (
              <div className="mt-10 border border-dashed border-gold/40 p-6 text-sm text-cream/70" data-reveal>
                <p className="eyebrow mb-2 text-gold">{it ? "Da completare con il titolare" : "To complete with the owner"}</p>
                {it
                  ? "Chi ha aperto la taverna nel 1980, come è cambiata, chi oggi è in cucina e in sala: questa pagina racconterà la storia vera della famiglia, con le sue parole e le sue foto. Nessun dettaglio è stato inventato."
                  : "Who opened the taverna in 1980, how it has changed, who is in the kitchen and dining room today: this page will tell the family's real story, in their words and photos. Nothing has been invented."}
              </div>
            )}
          </div>
        </Container>
      </section>
      <section className="paper py-24 md:py-32">
        <Container>
          <SectionHeading tone="dark" eyebrow={it ? "Cosa ci rende noi" : "What makes us"} title={it ? "Tre cose" : "Three things"} italic={it ? "che gli ospiti ricordano." : "guests remember."} />
          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {values.map((v) => (
              <li key={v.t} data-reveal>
                <v.icon className="h-7 w-7 text-terra-deep" aria-hidden="true" />
                <h3 className="display mt-5 text-3xl text-ink">{v.t}</h3>
                <p className="mt-3 leading-relaxed text-ink/75">{v.d}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

/* LA NOSTRA CUCINA ---------------------------------------------------- */
export function CuisinePage({ locale }: P) {
  const it = locale === "it";
  const steps = [
    { n: "01", t: it ? "Farina e acqua" : "Flour and water", d: it ? "Gli strascinati nascono da un impasto semplice, lavorato a mano." : "Strascinati start from a simple dough, worked by hand.", p: "maniPasta" as const },
    { n: "02", t: it ? "Il gesto" : "The gesture", d: it ? "Il pezzo di pasta viene trascinato sul tagliere con le dita: da qui il nome." : "The pasta is dragged across the board with the fingertips: hence the name.", p: "pastaFresca" as const },
    { n: "03", t: it ? "Il crusco" : "The crusco", d: it ? "Il peperone essiccato si frigge per pochi secondi e si sbriciola sul piatto." : "The dried pepper is fried for a few seconds and crumbled over the dish.", p: "cruschi" as const },
  ];
  const highlights = menuItems.filter((m) => ["antipasti", "primi", "secondi"].includes(m.category));
  return (
    <>
      <PageHero
        eyebrow={it ? "La nostra cucina" : "Our cuisine"}
        title={it ? "Le specialità" : "The specialities"}
        italic={it ? "della taverna." : "of the taverna."}
        intro={
          it
            ? "Antipasti del territorio, primi fatti a mano, carni e baccalà: la cucina lucana di tutti i giorni, quella che gli ospiti tornano a cercare."
            : "Local starters, handmade pasta, meat and salt cod: everyday Lucanian cooking, the kind guests come back for."
        }
      />
      <section className="pb-24">
        <Container>
          <SectionHeading eyebrow={it ? "Il rito della pasta" : "The pasta ritual"} title={it ? "Tre passaggi," : "Three steps,"} italic={it ? "nessuna scorciatoia." : "no shortcuts."} />
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <li key={s.n} data-reveal>
                <TiltCard>
                  <PhotoFrame locale={locale} photo={s.p} subject={s.t} ratio="aspect-[4/5]" />
                </TiltCard>
                <p className="mt-6 text-sm tabular-nums text-gold">{s.n}</p>
                <h3 className="display mt-2 text-3xl text-cream">{s.t}</h3>
                <p className="mt-2 text-cream/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <Signatures locale={locale} />
      <section className="py-24 md:py-32">
        <Container>
          <SectionHeading
            eyebrow={it ? "Dalle recensioni" : "From the reviews"}
            title={it ? "Tutti i piatti" : "Every dish"}
            italic={it ? "citati dagli ospiti." : "guests mention."}
            intro={it ? "Elenco ricavato dalle recensioni pubbliche: ogni piatto va confermato nel menu attuale." : "List drawn from public reviews: each dish must be confirmed on the current menu."}
          />
          <ul className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
            {highlights.map((d) => (
              <li key={d.id} className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline" data-reveal>
                <h3 className="display text-2xl text-cream md:col-span-5">{d.name[locale]}</h3>
                <p className="text-sm text-cream/65 md:col-span-5">{d.description[locale]}</p>
                <p className="text-xs text-sand md:col-span-2 md:text-right">
                  {d.toConfirm && <ToConfirm locale={locale} note={d.source} />}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap gap-4" data-reveal>
            <ButtonLink href={href("menu", locale)}>{ui.exploreMenu[locale]}</ButtonLink>
            <ButtonLink href={href("contact", locale) + "#prenota"} variant="ghost">{ui.book[locale]}</ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

/* MENU ----------------------------------------------------------------- */
export function MenuPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow="Menu"
        title={it ? "La carta" : "The menu"}
        italic={it ? "della taverna." : "of the taverna."}
        intro={
          it
            ? "Il menu segue le stagioni e può variare: i piatti del giorno vengono raccontati in sala."
            : "The menu follows the seasons and may change: the day's dishes are presented at the table."
        }
      />
      <Container className="pb-28">
        {demoMode && (
          <p className="mb-10 max-w-3xl border-l-2 border-gold/60 pl-5 text-sm text-sand">
            {it
              ? "Demo: i prezzi di formaggi, contorni e dolci sono letti sul menu cartaceo del locale; gli altri piatti sono ricavati dalle recensioni pubbliche e sono senza prezzo. Il ristorante potrà aggiornare tutto dall'area riservata."
              : "Demo: prices for cheeses, sides and desserts are taken from the restaurant's printed menu; other dishes come from public reviews and have no price. The restaurant will be able to update everything from the admin area."}
          </p>
        )}
        <MenuView locale={locale} />
      </Container>
      <CtaBand locale={locale} />
    </>
  );
}

/* GALLERY ------------------------------------------------------------- */
const galleryShots: Shot[] = [
  { p: "salaCalda", s: ["La sala", "The dining room"], cat: "interni", r: "aspect-[4/5]" },
  { p: "archiPietra", s: ["Gli archi", "The arches"], cat: "esterni", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "tagliere", s: ["Antipasto della taverna", "The taverna's starter"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "tavolaBottiglie", s: ["La tavola", "The table"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "orecchiette", s: ["Orecchiette", "Orecchiette"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "cruschiAppesi", s: ["Peperoni cruschi", "Crusco peppers"], cat: "dettagli", r: "aspect-[4/5]" },
  { p: "salaRustica", s: ["Legno e pietra", "Wood and stone"], cat: "interni", r: "aspect-[4/5]" },
  { p: "ravioli", s: ["Ravioli della casa", "House ravioli"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "brindisi", s: ["Insieme", "Together"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "arrosto", s: ["Arrosto misto", "Mixed roast"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "pane", s: ["Il pane", "The bread"], cat: "dettagli", r: "aspect-[4/5]" },
  { p: "archiPietra2", s: ["Il portico", "The portico"], cat: "esterni", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "castagne", s: ["Castagne", "Chestnuts"], cat: "dettagli", r: "aspect-[4/5]" },
  { p: "baccala", s: ["Baccalà", "Salt cod"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "legno", s: ["Il tavolo", "The table"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
];

export function GalleryPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={it ? "Gli ambienti," : "The rooms,"}
        italic={it ? "i piatti, i dettagli." : "the dishes, the details."}
        intro={
          it
            ? "Interni, tavoli, piatti, dettagli ed esterni. In questa demo le immagini sono illustrative e verranno sostituite dalle foto del ristorante."
            : "Interiors, tables, dishes, details and exterior. In this demo the images are illustrative and will be replaced by the restaurant's own photos."
        }
      />
      <Container className="pb-28">
        <GalleryGrid locale={locale} shots={galleryShots} filters />
        <div className="mt-12 flex flex-wrap gap-4" data-reveal>
          <ButtonLink href={restaurant.instagram} variant="ghost">Instagram →</ButtonLink>
          <ButtonLink href={restaurant.facebook} variant="ghost">Facebook →</ButtonLink>
        </div>
      </Container>
      <CtaBand locale={locale} />
    </>
  );
}

/* IL VULTURE ------------------------------------------------------------ */
export function VulturePage({ locale }: P) {
  const it = locale === "it";
  const ideas = [
    {
      t: it ? "Mattina ai Laghi di Monticchio" : "Morning at the Monticchio lakes",
      d: it
        ? "Una passeggiata intorno al Lago Grande e al Lago Piccolo, nel cratere del vulcano, e una sosta all'Abbazia di San Michele."
        : "A walk around Lago Grande and Lago Piccolo, inside the volcano's crater, and a stop at the Abbey of San Michele.",
      k: "16 km",
    },
    {
      t: it ? "Pranzo in taverna" : "Lunch at the taverna",
      d: it
        ? "Rientro a Rionero per un pranzo lucano: antipasto della casa, un primo fatto a mano e un calice di Aglianico."
        : "Back to Rionero for a Lucanian lunch: the house starter, handmade pasta and a glass of Aglianico.",
      k: "12:30",
    },
    {
      t: it ? "Pomeriggio nel centro" : "Afternoon in the centre",
      d: it
        ? "Palazzo Giustino Fortunato, sede della biblioteca comunale e del Consorzio dell'Aglianico del Vulture, e le chiese del centro."
        : "Palazzo Giustino Fortunato, home of the town library and the Aglianico del Vulture consortium, and the town's churches.",
      k: "Rionero",
    },
    {
      t: it ? "Tra i borghi" : "Among the villages",
      d: it
        ? "Melfi e Venosa sono a breve distanza: castelli, storia e vigneti dell'Aglianico."
        : "Melfi and Venosa are a short drive away: castles, history and Aglianico vineyards.",
      k: "Melfi · Venosa",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={it ? "Il Vulture" : "The Vulture"}
        title={it ? "Un vulcano," : "A volcano,"}
        italic={it ? "due laghi, un vino." : "two lakes, one wine."}
        intro={
          it
            ? "Il nord della Basilicata è una terra da scoprire con calma. Ecco qualche idea per una giornata nel Vulture, con una sosta a tavola."
            : "Northern Basilicata is a land to explore slowly. Here are a few ideas for a day in the Vulture, with a stop at the table."
        }
      />
      <Territory locale={locale} full />
      <section className="paper py-24 md:py-32">
        <Container>
          <SectionHeading tone="dark" eyebrow={it ? "Una giornata nel Vulture" : "A day in the Vulture"} title={it ? "Idee per" : "Ideas for"} italic={it ? "la tua visita." : "your visit."} />
          <ol className="mt-14 grid gap-px border border-ink/10 bg-ink/10 md:grid-cols-4">
            {ideas.map((x, i) => (
              <li key={x.t} className="bg-cream p-8" data-reveal>
                <p className="text-xs tabular-nums text-terra-deep">{String(i + 1).padStart(2, "0")} · {x.k}</p>
                <h3 className="display mt-4 text-3xl text-ink">{x.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">{x.d}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-ink/55">
            {it ? "Fonti: FAI, Wikipedia, disciplinari DOC/DOCG. Distanze indicative." : "Sources: FAI, Wikipedia, DOC/DOCG regulations. Distances are approximate."}
          </p>
        </Container>
      </section>
      <Aglianico locale={locale} />
      <CtaBand locale={locale} />
    </>
  );
}

/* RECENSIONI ------------------------------------------------------------ */
export function ReviewsPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "Recensioni" : "Reviews"}
        title={it ? "La parola" : "Over to"}
        italic={it ? "ai nostri ospiti." : "our guests."}
        intro={
          it
            ? "Valutazioni e recensioni pubbliche, con il collegamento alle fonti originali. Nessuna testimonianza è inventata."
            : "Public ratings and reviews, linked to the original sources. No testimonial is invented."
        }
      />
      <Reviews locale={locale} full />
      <section className="py-24">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <p className="display max-w-2xl text-3xl text-cream md:text-4xl">
            {it ? "Sei stato nostro ospite? " : "Have you dined with us? "}
            <em className="text-terra">{it ? "Raccontaci com'è andata." : "Tell us how it went."}</em>
          </p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href={restaurant.googleReviews} variant="ghost">Google →</ButtonLink>
            <ButtonLink href={restaurant.tripadvisor} variant="ghost">Tripadvisor →</ButtonLink>
          </div>
        </Container>
      </section>
      <CtaBand locale={locale} />
    </>
  );
}

/* CONTATTI ---------------------------------------------------------------- */
export function ContactPage({ locale }: P) {
  const it = locale === "it";
  return (
    <>
      <PageHero
        eyebrow={it ? "Contatti e prenotazioni" : "Contact & booking"}
        title={it ? "Vieni a trovarci" : "Come and see us"}
        italic={it ? "a Rionero." : "in Rionero."}
        intro={
          it
            ? "Chiamaci o invia una richiesta di prenotazione: il ristorante ti risponde per confermare."
            : "Call us or send a booking request: the restaurant will get back to you to confirm."
        }
      />
      <Container className="pb-8">
        <ul className="grid gap-px border border-cream/10 bg-cream/10 md:grid-cols-3">
          <li className="bg-ink p-8">
            <Phone className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-4">{it ? "Telefono" : "Phone"}</p>
            <a href={restaurant.phoneHref} data-track="contact" className="display mt-2 block text-3xl text-cream hover:text-gold">{restaurant.phone}</a>
          </li>
          <li className="bg-ink p-8">
            <Mail className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-4">Email</p>
            <a href={`mailto:${restaurant.email}`} className="mt-2 block break-all text-lg text-cream hover:text-gold">{restaurant.email}</a>
            {restaurant.emailToConfirm && <ToConfirm locale={locale} note="Fonte: pagina Facebook" className="ml-0 mt-2" />}
          </li>
          <li className="bg-ink p-8">
            <Clock className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="eyebrow mt-4">{ui.hours[locale]}</p>
            <p className="mt-2 text-cream/80">
              {it ? "Pranzo 12:30–15:00 · Cena 19:30–22:00" : "Lunch 12:30–15:00 · Dinner 19:30–22:00"}
              <br />
              <span className="text-sand">{it ? "Chiuso il mercoledì" : "Closed on Wednesdays"}</span>
            </p>
          </li>
        </ul>
      </Container>
      <Booking locale={locale} index="" />
      <Location locale={locale} index="" />
      <section className="pb-24">
        <Container className="max-w-3xl">
          <HoursList locale={locale} />
        </Container>
      </section>
    </>
  );
}

/* Decorazione riutilizzabile per pagine vuote */
export function ArchesDivider() {
  return <Arches className="mx-auto my-16 h-10 w-auto text-sand/30" />;
}
