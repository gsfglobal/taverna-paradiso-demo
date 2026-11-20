/**
 * Foto illustrative con licenza Unsplash (uso commerciale gratuito, nessuna attribuzione obbligatoria).
 * NON ritraggono Taverna Paradiso: vanno sostituite con il servizio fotografico del ristorante
 * o con foto del titolare autorizzate per iscritto.
 * Fonte di ogni immagine: https://unsplash.com/photos/<id> (id = parte finale dopo "photo-")
 */
const B = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const photos = {
  orecchiette: { src: B + "/images/orecchiette.jpg", unsplash: "1649334020857-788daeee98dd" },
  pastaFresca: { src: B + "/images/pasta-fresca.jpg", unsplash: "1787770184835-7c83fd010c56" },
  maniPasta: { src: B + "/images/mani-pasta.jpg", unsplash: "1642354571956-d77dfd9596bb" },
  primoMollica: { src: B + "/images/primo-mollica.jpg", unsplash: "1591526376722-d3054ff28356" },
  cruschi: { src: B + "/images/cruschi.jpg", unsplash: "1602237514002-c2d8ae2da393" },
  cruschiAppesi: { src: B + "/images/cruschi-appesi.jpg", unsplash: "1564934956228-e50e8f3e387e" },
  cruschiMazzo: { src: B + "/images/cruschi-mazzo.jpg", unsplash: "1603144930095-829ef9656c30" },
  vinoTavola: { src: B + "/images/vino-tavola.jpg", unsplash: "1553361371-9b22f78e8b1d" },
  vinoUva: { src: B + "/images/vino-uva.jpg", unsplash: "1474722883778-792e7990302f" },
  cantina: { src: B + "/images/cantina.jpg", unsplash: "1611575189074-9dfbbceb258a" },
  brindisi: { src: B + "/images/brindisi.jpg", unsplash: "1510812431401-41d2bd2722f3" },
  tagliere: { src: B + "/images/tagliere.jpg", unsplash: "1695606392727-d8b959879721" },
  spezzatino: { src: B + "/images/spezzatino.jpg", unsplash: "1608500219063-e5164085cd6f" },
  arrosto: { src: B + "/images/arrosto.jpg", unsplash: "1678684279246-96e6afb970f2" },
  legno: { src: B + "/images/legno.jpg", unsplash: "1622830208445-0860d751ba11" },
  tavolaBottiglie: { src: B + "/images/tavola-bottiglie.jpg", unsplash: "1708077807506-def62f143796" },
  salaRustica: { src: B + "/images/sala-rustica.jpg", unsplash: "1527854176090-66db22836da9" },
  salaCalda: { src: B + "/images/sala-calda.jpg", unsplash: "1712630514718-3830cc6c0d0a" },
  archiPietra: { src: B + "/images/archi-pietra.jpg", unsplash: "1687950650936-3171cdfdab11" },
  archiPietra2: { src: B + "/images/archi-pietra-2.jpg", unsplash: "1591814416053-53edf5ac5cf5" },
  bruschetta: { src: B + "/images/bruschetta.jpg", unsplash: "1594978583693-8dfdfc93f052" },
  paneOlio: { src: B + "/images/pane-olio.jpg", unsplash: "1582536446725-5ad9e6ef0535" },
  pane: { src: B + "/images/pane.jpg", unsplash: "1542482331-f0979d6616ad" },
  castagne: { src: B + "/images/castagne.jpg", unsplash: "1573991091002-9d60934af2dc" },
  dolce: { src: B + "/images/dolce.jpg", unsplash: "1710106519622-8c49d0bcff2f" },
  ravioli: { src: B + "/images/ravioli.jpg", unsplash: "1628885363743-fbf9c98d4196" },
  ravioliCrudi: { src: B + "/images/ravioli-crudi.jpg", unsplash: "1665761543682-6305ccc5398b" },
  lago: { src: B + "/images/lago.jpg", unsplash: "1621001481340-1e7b901389c5" },
  lagoNebbia: { src: B + "/images/lago-nebbia.jpg", unsplash: "1621001481322-facc9cd1dae7" },
  vignaMonti: { src: B + "/images/vigna-monti.jpg", unsplash: "1667743537770-2b4691bfe7a3" },
  vignaOro: { src: B + "/images/vigna-oro.jpg", unsplash: "1596142332133-327e2a0ff006" },
  borgoSera: { src: B + "/images/borgo-sera.jpg", unsplash: "1596142331806-69b52e92eae8" },
  borgoTetti: { src: B + "/images/borgo-tetti.jpg", unsplash: "1648118487893-4829c16703a8" },
  baccala: { src: B + "/images/baccala.jpg", unsplash: "1606850781729-d5e6a68b3be5" },
} as const;

export type PhotoKey = keyof typeof photos;

/** Foto per i piatti del menu (per id) */
export const dishPhotos: Record<string, PhotoKey> = {
  "antipasto-taverna": "tagliere",
  "bruschetta": "bruschetta",
  "strascinati-cruschi": "primoMollica",
  "orecchiette-panfritto": "orecchiette",
  "ravioli-casa": "ravioli",
  "baccala-cruschi": "baccala",
  "agnello-cacciatora": "spezzatino",
  "arrosto-misto": "arrosto",
  "dolce-casa": "dolce",
  "castagne": "castagne",
};
