import type { Metadata } from 'next';
import { CLINICA } from '@/lib/clinica';

/**
 * Metadata de una página: título, descripción, URL canónica y vista previa al compartir.
 * - `titulo` va sin " | Clínica Dignidad": la plantilla del layout raíz lo agrega.
 * - `descripcion` ojalá bajo 160 caracteres (Google corta lo que sigue).
 * - `ruta` es la dirección de la página, por ejemplo '/especialidades/ortodoncia'.
 * - `conSubpaginas`: úsalo en un layout que tiene páginas debajo (como /especialidades),
 *   para que esas páginas también terminen en " | Clínica Dignidad".
 */
export function metaPagina({
  titulo,
  descripcion,
  ruta,
  imagen = '/foto-paciente.png',
  conSubpaginas = false,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagen?: string;
  conSubpaginas?: boolean;
}): Metadata {
  return {
    title: conSubpaginas ? { default: titulo, template: `%s | ${CLINICA.nombre}` } : titulo,
    description: descripcion,
    // Cada página debe declarar su propia URL canónica: si no, hereda la del inicio.
    alternates: { canonical: ruta },
    openGraph: {
      type: 'website',
      locale: 'es_CL',
      siteName: CLINICA.nombre,
      title: `${titulo} | ${CLINICA.nombre}`,
      description: descripcion,
      url: ruta,
      images: [{ url: imagen }],
    },
  };
}
