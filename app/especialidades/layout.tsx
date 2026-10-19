import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Especialidades dentales en La Pintana',
  descripcion:
    'Ortodoncia, implantes, endodoncia, estética dental, odontopediatría y rehabilitación oral en un mismo lugar. Agenda tu evaluación gratis.',
  ruta: '/especialidades',
  conSubpaginas: true,
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
