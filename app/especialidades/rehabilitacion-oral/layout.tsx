import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Prótesis dentales en La Pintana',
  descripcion:
    'Prótesis y tratamientos para recuperar la masticación y la estética de tu boca. Evaluación gratis en La Pintana.',
  ruta: '/especialidades/rehabilitacion-oral',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
