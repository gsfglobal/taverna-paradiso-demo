import { HomePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "it", "Taverna Paradiso — Ristorante di cucina lucana a Rionero in Vulture", "Cucina tipica lucana dal 1980 in Via Roma 180 a Rionero in Vulture (PZ): pasta fatta a mano, peperoni cruschi, antipasto della casa e Aglianico del Vulture. Prenota il tuo tavolo.");

export default function Page() {
  return <HomePage locale="it" />;
}
