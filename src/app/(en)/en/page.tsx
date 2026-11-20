import { HomePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("home", "en", "Taverna Paradiso — Lucanian restaurant in Rionero in Vulture", "Traditional Lucanian cooking since 1980 at Via Roma 180, Rionero in Vulture (Basilicata): handmade pasta, crusco peppers, local cured meats and Aglianico del Vulture. Book your table.");

export default function Page() {
  return <HomePage locale="en" />;
}
