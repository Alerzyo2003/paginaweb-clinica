import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Estética dental y carillas en La Pintana',
  descripcion:
    'Blanqueamiento, carillas y diseño de sonrisa en La Pintana. Agenda una evaluación gratis y te recomendamos la opción que más te conviene.',
  ruta: '/especialidades/estetica-dental',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Estética dental',
    descripcion: String(metadata.description),
    ruta: '/especialidades/estetica-dental',
    precioDesde: precio('blanqueamiento').desde,
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Estética dental', '/especialidades/estetica-dental'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/estetica-dental" />
    </>
  );
}
