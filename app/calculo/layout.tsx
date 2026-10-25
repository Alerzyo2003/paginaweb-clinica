import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd } from '@/lib/schema';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Precios de tratamientos dentales',
  descripcion:
    'Calcula un valor estimado de tu tratamiento: limpieza, tapaduras, conductos, coronas, implantes, brackets y más. Evaluación gratis en La Pintana.',
  ruta: '/calculo',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={grafo(migasJsonLd([['Precios', '/calculo']]))} />
      {children}
    </>
  );
}
