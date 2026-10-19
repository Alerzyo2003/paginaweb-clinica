import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Implantes dentales en La Pintana',
  descripcion:
    'Recupera dientes perdidos con implantes de titanio y cirugía maxilofacial. Evaluación gratis con especialista en La Pintana.',
  ruta: '/especialidades/implantologia',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
