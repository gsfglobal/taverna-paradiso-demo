import { ReviewsPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("reviews", "en", "Reviews", "Guest reviews of Taverna Paradiso in Rionero in Vulture, with Tripadvisor, Google and Facebook ratings linked to the sources.");

export default function Page() {
  return <ReviewsPage locale="en" />;
}
