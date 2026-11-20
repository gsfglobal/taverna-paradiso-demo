import { StoryPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("story", "it", "La nostra storia", "Taverna Paradiso a Rionero in Vulture: specialità tipiche lucane dal 1980, accoglienza familiare e una sala raccolta dietro il portico ad archi.");

export default function Page() {
  return <StoryPage locale="it" />;
}
