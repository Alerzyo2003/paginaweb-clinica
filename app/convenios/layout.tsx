import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Convenios dentales en La Pintana',
  descripcion:
    'Descuentos en salud dental para colegios, empresas, municipalidades y titulares de la Tarjeta + Comunidad de La Pintana. Evaluación gratis para beneficiarios.',
  ruta: '/convenios',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
