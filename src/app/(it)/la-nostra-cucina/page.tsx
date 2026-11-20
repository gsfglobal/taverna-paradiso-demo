import { CuisinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cuisine", "it", "La nostra cucina", "Strascinati con peperoni cruschi, orecchiette, agnello alla cacciatora, baccalà: la cucina tipica lucana di Taverna Paradiso a Rionero in Vulture.");

export default function Page() {
  return <CuisinePage locale="it" />;
}
