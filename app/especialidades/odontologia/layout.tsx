import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Limpieza dental y tapaduras en La Pintana',
  descripcion:
    'Limpiezas, tapaduras y controles para toda la familia. Evaluación gratis en Av. Venancia Leiva 1871, La Pintana.',
  ruta: '/especialidades/odontologia',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RevisadoPor ruta="/especialidades/odontologia" />
    </>
  );
}
