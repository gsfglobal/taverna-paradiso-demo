import { GalleryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("gallery", "en", "Gallery", "The rooms, tables and dishes of Taverna Paradiso, a traditional restaurant in the Vulture area.");

export default function Page() {
  return <GalleryPage locale="en" />;
}
