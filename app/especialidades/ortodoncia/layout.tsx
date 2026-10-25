import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Ortodoncia y brackets en La Pintana',
  descripcion:
    'Brackets metálicos, estéticos y alineadores invisibles para niños, jóvenes y adultos. Evaluación gratis con ortodoncista en La Pintana.',
  ruta: '/especialidades/ortodoncia',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Ortodoncia',
    descripcion: String(metadata.description),
    ruta: '/especialidades/ortodoncia',
    precioDesde: precio('brackets').desde,
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Ortodoncia', '/especialidades/ortodoncia'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/ortodoncia" />
    </>
  );
}
