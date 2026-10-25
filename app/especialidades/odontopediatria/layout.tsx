import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import RevisadoPor from '@/components/RevisadoPor';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Dentista para niños en La Pintana',
  descripcion:
    'Atención dental para niños desde su primer diente, con odontopediatra y un trato paciente. Agenda la primera visita gratis en La Pintana.',
  ruta: '/especialidades/odontopediatria',
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <RevisadoPor ruta="/especialidades/odontopediatria" />
    </>
  );
}
