import type { MetadataRoute } from 'next';
import { CLINICA } from '@/lib/clinica';
import { obtenerProductos } from '@/lib/tienda/datos';

// Se vuelve a generar una vez al día para incluir productos nuevos de la tienda.
export const revalidate = 86400;

const PAGINAS: { ruta: string; prioridad: number }[] = [
  { ruta: '/', prioridad: 1 },
  { ruta: '/especialidades', prioridad: 0.9 },
  { ruta: '/especialidades/ortodoncia', prioridad: 0.9 },
  { ruta: '/especialidades/endodoncia', prioridad: 0.9 },
  { ruta: '/especialidades/implantologia', prioridad: 0.9 },
  { ruta: '/especialidades/odontopediatria', prioridad: 0.9 },
  { ruta: '/especialidades/rehabilitacion-oral', prioridad: 0.8 },
  { ruta: '/especialidades/estetica-dental', prioridad: 0.8 },
  { ruta: '/especialidades/odontologia', prioridad: 0.8 },
  { ruta: '/fonasa', prioridad: 0.8 },
  { ruta: '/convenios', prioridad: 0.7 },
  { ruta: '/calculo', prioridad: 0.7 },
  { ruta: '/equipo', prioridad: 0.7 },
  { ruta: '/nosotros', prioridad: 0.6 },
  { ruta: '/tienda', prioridad: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paginas: MetadataRoute.Sitemap = PAGINAS.map(({ ruta, prioridad }) => ({
    url: `${CLINICA.url}${ruta === '/' ? '' : ruta}`,
    changeFrequency: 'monthly',
    priority: prioridad,
  }));

  // Si Supabase no responde, obtenerProductos devuelve [] y el sitemap sale igual.
  const productos = await obtenerProductos();
  const fichas: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${CLINICA.url}/tienda/${p.slug}`,
    lastModified: p.updated_at,
    changeFrequency: 'weekly',
    priority: 0.3,
  }));

  return [...paginas, ...fichas];
}
