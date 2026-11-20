import { VulturePage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("vulture", "it", "Il Vulture: Laghi di Monticchio, Aglianico e Rionero", "Dove mangiare vicino ai Laghi di Monticchio: idee per una giornata nel Vulture tra il vulcano, i laghi, Rionero in Vulture e l’Aglianico del Vulture.");

export default function Page() {
  return <VulturePage locale="it" />;
}
