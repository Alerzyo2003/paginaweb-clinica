import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Limpieza dental y tapaduras en La Pintana',
  descripcion:
    'Limpiezas, tapaduras y controles para toda la familia. Evaluación gratis en Av. Venancia Leiva 1871, La Pintana.',
  ruta: '/especialidades/odontologia',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Odontología general',
    descripcion: String(metadata.description),
    ruta: '/especialidades/odontologia',
    precioDesde: precio('limpieza').desde,
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Odontología general', '/especialidades/odontologia'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/odontologia" />
    </>
  );
}
