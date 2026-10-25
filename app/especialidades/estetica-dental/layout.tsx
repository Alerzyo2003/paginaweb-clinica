import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Estética dental y carillas en La Pintana',
  descripcion:
    'Blanqueamiento, carillas y diseño de sonrisa en La Pintana. Agenda una evaluación gratis y te recomendamos la opción que más te conviene.',
  ruta: '/especialidades/estetica-dental',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RevisadoPor ruta="/especialidades/estetica-dental" />
    </>
  );
}
