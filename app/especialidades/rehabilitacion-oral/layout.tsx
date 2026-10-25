import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Prótesis dentales en La Pintana',
  descripcion:
    'Prótesis y tratamientos para recuperar la masticación y la estética de tu boca. Evaluación gratis en La Pintana.',
  ruta: '/especialidades/rehabilitacion-oral',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Rehabilitación oral y prótesis',
    descripcion: String(metadata.description),
    ruta: '/especialidades/rehabilitacion-oral',
    precioDesde: Math.min(precio('corona').desde, precio('protesis').desde),
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Rehabilitación oral', '/especialidades/rehabilitacion-oral'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/rehabilitacion-oral" />
    </>
  );
}
