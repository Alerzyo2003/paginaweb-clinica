import type { ReactNode } from 'react';
import { metaPagina } from '@/lib/seo';
import { CLINICA, jsonLdSeguro } from '@/lib/clinica';
import { EQUIPO } from '@/lib/equipo';

// Título y descripción que muestra Google para esta página.
export const metadata = metaPagina({
  titulo: 'Dentistas y especialistas en La Pintana',
  descripcion:
    'Conoce a los ortodoncistas, endodoncistas, odontopediatras y cirujanos que atienden en Clínica Dignidad, Av. Venancia Leiva 1871, La Pintana.',
  ruta: '/equipo',
});

/** Cada profesional como Person (schema.org), unido a la clínica por su @id. */
function equipoJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': EQUIPO.map((m) => {
      const prefijo = m.nombre.match(/^(Dra?\.)\s+/)?.[1];
      return {
        '@type': 'Person',
        name: prefijo ? m.nombre.slice(prefijo.length).trim() : m.nombre,
        ...(prefijo && { honorificPrefix: prefijo }),
        jobTitle: m.rol,
        ...(m.foto && { image: `${CLINICA.url}${m.foto}` }),
        worksFor: { '@id': `${CLINICA.url}/#clinica` },
        ...(m.universidad && { alumniOf: { '@type': 'CollegeOrUniversity', name: m.universidad } }),
        ...(m.registroSIS && {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'Registro Nacional de Prestadores Individuales de Salud',
            value: m.registroSIS,
          },
        }),
      };
    }),
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(equipoJsonLd()) }} />
      {children}
    </>
  );
}
