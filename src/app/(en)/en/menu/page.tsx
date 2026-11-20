import { MenuPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("menu", "en", "Menu", "The menu of Taverna Paradiso, a Lucanian restaurant in Rionero in Vulture: starters, handmade pasta, mains, sides, desserts and local wines.");

export default function Page() {
  return <MenuPage locale="en" />;
}
