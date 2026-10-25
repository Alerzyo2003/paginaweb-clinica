import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Tratamiento de conducto Fonasa La Pintana',
  descripcion:
    'Si tienes entre 12 y 34 años y eres Fonasa B, C o D, tu tratamiento de conducto puede tener cobertura. Revisa los requisitos y agenda tu evaluación.',
  ruta: '/fonasa',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
