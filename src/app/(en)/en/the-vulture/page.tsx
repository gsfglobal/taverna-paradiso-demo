import { VulturePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("vulture", "en", "The Vulture: Monticchio lakes, Aglianico and Rionero", "Where to eat near the Monticchio lakes: ideas for a day in the Vulture, between the volcano, the lakes, Rionero in Vulture and Aglianico del Vulture wine.");

export default function Page() {
  return <VulturePage locale="en" />;
}
