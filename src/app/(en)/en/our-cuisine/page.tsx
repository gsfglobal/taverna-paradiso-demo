import { CuisinePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("cuisine", "en", "Our cuisine", "Strascinati with crusco peppers, orecchiette, lamb cacciatora, salt cod: traditional Lucanian cooking at Taverna Paradiso, Rionero in Vulture.");

export default function Page() {
  return <CuisinePage locale="en" />;
}
