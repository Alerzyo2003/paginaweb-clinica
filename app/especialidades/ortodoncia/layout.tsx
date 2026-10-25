import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Ortodoncia y brackets en La Pintana',
  descripcion:
    'Brackets metálicos, estéticos y alineadores invisibles para niños, jóvenes y adultos. Evaluación gratis con ortodoncista en La Pintana.',
  ruta: '/especialidades/ortodoncia',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RevisadoPor ruta="/especialidades/ortodoncia" />
    </>
  );
}
