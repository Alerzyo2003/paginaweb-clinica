import { jsonLdSeguro } from '@/lib/clinica';

/** Imprime datos estructurados (schema.org) en la página. */
export default function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(data) }} />;
}
