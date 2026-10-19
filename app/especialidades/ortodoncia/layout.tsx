import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Ortodoncia en La Pintana · Brackets y alineadores',
  descripcion:
    'Brackets metálicos, estéticos y alineadores invisibles para niños, jóvenes y adultos. Evaluación gratis con ortodoncista en La Pintana.',
  ruta: '/especialidades/ortodoncia',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
