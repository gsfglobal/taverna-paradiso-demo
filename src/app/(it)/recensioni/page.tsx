import { ReviewsPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("reviews", "it", "Recensioni", "Le recensioni degli ospiti di Taverna Paradiso a Rionero in Vulture, con valutazioni Tripadvisor, Google e Facebook e link alle fonti.");

export default function Page() {
  return <ReviewsPage locale="it" />;
}
