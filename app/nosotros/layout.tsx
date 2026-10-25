import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd } from '@/lib/schema';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Nosotros · Clínica dental en La Pintana',
  descripcion:
    'Conoce Clínica Dignidad: atención dental y médica cercana en Av. Venancia Leiva 1871, La Pintana. Atendemos de lunes a sábado.',
  ruta: '/nosotros',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={grafo(migasJsonLd([['Nosotros', '/nosotros']]))} />
      {children}
    </>
  );
}
