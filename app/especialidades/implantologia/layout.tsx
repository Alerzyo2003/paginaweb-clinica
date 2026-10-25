import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Implantes dentales en La Pintana',
  descripcion:
    'Recupera dientes perdidos con implantes de titanio y cirugía maxilofacial. Evaluación gratis con especialista en La Pintana.',
  ruta: '/especialidades/implantologia',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Implantes dentales',
    descripcion: String(metadata.description),
    ruta: '/especialidades/implantologia',
    precioDesde: precio('implante').desde,
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Implantología', '/especialidades/implantologia'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/implantologia" />
    </>
  );
}
