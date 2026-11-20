import Link from "next/link";
import { ExternalLink, MapPin, Star, Train, Car, Mountain, Wine as WineIcon, Wheat, Grape } from "lucide-react";
import { demoMode, ratings, restaurant } from "@/config/site";
import { categories, menuItems, signatureDishes } from "@/data/menu";
import { dishPhotos, photos, type PhotoKey } from "@/data/photos";
import { reviewSummaries, reviewThemes } from "@/data/reviews";
import { href, type Locale, ui } from "@/lib/i18n";
import BookingForm from "../BookingForm";
import GalleryGrid, { type Shot } from "../GalleryGrid";
import { HoursList } from "../Hours";
import { Arches } from "../Logo";
import MapEmbed from "../MapEmbed";
import TiltCard from "../TiltCard";
import { ButtonLink, Container, PhotoFrame, SectionHeading, ToConfirm } from "../ui";

type P = { locale: Locale };

/* 02 — BENVENUTI ---------------------------------------------------- */
export function Welcome({ locale }: P) {
  const it = locale === "it";
  const facts = [
    { k: "1980", v: it ? "Specialità lucane dal" : "Lucanian specialities since", flip: true },
    { k: "Via Roma 180", v: it ? "nel centro di Rionero" : "in the centre of Rionero" },
    { k: "100 m", v: it ? "dalla stazione ferroviaria" : "from the railway station" },
  ];
  return (
    <section className="relative py-28 md:py-40" aria-labelledby="welcome-title">
      <Container className="grid items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-6 lg:col-span-5">
          <SectionHeading
            id="welcome-title"
            index="02"
            eyebrow={it ? "Benvenuti a Taverna Paradiso" : "Welcome to Taverna Paradiso"}
            title={it ? "Una taverna," : "A taverna,"}
            italic={it ? "una tavola di famiglia." : "a family table."}
          />
          <div className="mt-8 space-y-5 text-cream/75 md:text-lg" data-reveal>
            <p>
              {it
                ? "In Via Roma, dietro un portico ad archi, c'è una sala piccola e curata dove la cucina lucana si serve come a casa: piatti semplici, pasta fatta a mano, i salumi e i formaggi del territorio, un bicchiere di Aglianico."
                : "On Via Roma, behind an arched portico, there's a small, well-kept dining room where Lucanian food is served the way it is at home: simple dishes, handmade pasta, local cured meats and cheeses, a glass of Aglianico."}
            </p>
            <p>
              {it
                ? "Pochi tavoli, un'accoglienza che chi passa di qui ricorda per il calore e il buonumore, e prezzi onesti. È così che gli ospiti raccontano la taverna."
                : "A handful of tables, a welcome people remember for its warmth and good humour, and honest prices. That's how guests describe the taverna."}
            </p>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-cream/10 pt-8" data-reveal>
            {facts.map((f) => (
              <div key={f.k} className={f.flip ? "flex flex-col-reverse justify-end" : ""}>
                <dt className="display text-3xl text-sand md:text-4xl">{f.k}</dt>
                <dd className="mt-1 text-xs leading-snug text-cream/60">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3" data-reveal>
              <div className="arch-mask overflow-hidden">
                <PhotoFrame locale={locale} photo="salaRustica" subject={it ? "La sala" : "The dining room"} ratio="aspect-[3/4]" />
              </div>
            </div>
            <div className="col-span-2 mt-24 space-y-4" data-parallax="50">
              <div className="arch-mask overflow-hidden" data-reveal>
                <PhotoFrame locale={locale} photo="tagliere" subject={it ? "L'antipasto" : "The starter"} ratio="aspect-[3/4]" />
              </div>
              <Arches className="mx-auto h-10 w-auto text-sand/40" />
            </div>
          </div>
          {demoMode && (
            <p className="mt-6 text-xs text-cream/45">
              {it
                ? "Spazio per le foto autentiche del portico e della sala: nessuna immagine di terzi è usata come se fosse del locale."
                : "Reserved for authentic photos of the portico and dining room: no third-party image is presented as the restaurant's own."}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

/* 03 — I SAPORI DELLA LUCANIA ---------------------------------------- */
export function Flavours({ locale }: P) {
  const it = locale === "it";
  const words = it
    ? ["Peperoni cruschi", "Strascinati", "Orecchiette", "Caciocavallo", "Salsiccia lucana", "Aglianico del Vulture", "Castagne", "Baccalà"]
    : ["Crusco peppers", "Strascinati", "Orecchiette", "Caciocavallo", "Lucanian sausage", "Aglianico del Vulture", "Chestnuts", "Salt cod"];
  const pillars = [
    {
      icon: Wheat,
      t: it ? "La pasta a mano" : "Handmade pasta",
      d: it
        ? "Strascinati e orecchiette nascono da farina, acqua e dita: il gesto più antico della cucina lucana, e il piatto che gli ospiti lodano di più."
        : "Strascinati and orecchiette are made from flour, water and fingertips: the oldest gesture in Lucanian cooking, and the dish guests praise most.",
      p: "maniPasta" as PhotoKey,
    },
    {
      icon: Grape,
      t: it ? "Il peperone crusco" : "The crusco pepper",
      d: it
        ? "Essiccato al sole e fritto per pochi secondi, diventa croccante e dolce. Si sbriciola sulla pasta, accompagna il baccalà e la salsiccia."
        : "Sun-dried, then fried for a few seconds, it turns crisp and sweet. Crumbled over pasta, served with salt cod and sausage.",
      p: "cruschiAppesi" as PhotoKey,
    },
    {
      icon: Mountain,
      t: it ? "I prodotti del Vulture" : "Produce of the Vulture",
      d: it
        ? "Salumi, formaggi, verdure, castagne e il vino del vulcano: l'antipasto della casa è un piccolo ritratto del territorio."
        : "Cured meats, cheeses, vegetables, chestnuts and the volcano's wine: the house starter is a small portrait of the land.",
      p: "paneOlio" as PhotoKey,
    },
  ];
  return (
    <section className="paper relative overflow-hidden py-28 md:py-40" aria-labelledby="flavours-title">
      <Container>
        <SectionHeading
          tone="dark"
          id="flavours-title"
          index="03"
          eyebrow={it ? "I sapori della Lucania" : "The flavours of Lucania"}
          title={it ? "Una cucina che sa" : "Cooking that tastes"}
          italic={it ? "di terra e di casa." : "of the land and of home."}
          intro={
            it
              ? "La cucina lucana è fatta di pochi ingredienti, trattati con rispetto. A Taverna Paradiso si ritrova nei piatti di ogni giorno."
              : "Lucanian cooking is made of few ingredients, treated with respect. At Taverna Paradiso you find it in everyday dishes."
          }
        />
      </Container>

      <div className="mt-16 overflow-hidden border-y border-ink/10 py-6" aria-hidden="true">
        <div className="marquee">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="display flex items-center gap-8 whitespace-nowrap px-8 text-[clamp(2.2rem,5vw,4.5rem)] italic text-ink/85">
              {w}
              <Arches className="h-6 w-auto text-terra" />
            </span>
          ))}
        </div>
      </div>

      <Container className="mt-20 grid gap-10 md:grid-cols-3">
        {pillars.map((p, i) => (
          <article key={p.t} className={i === 1 ? "md:mt-16" : ""} data-reveal>
            <div className="overflow-hidden" data-mask>
              <PhotoFrame locale={locale} photo={p.p} subject={p.t} ratio="aspect-[4/5]" />
            </div>
            <div className="mt-6 flex items-center gap-3 text-terra-deep">
              <p.icon className="h-5 w-5" aria-hidden="true" />
              <span className="h-px flex-1 bg-ink/15" />
            </div>
            <h3 className="display mt-4 text-3xl text-ink">{p.t}</h3>
            <p className="mt-3 leading-relaxed text-ink/75">{p.d}</p>
          </article>
        ))}
      </Container>
    </section>
  );
}

/* 04 — I PIATTI DA SCOPRIRE ------------------------------------------ */
export function Dishes({ locale }: P) {
  const it = locale === "it";
  const ids = ["antipasto-taverna", "strascinati-cruschi", "orecchiette-panfritto", "ravioli-casa", "agnello-cacciatora", "baccala-cruschi", "arrosto-misto", "dolce-casa"];
  const list = ids.map((id) => menuItems.find((m) => m.id === id)!).filter(Boolean);
  return (
    <section className="py-28 md:py-40" aria-labelledby="dishes-title">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            id="dishes-title"
            index="04"
            eyebrow={it ? "I piatti da scoprire" : "Dishes to discover"}
            title={it ? "I piatti che gli ospiti" : "The dishes guests"}
            italic={it ? "ricordano." : "remember."}
            intro={
              it
                ? "Scelti tra quelli citati più spesso nelle recensioni pubbliche. La presenza nel menu del giorno va sempre chiesta in sala."
                : "Chosen from those most often mentioned in public reviews. Always ask our staff what's on today's menu."
            }
          />
          <div data-reveal>
            <ButtonLink href={href("menu", locale)} variant="ghost">{ui.exploreMenu[locale]} →</ButtonLink>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((d, i) => (
            <li key={d.id} className={i % 2 === 1 ? "lg:mt-14" : ""} data-reveal>
              <article className="group">
                <div className="overflow-hidden">
                  <PhotoFrame locale={locale} photo={dishPhotos[d.id]} subject="" alt={d.name[locale]} ratio="aspect-[4/5]" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-3">
                  <h3 className="display text-2xl leading-tight text-cream">{d.name[locale]}</h3>
                  {d.price !== null && <span className="shrink-0 text-sm tabular-nums text-sand">€ {d.price.toFixed(2).replace(".", ",")}</span>}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{d.description[locale]}</p>
                <p className="mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-cream/45">
                  {it ? "Allergeni: da compilare a cura del ristorante" : "Allergens: to be completed by the restaurant"}
                  {d.toConfirm && <ToConfirm locale={locale} note={d.source} />}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 05 — SIGNATURE DISHES (profondità simulata) ------------------------ */
export function Signatures({ locale }: P) {
  const it = locale === "it";
  const picks: { id: string; layer: PhotoKey; n: string; quote: { it: string; en: string } }[] = [
    {
      id: "strascinati-cruschi",
      layer: "cruschi",
      n: "I",
      quote: {
        it: "Trascinati con tre dita sul tagliere, conditi con il crusco e una mollica leggera.",
        en: "Dragged with three fingers across the board, dressed with crusco and light breadcrumbs.",
      },
    },
    {
      id: "orecchiette-panfritto",
      layer: "pastaFresca",
      n: "II",
      quote: { it: "La forma che raccoglie il condimento: pane fritto e peperone crusco.", en: "The shape that holds the sauce: fried bread and crusco pepper." },
    },
    {
      id: "agnello-cacciatora",
      layer: "vinoTavola",
      n: "III",
      quote: { it: "Cottura lenta, sapori pieni. Con l'Aglianico, come suggerisce chi l'ha provato.", en: "Slow-cooked and full of flavour. With Aglianico, as those who tried it suggest." },
    },
  ];
  const dishes = picks.map((p) => ({ ...p, dish: signatureDishes.find((d) => d.id === p.id)! }));
  return (
    <section className="relative overflow-hidden border-y border-cream/10 bg-espresso py-28 md:py-40" aria-labelledby="sig-title">
      <div className="pointer-events-none absolute inset-0 opacity-50 [background:radial-gradient(60%_50%_at_80%_20%,rgba(107,48,56,.45),transparent_70%)]" aria-hidden="true" />
      <Container className="relative">
        <SectionHeading
          id="sig-title"
          index="05"
          eyebrow={it ? "Le specialità" : "Signature dishes"}
          title={it ? "Tre piatti," : "Three dishes,"}
          italic={it ? "un territorio." : "one land."}
        />
        <div className="mt-20 space-y-28 md:space-y-40">
          {dishes.map(({ dish, layer, n, quote }, i) => (
            <article key={dish.id} className="grid items-center gap-12 md:grid-cols-12">
              <div className={`relative md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                <div className="absolute -left-6 -top-10 w-1/2 opacity-70 md:-left-10" data-parallax="110" aria-hidden="true">
                  <PhotoFrame locale={locale} photo={layer} subject="" alt="" ratio="aspect-square" className="[&_figcaption]:hidden" />
                </div>
                <TiltCard className="relative z-10 ml-auto w-[85%] shadow-[0_40px_80px_-20px_rgba(0,0,0,.6)]">
                  <PhotoFrame locale={locale} photo={dishPhotos[dish.id]} subject="" alt={dish.name[locale]} ratio="aspect-[5/4]" />
                </TiltCard>
              </div>
              <div className={`md:col-span-5 ${i % 2 ? "md:order-1 md:col-start-1" : ""}`} data-reveal>
                <p className="display text-7xl italic text-gold/40">{n}</p>
                <h3 className="display mt-4 text-[clamp(2.2rem,4vw,3.6rem)] text-cream">{dish.name[locale]}</h3>
                <p className="mt-6 text-lg leading-relaxed text-cream/75">{quote[locale]}</p>
                <p className="mt-4 text-sm text-cream/55">{dish.description[locale]}</p>
                <p className="mt-6 text-xs text-sand">
                  {it ? "Fonte: " : "Source: "}
                  {dish.source}
                  <ToConfirm locale={locale} note={it ? "Da verificare nel menu attuale" : "Check on the current menu"} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* 06 — IL NOSTRO MENU ------------------------------------------------- */
export function MenuTeaser({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="paper py-28 md:py-36" aria-labelledby="menu-title">
      <Container className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            tone="dark"
            id="menu-title"
            index="06"
            eyebrow={it ? "Il nostro menu" : "Our menu"}
            title={it ? "Dalla tavola" : "From the table"}
            italic={it ? "alla carta." : "to the menu."}
            intro={
              it
                ? "Antipasti, primi, secondi, contorni, dolci, bevande e vini. Il menu si aggiorna con le stagioni: i piatti del giorno vengono raccontati in sala."
                : "Starters, pasta, mains, sides, desserts, drinks and wines. The menu follows the seasons: the day's dishes are presented at the table."
            }
          />
          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <ButtonLink href={href("menu", locale)}>{ui.exploreMenu[locale]}</ButtonLink>
          </div>
          <p className="mt-6 text-xs text-ink/55" data-reveal>
            {it
              ? "Prezzi pubblicati solo dove letti sul menu cartaceo del locale; gli altri saranno inseriti dal ristorante."
              : "Prices shown only where read on the restaurant's printed menu; the rest will be added by the restaurant."}
          </p>
        </div>
        <ol className="grid gap-px self-start border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {categories.map((c, i) => {
            const items = menuItems.filter((m) => m.category === c.id);
            return (
              <li key={c.id} className="bg-cream p-7" data-reveal>
                <Link href={`${href("menu", locale)}#${c.id}`} className="group block">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs tabular-nums text-terra-deep">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-xs text-ink/50">{items.length} {it ? "voci" : "items"}</span>
                  </div>
                  <h3 className="display mt-3 text-3xl text-ink transition-colors group-hover:text-terra-deep">{c.label[locale]}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">{items.slice(0, 3).map((m) => m.name[locale]).join(" · ")}</p>
                </Link>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}

/* 07 — IL TERRITORIO DEL VULTURE ------------------------------------- */
export function Territory({ locale, full = false }: P & { full?: boolean }) {
  const it = locale === "it";
  const panels: { p: PhotoKey; t: string; d: string; tag: string }[] = [
    {
      p: "vignaMonti",
      tag: "Monte Vulture",
      t: it ? "Il vulcano addormentato" : "The sleeping volcano",
      d: it
        ? "Rionero sorge sulle pendici del Monte Vulture, un antico vulcano spento. I suoi suoli vulcanici danno carattere al vino e ai prodotti della zona."
        : "Rionero stands on the slopes of Monte Vulture, an ancient extinct volcano. Its volcanic soils give character to the area's wine and produce.",
    },
    {
      p: "lago",
      tag: it ? "Laghi di Monticchio" : "Monticchio lakes",
      t: it ? "Due laghi nel cratere" : "Two lakes in the crater",
      d: it
        ? "Il Lago Grande e il Lago Piccolo riempiono il cratere del vulcano, tra boschi e l'Abbazia di San Michele. Molti ospiti arrivano a tavola dopo una passeggiata qui."
        : "Lago Grande and Lago Piccolo fill the volcano's crater, among woods and the Abbey of San Michele. Many guests come to the table after a walk here.",
    },
    {
      p: "borgoSera",
      tag: "Rionero in Vulture",
      t: it ? "Il paese di Giustino Fortunato" : "Giustino Fortunato's town",
      d: it
        ? "Nel centro, il settecentesco Palazzo Giustino Fortunato ospita la biblioteca comunale e ricorda il grande meridionalista nato qui nel 1848."
        : "In the centre, the 18th-century Palazzo Giustino Fortunato houses the town library and honours the great southern thinker born here in 1848.",
    },
    {
      p: "castagne",
      tag: it ? "Prodotti tipici" : "Local produce",
      t: it ? "Dal bosco alla tavola" : "From the woods to the table",
      d: it
        ? "Castagne, salumi, formaggi, peperoni cruschi e le acque minerali del Vulture: la cultura gastronomica lucana nasce da questi prodotti."
        : "Chestnuts, cured meats, cheeses, crusco peppers and the Vulture's mineral waters: Lucanian food culture grows from these.",
    },
  ];
  return (
    <section className="py-28 md:py-40" aria-labelledby="territory-title">
      <Container>
        <SectionHeading
          id="territory-title"
          index={full ? undefined : "07"}
          eyebrow={it ? "Il territorio del Vulture" : "The Vulture area"}
          title={it ? "Prima del pranzo," : "Before lunch,"}
          italic={it ? "il Vulture." : "the Vulture."}
          intro={
            it
              ? "Taverna Paradiso è un buon punto di partenza, o di arrivo, per scoprire il nord della Basilicata."
              : "Taverna Paradiso is a good starting point, or finishing line, for exploring northern Basilicata."
          }
        />
      </Container>
      <div className="mt-16 grid gap-px bg-cream/10 md:grid-cols-2 xl:grid-cols-4">
        {panels.map((x) => (
          <article key={x.t} className="group relative min-h-[34rem] overflow-hidden bg-ink" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[x.p].src}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-[1.8s] ease-[var(--ease-luxe)] group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" aria-hidden="true" />
            <div className="relative flex h-full min-h-[34rem] flex-col justify-end p-8">
              <p className="eyebrow text-gold">{x.tag}</p>
              <h3 className="display mt-3 text-3xl text-cream">{x.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{x.d}</p>
              {demoMode && <p className="mt-4 text-[0.55rem] uppercase tracking-[0.18em] text-cream/45">{ui.illustrative[locale]} · Unsplash</p>}
            </div>
          </article>
        ))}
      </div>
      {!full && (
        <Container className="mt-12" >
          <div data-reveal>
            <ButtonLink href={href("vulture", locale)} variant="ghost">{it ? "Scopri il Vulture" : "Discover the Vulture"} →</ButtonLink>
          </div>
        </Container>
      )}
    </section>
  );
}


/* 08 — L'AGLIANICO DEL VULTURE --------------------------------------- */
export function Aglianico({ locale }: P) {
  const it = locale === "it";
  const facts = [
    { k: "1971", v: it ? "Aglianico del Vulture DOC" : "Aglianico del Vulture DOC" },
    { k: "2010", v: it ? "Superiore DOCG, l'unica della Basilicata" : "Superiore DOCG, Basilicata's only DOCG" },
    { k: "100%", v: it ? "uve Aglianico, coltivate su suoli vulcanici" : "Aglianico grapes, grown on volcanic soils" },
  ];
  return (
    <section className="relative overflow-hidden bg-[#2a1719] py-28 md:py-40" aria-labelledby="wine-title">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_20%_80%,rgba(107,48,56,.7),transparent_70%)]" aria-hidden="true" />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="grid grid-cols-6 gap-4">
            <div className="col-span-4 arch-mask overflow-hidden" data-reveal>
              <PhotoFrame locale={locale} photo="vinoUva" subject={it ? "Il calice" : "The glass"} ratio="aspect-[3/4]" />
            </div>
            <div className="col-span-2 self-end space-y-4" data-parallax="70">
              <PhotoFrame locale={locale} photo="cantina" subject={it ? "Bottiglie" : "Bottles"} ratio="aspect-[3/5]" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <SectionHeading
            id="wine-title"
            index="08"
            eyebrow={it ? "L'Aglianico del Vulture" : "Aglianico del Vulture"}
            title={it ? "Il vino" : "The wine"}
            italic={it ? "del vulcano." : "of the volcano."}
          />
          <div className="mt-8 space-y-5 text-cream/75 md:text-lg" data-reveal>
            <p>
              {it
                ? "Rionero è uno dei comuni dell'Aglianico del Vulture, il rosso simbolo della Basilicata, e ospita il Consorzio di Tutela. Un vino di colore rubino, profumo intenso e grande struttura, che con l'affinamento si fa più morbido."
                : "Rionero is one of the towns of Aglianico del Vulture, Basilicata's signature red, and home to its protection consortium. A ruby-coloured wine, intensely aromatic and full-bodied, that softens with age."}
            </p>
            <p>
              {it
                ? "In taverna gli ospiti raccontano dell'Aglianico della casa, consigliato in abbinamento ai piatti. La carta dei vini sarà pubblicata con il ristorante."
                : "At the taverna, guests talk about the house Aglianico, suggested as a pairing. The wine list will be published together with the restaurant."}
            </p>
          </div>
          <dl className="mt-10 space-y-4" data-reveal>
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline gap-6 border-b border-cream/10 pb-4">
                <dt className="display w-24 shrink-0 text-4xl text-gold">{f.k}</dt>
                <dd className="text-sm text-cream/70">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 flex items-center gap-2 text-xs text-cream/45" data-reveal>
            <WineIcon className="h-3.5 w-3.5" aria-hidden="true" />
            {it ? "Nessuna etichetta della cantina del locale è citata finché non viene confermata." : "No label from the restaurant's cellar is named until confirmed."}
          </p>
        </div>
      </Container>
    </section>
  );
}

/* 09 — LA NOSTRA ATMOSFERA ------------------------------------------- */
export const atmosphereShots: Shot[] = [
  { p: "salaCalda", s: ["La sala", "The dining room"], cat: "interni", r: "aspect-[4/5]" },
  { p: "tavolaBottiglie", s: ["I tavoli", "The tables"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "orecchiette", s: ["Orecchiette", "Orecchiette"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "cruschiMazzo", s: ["Peperoni cruschi", "Crusco peppers"], cat: "dettagli", r: "aspect-[4/5]" },
  { p: "archiPietra", s: ["Gli archi", "The arches"], cat: "esterni", r: "aspect-[4/5]" },
  { p: "brindisi", s: ["Insieme a tavola", "Together at the table"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
  { p: "bruschetta", s: ["Bruschetta calda", "Warm bruschetta"], cat: "piatti", r: "aspect-[4/5]" },
  { p: "pane", s: ["Il pane", "The bread"], cat: "dettagli", r: "aspect-[4/5]" },
  { p: "vinoTavola", s: ["Un calice di rosso", "A glass of red"], cat: "tavoli", r: "aspect-[16/10]", span: "md:col-span-2" },
];

export function Atmosphere({ locale }: P) {
  const it = locale === "it";
  return (
    <section className="py-28 md:py-40" aria-labelledby="atmo-title">
      <Container>
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeading
            id="atmo-title"
            index="09"
            eyebrow={it ? "La nostra atmosfera" : "Our atmosphere"}
            title={it ? "Legno, pietra" : "Wood, stone"}
            italic={it ? "e buona compagnia." : "and good company."}
          />
          <div data-reveal>
            <ButtonLink href={href("gallery", locale)} variant="ghost">{it ? "Apri la gallery" : "Open the gallery"} →</ButtonLink>
          </div>
        </div>
        <div className="mt-14">
          <GalleryGrid locale={locale} shots={atmosphereShots} />
        </div>
      </Container>
    </section>
  );
}

/* 10 — LE PAROLE DEGLI OSPITI ---------------------------------------- */
export function Reviews({ locale, full = false }: P & { full?: boolean }) {
  const it = locale === "it";
  const list = full ? reviewSummaries : reviewSummaries.slice(0, 3);
  return (
    <section className="paper py-28 md:py-36" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading
          tone="dark"
          id="reviews-title"
          index={full ? undefined : "10"}
          eyebrow={it ? "Le parole degli ospiti" : "What our guests say"}
          title={it ? "Raccontato da" : "Told by"}
          italic={it ? "chi si è seduto a tavola." : "those who sat at our table."}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <a href={restaurant.tripadvisor} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 border border-ink/15 bg-cream p-8 transition-colors hover:border-terra-deep" data-reveal>
            <div>
              <p className="eyebrow">Tripadvisor</p>
              <p className="display mt-3 text-6xl text-ink">
                {ratings.tripadvisor.value.toLocaleString(locale, { minimumFractionDigits: 1 })}
                <span className="text-2xl text-ink/50">/5</span>
              </p>
              <p className="mt-2 text-sm text-ink/70">
                {ratings.tripadvisor.count} {it ? "recensioni" : "reviews"} · {ratings.tripadvisor.extra[locale]}
              </p>
              <p className="mt-1 text-xs text-ink/50">{it ? "verificato il" : "checked on"} {ratings.tripadvisor.checked}</p>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-ink/40 group-hover:text-terra-deep" aria-hidden="true" />
          </a>
          <a href={restaurant.googleReviews} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 border border-ink/15 bg-cream p-8 transition-colors hover:border-terra-deep" data-reveal>
            <div>
              <p className="eyebrow">Google</p>
              <p className="display mt-3 text-6xl text-ink">
                {ratings.google.value.toLocaleString(locale, { minimumFractionDigits: 1 })}
                <span className="text-2xl text-ink/50">/5</span>
              </p>
              <p className="mt-2 text-sm text-ink/70">
                {it ? "circa" : "about"} {ratings.google.count} {it ? "recensioni" : "reviews"}
                <ToConfirm locale={locale} note={ratings.google.checked} />
              </p>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-ink/40 group-hover:text-terra-deep" aria-hidden="true" />
          </a>
          <a href={restaurant.facebook} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-6 border border-ink/15 bg-cream p-8 transition-colors hover:border-terra-deep" data-reveal>
            <div>
              <p className="eyebrow">Facebook</p>
              <p className="display mt-3 text-6xl text-ink">
                {ratings.facebook.percent}
                <span className="text-2xl text-ink/50">%</span>
              </p>
              <p className="mt-2 text-sm text-ink/70">
                {it ? "consiglia il locale" : "recommend us"} · {ratings.facebook.count} {it ? "recensioni" : "reviews"}
              </p>
              <p className="mt-1 text-xs text-ink/50">{it ? "verificato il" : "checked on"} {ratings.facebook.checked}</p>
            </div>
            <ExternalLink className="h-5 w-5 shrink-0 text-ink/40 group-hover:text-terra-deep" aria-hidden="true" />
          </a>
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {list.map((r) => (
            <li key={r.author + r.date} className="flex flex-col justify-between border border-ink/10 bg-[#efe6d6] p-8" data-reveal>
              <div>
                {r.rating && (
                  <div className="flex gap-1 text-terra-deep" role="img" aria-label={`${r.rating}/5`}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                )}
                <p className="display mt-5 text-2xl leading-snug text-ink/90">{r[locale]}</p>
              </div>
              <p className="mt-8 text-xs text-ink/60">
                {r.author} · {r.source} · {r.date} ·{" "}
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-underline text-ink">
                  {it ? "fonte" : "source"}
                </a>
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-ink/55" data-reveal>
          {it
            ? "Sintesi riformulate di recensioni pubbliche reali, con link alla fonte. Le testimonianze definitive saranno scelte con il ristorante."
            : "Paraphrased summaries of real public reviews, linked to the source. Final testimonials will be selected with the restaurant."}
        </p>

        {full && (
          <div className="mt-20 grid gap-px bg-ink/10 md:grid-cols-4">
            {reviewThemes.map((th) => (
              <div key={th.it} className="bg-cream p-8" data-reveal>
                <h3 className="display text-2xl text-terra-deep">{th[locale]}</h3>
                <p className="mt-3 text-sm text-ink/70">{th.note[locale]}</p>
              </div>
            ))}
          </div>
        )}

        {!full && (
          <div className="mt-12" data-reveal>
            <ButtonLink href={href("reviews", locale)} variant="ink">{it ? "Tutte le recensioni" : "All reviews"}</ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}

/* 11 — PRENOTA IL TUO TAVOLO ----------------------------------------- */
export function Booking({ locale, index = "11" }: P & { index?: string }) {
  const it = locale === "it";
  return (
    <section id="prenota" className="relative scroll-mt-24 overflow-hidden py-28 md:py-40" aria-labelledby="book-title">
      <div className="hero-static pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Arches className="pointer-events-none absolute -left-16 bottom-0 h-[26rem] w-auto text-sand/[0.05]" />
      <Container className="relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="book-title"
            index={index}
            eyebrow={it ? "Prenota il tuo tavolo" : "Book your table"}
            title={it ? "Ti aspettiamo" : "We'll keep"}
            italic={it ? "a tavola." : "a seat for you."}
            intro={
              it
                ? "Il modo più rapido è una telefonata. In alternativa invia una richiesta: il ristorante ti richiama per confermare."
                : "The quickest way is a phone call. Or send a request: the restaurant will call you back to confirm."
            }
          />
          <div className="mt-10 space-y-6" data-reveal>
            <a
              href={restaurant.phoneHref}
              data-track="booking"
              className="group flex items-center justify-between gap-4 rounded-full bg-terra-deep px-7 py-5 text-cream transition-colors duration-500 hover:bg-gold hover:text-ink"
            >
              <span className="text-sm font-semibold tracking-wide">{ui.call[locale]}</span>
              <span className="display whitespace-nowrap text-xl tabular-nums sm:text-2xl">{restaurant.phone}</span>
            </a>
            <HoursList locale={locale} compact />
          </div>
        </div>
        <div className="border border-cream/10 bg-ink/75 p-6 backdrop-blur-sm md:p-12 lg:col-span-7 lg:col-start-6" data-reveal>
          <h3 className="display mb-8 text-3xl text-cream">{it ? "Richiesta di prenotazione" : "Booking request"}</h3>
          <BookingForm locale={locale} />
        </div>
      </Container>
    </section>
  );
}

/* 12 — DOVE SIAMO ----------------------------------------------------- */
export function Location({ locale, index = "12" }: P & { index?: string }) {
  const it = locale === "it";
  return (
    <section className="border-t border-cream/10 py-28 md:py-36" aria-labelledby="where-title">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            id="where-title"
            index={index}
            eyebrow={it ? "Dove siamo" : "Find us"}
            title={it ? "Via Roma 180," : "Via Roma 180,"}
            italic="Rionero in Vulture."
          />
          <ul className="mt-10 space-y-6 text-cream/80" data-reveal>
            <li className="flex gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {restaurant.street}, {restaurant.postalCode} {restaurant.city} ({restaurant.province}), {restaurant.region}
              </span>
            </li>
            <li className="flex gap-4">
              <Train className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>{it ? "A circa 100 metri dalla stazione ferroviaria di Rionero." : "About 100 metres from Rionero railway station."}</span>
            </li>
            <li className="flex gap-4">
              <Car className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>
                {it
                  ? "Parcheggio gratuito nelle vicinanze e in strada, secondo le schede pubbliche del locale."
                  : "Free parking nearby and on the street, according to the restaurant's public listings."}
                <ToConfirm locale={locale} note="Tripadvisor" />
              </span>
            </li>
            <li className="flex gap-4">
              <Mountain className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span>{it ? "Circa 16 km dai Laghi di Monticchio." : "About 16 km from the Monticchio lakes."}</span>
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-4" data-reveal>
            <ButtonLink href={restaurant.directionsUrl}>{ui.directions[locale]}</ButtonLink>
            <ButtonLink href={restaurant.phoneHref} variant="ghost">{restaurant.phone}</ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-7" data-reveal>
          <MapEmbed locale={locale} />
        </div>
      </Container>
    </section>
  );
}
