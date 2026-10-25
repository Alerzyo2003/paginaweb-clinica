import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd, servicioJsonLd } from '@/lib/schema';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Dentista para niños en La Pintana',
  descripcion:
    'Atención dental para niños desde su primer diente, con odontopediatra y un trato paciente. Agenda la primera visita gratis en La Pintana.',
  ruta: '/especialidades/odontopediatria',
});

const datos = grafo(
  servicioJsonLd({
    nombre: 'Odontopediatría',
    descripcion: String(metadata.description),
    ruta: '/especialidades/odontopediatria',
  }),
  migasJsonLd([
    ['Especialidades', '/especialidades'],
    ['Odontopediatría', '/especialidades/odontopediatria'],
  ]),
);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={datos} />
      {children}
      <RevisadoPor ruta="/especialidades/odontopediatria" />
    </>
  );
}
