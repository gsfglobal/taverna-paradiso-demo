import { ContactPage } from "@/components/pages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta("contact", "it", "Contatti e prenotazioni", "Prenota un tavolo da Taverna Paradiso, Via Roma 180, Rionero in Vulture (PZ). Telefono +39 339 105 1967, chiuso il mercoledì.");

export default function Page() {
  return <ContactPage locale="it" />;
}
