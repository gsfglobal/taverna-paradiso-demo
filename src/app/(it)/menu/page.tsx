import { MenuPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("menu", "it", "Menu", "Il menu di Taverna Paradiso, ristorante di cucina lucana a Rionero in Vulture: antipasti, primi fatti a mano, secondi, contorni, dolci e vini del territorio.");

export default function Page() {
  return <MenuPage locale="it" />;
}
