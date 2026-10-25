/* ------------------------------------------------------------------ */
/*  Datos estructurados (schema.org) por página                        */
/*  La ficha completa de la clínica (Dentist) va solo en el inicio;    */
/*  el resto de las páginas la nombra por su @id.                      */
/* ------------------------------------------------------------------ */

import { CLINICA } from '@/lib/clinica';
import type { Producto } from '@/lib/tienda/tipos';

export const CLINICA_ID = `${CLINICA.url}/#clinica`;
const url = (ruta: string) => `${CLINICA.url}${ruta === '/' ? '' : ruta}`;

/** Migas de pan: [['Especialidades', '/especialidades'], ['Ortodoncia', '/especialidades/ortodoncia']] */
export function migasJsonLd(items: [nombre: string, ruta: string][]) {
  const todos: [string, string][] = [['Inicio', '/'], ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: todos.map(([name, ruta], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: url(ruta),
    })),
  };
}

/** Un tratamiento que ofrece la clínica, con su precio desde (si se conoce). */
export function servicioJsonLd({
  nombre,
  descripcion,
  ruta,
  precioDesde,
}: {
  nombre: string;
  descripcion: string;
  ruta: string;
  precioDesde?: number;
}) {
  return {
    '@type': 'Service',
    '@id': `${url(ruta)}#servicio`,
    name: nombre,
    serviceType: nombre,
    description: descripcion,
    url: url(ruta),
    provider: { '@id': CLINICA_ID },
    areaServed: { '@type': 'City', name: CLINICA.direccion.comuna },
    ...(precioDesde !== undefined && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'CLP',
        price: precioDesde,
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: precioDesde,
          priceCurrency: 'CLP',
        },
      },
    }),
  };
}

/** Producto de la tienda con su precio y disponibilidad (retiro en la clínica). */
export function productoJsonLd(p: Producto) {
  return {
    '@type': 'Product',
    '@id': `${url(`/tienda/${p.slug}`)}#producto`,
    name: p.nombre,
    ...(p.marca && { brand: { '@type': 'Brand', name: p.marca } }),
    ...(p.descripcion && { description: p.descripcion }),
    ...(p.imagen_url && { image: p.imagen_url }),
    sku: p.slug,
    offers: {
      '@type': 'Offer',
      url: url(`/tienda/${p.slug}`),
      priceCurrency: 'CLP',
      price: p.precio,
      availability: p.agotado ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': CLINICA_ID },
      // Solo retiro en la clínica: no hay envío.
      availableDeliveryMethod: 'https://purl.org/goodrelations/v1#DeliveryModePickUp',
    },
  };
}

/** Junta varios bloques en un solo <script type="application/ld+json">. */
export function grafo(...nodos: object[]) {
  return { '@context': 'https://schema.org', '@graph': nodos };
}
