import { ContactPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "en", "Contact & booking", "Book a table at Taverna Paradiso, Via Roma 180, Rionero in Vulture (PZ), Italy. Phone +39 339 105 1967, closed on Wednesdays.");

export default function Page() {
  return <ContactPage locale="en" />;
}
