import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Endodoncia en La Pintana · Tratamiento de conducto',
  descripcion:
    'Tratamiento de conducto con especialista para quitar el dolor y salvar tu diente. Atención particular y por Fonasa según requisitos, en La Pintana.',
  ruta: '/especialidades/endodoncia',
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
