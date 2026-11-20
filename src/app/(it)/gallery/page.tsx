import { GalleryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("gallery", "it", "Gallery", "Gli ambienti, i tavoli e i piatti di Taverna Paradiso, ristorante tradizionale nel Vulture.");

export default function Page() {
  return <GalleryPage locale="it" />;
}
