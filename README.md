# Taverna Paradiso — Rionero in Vulture · sito demo

Sito multipagina (IT/EN) con hero 3D per Taverna Paradiso, Via Roma 180, Rionero in Vulture (PZ).
Concept: **"Il Vulture ha il sapore di casa."** — design system *Lucanian Heritage*.
Stack: Next.js 15 (App Router) · TypeScript · Tailwind CSS 4 · Three.js + React Three Fiber · GSAP ScrollTrigger · Lucide.

Dati, fonti, recensioni analizzate e punti da verificare: **RESEARCH.md**.

## Avvio

```bash
npm install
npm run dev        # sviluppo → http://localhost:3000
npm run build      # build di produzione (tutte le pagine statiche)
npm start
npm run lint
```

## Pagine

| IT | EN |
|---|---|
| `/` (12 sezioni + footer) | `/en` |
| `/la-nostra-storia` | `/en/our-story` |
| `/la-nostra-cucina` | `/en/our-cuisine` |
| `/menu` | `/en/menu` |
| `/gallery` (filtri + lightbox) | `/en/gallery` |
| `/il-vulture` | `/en/the-vulture` |
| `/recensioni` | `/en/reviews` |
| `/contatti` | `/en/contact` |

Più `/privacy`, `/cookie` (bozze da far validare) e `/admin`.

## Modalità demo (`demoMode`)

Attiva di default (`src/config/site.ts`). In demo:

- banner "Demo" e badge **Da confermare** sui dati non verificati; foto marcate "Immagine illustrativa · Unsplash";
- il modulo di prenotazione simula l'invio (nessun dato trasmesso);
- gli eventi analytics vengono solo scritti in console;
- il sito è `noindex` e `robots.txt` blocca i motori di ricerca;
- nessun prezzo dell'agenzia, nessuna approvazione del ristorante simulata.

Per la messa online reale: `NEXT_PUBLIC_DEMO_MODE=false` e `NEXT_PUBLIC_SITE_URL=https://dominio-definitivo.it`.

## Hero 3D

Scena procedurale (nessun modello esterno): tavolo in legno, piatto in ceramica con orecchiette, mollica e peperoni cruschi, peperoni cruschi interi, calice di vino rosso, bottiglia senza etichetta, candela, muro in pietra con i **tre archi** del logo. Camera lenta con parallasse del mouse e avvicinamento allo scroll; il rendering si ferma quando la hero non è visibile.

Versione leggera su smartphone (meno geometrie, niente ombre e trasmissione del vetro). Con *riduci movimento*, risparmio dati, dispositivi deboli o senza WebGL mostra un fondo statico.
Per forzarla in presentazione: `/?scene=3d` (oppure `/?scene=static`).

## Struttura

```
src/config/site.ts            dati del ristorante, orari, valutazioni, demoMode
src/data/menu.ts              menu (stessa struttura usata dall'admin), allergeni UE
src/data/reviews.ts           sintesi di recensioni reali con fonte
src/data/photos.ts            foto illustrative (ID Unsplash) — da sostituire
src/lib/i18n.ts               rotte IT/EN e testi comuni
src/lib/analytics.ts          eventi di conversione (con consenso)
src/components/three/         scena 3D della tavola
src/components/sections/      sezioni della homepage
src/components/pages.tsx      pagine interne
```

## Menu aggiornabile — cosa c'è e cosa manca

`/admin` (PIN demo: `paradiso`) permette di aggiungere e modificare piatti, prezzi, categorie, disponibilità, stagionalità, allergeni e foto.
**In demo le modifiche si salvano solo nel browser di chi le fa** (localStorage) e si vedono nella pagina Menu di quel dispositivo. Il JSON si esporta e si importa.
Il PIN è una porta di cortesia, **non una protezione reale**: non è un CMS completo.

Per la produzione (costi contenuti):
1. Supabase: tabella `menu_items` con la struttura di `MenuItem` + Storage per le foto.
2. Login del ristoratore (Supabase Auth, magic link) e regole RLS: lettura pubblica, scrittura solo utenti autorizzati.
3. Pagina Menu che legge dal database con revalidate.

## Prenotazioni

Il modulo raccoglie nome, telefono, email (facoltativa), data, ora, persone, note e consenso privacy; distingue **richiesta** e **conferma**. Gli orari proposti seguono i giorni di apertura (il mercoledì è bloccato).
- Demo: flusso simulato.
- Produzione senza backend: apre un'email precompilata verso il ristorante (email da confermare).
- Consigliato: funzione serverless che invia l'email con un servizio transazionale (es. Resend) + Turnstile anti-spam, oppure un gestionale di prenotazioni.

## Analytics

Eventi già predisposti: `phone_click`, `booking_cta_click`, `menu_view`, `directions_click`, `booking_request_submitted`.
Manca: account GA4 o Plausible e banner di consenso. Finché `__analyticsConsent` non è vero non viene inviato nulla.

## Da fornire / confermare con il ristorante

Orari della domenica sera e ferie, email e WhatsApp, logo vettoriale originale, fotografie autorizzate, menu completo con prezzi e allergeni, carta dei vini, storia del locale dal 1980, nome del titolare, metodi di pagamento, ragione sociale e P.IVA. Dettagli in RESEARCH.md.

## Deploy

Interamente statico. Vercel/Netlify collegando il repository, oppure export statico:
```bash
STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/nome-sottocartella npm run build   # cartella out/
```
