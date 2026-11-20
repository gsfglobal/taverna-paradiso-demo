import { StoryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("story", "en", "Our story", "Taverna Paradiso in Rionero in Vulture: typical Lucanian specialities since 1980, a family welcome and an intimate dining room behind the arched portico.");

export default function Page() {
  return <StoryPage locale="en" />;
}
