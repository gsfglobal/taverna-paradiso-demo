import type { Metadata } from "next";
import { Container } from "@/components/ui";

export const metadata: Metadata = { title: "Cookie", alternates: { canonical: "/cookie" } };

export default function Cookie() {
  return (
    <section className="pb-28 pt-36 md:pt-44">
      <Container className="max-w-3xl">
        <p className="eyebrow">Informativa</p>
        <h1 className="display mt-4 text-6xl">Cookie</h1>
        <div className="mt-10 space-y-6 leading-relaxed text-cream/75">
          <p>Questo sito non usa cookie di profilazione né strumenti di tracciamento di terze parti. Font e librerie sono serviti dallo stesso dominio; la mappa di Google viene caricata solo se l&apos;utente preme &ldquo;Carica la mappa&rdquo;: da quel momento valgono i cookie di Google.</p>
          <p>Il sito può usare l&apos;archiviazione locale del browser (sessionStorage) per ricordare la chiusura di un avviso: è un dato tecnico che non identifica l&apos;utente e non viene trasmesso.</p>
          <p>In modalità demo gli eventi di conversione (clic sul telefono, richieste di prenotazione, visualizzazione del menu) vengono solo scritti nella console del browser. In produzione saranno inviati a uno strumento di statistica <strong>solo dopo il consenso</strong>.</p>
          <p className="text-sm text-sand">Se in futuro verranno aggiunti strumenti di statistica o marketing, servirà un banner di consenso conforme alle linee guida del Garante.</p>
        </div>
      </Container>
    </section>
  );
}
