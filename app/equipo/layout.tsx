import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Dentistas y especialistas en La Pintana',
  descripcion:
    'Conoce a los ortodoncistas, endodoncistas, odontopediatras y cirujanos que atienden en Clínica Dignidad, Av. Venancia Leiva 1871, La Pintana.',
  ruta: '/equipo',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
