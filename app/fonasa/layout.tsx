import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd } from '@/lib/schema';
import RevisadoPor from '@/components/RevisadoPor';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Tratamiento de conducto Fonasa La Pintana',
  descripcion:
    'Bono PAD Fonasa para tratamiento de conducto: copago desde $80.050 si tienes 12 a 34 años y eres tramo B, C o D. Requisitos y pasos en La Pintana.',
  ruta: '/fonasa',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={grafo(migasJsonLd([['Bono PAD Fonasa', '/fonasa']]))} />
      {children}
      <RevisadoPor ruta="/fonasa" />
    </>
  );
}
