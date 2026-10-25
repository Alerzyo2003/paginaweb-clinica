import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';
import { precio } from '@/lib/precios';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Endodoncia (conductos) en La Pintana',
  descripcion:
    'Tratamiento de conducto con especialista para quitar el dolor y salvar tu diente. Atención particular y por Fonasa según requisitos, en La Pintana.',
  ruta: '/especialidades/endodoncia',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Endodoncia (tratamiento de conducto)',
    descripcion: String(metadata.description),
    ruta: '/especialidades/endodoncia',
    precioDesde: precio('endodoncia').desde,
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Endodoncia', '/especialidades/endodoncia'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/endodoncia" />
    </>
  );
}
