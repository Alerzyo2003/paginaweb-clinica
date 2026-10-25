/* ------------------------------------------------------------------ */
/*  Datos de la clínica en un solo lugar                               */
/*  Si cambia un horario, un teléfono o el link de la agenda, se       */
/*  cambia aquí y queda igual en todo el sitio y en lo que lee Google. */
/* ------------------------------------------------------------------ */

export const CLINICA = {
  nombre: 'Clínica Dignidad',
  eslogan: 'Que sonreír sea costumbre',
  url: 'https://www.clinicadignidad.cl',

  /** Única dirección para agendar en todo el sitio (y la que conviene usar en redes y Google). */
  agendaUrl: 'https://agendar.clinicadignidad.cl/agendar',

  telefono: '+56966467641',
  telefonoVisible: '+56 9 6646 7641',
  whatsappUrl: 'https://wa.me/56966467641',
  /** Línea secundaria. El número principal (arriba) es el que va en Google y en los botones. */
  telefonoSecundario: '+56994464662',
  telefonoSecundarioVisible: '+56 9 9446 4662',
  email: 'recepcion@clinicadignidad.com',

  direccion: {
    calle: 'Av. Venancia Leiva 1871',
    comuna: 'La Pintana',
    region: 'Región Metropolitana',
    codigoPostal: '8820049',
    pais: 'CL',
  },
  geo: { lat: -33.5567012, lng: -70.6438844 },
  mapsUrl: 'https://maps.app.goo.gl/RPNMsrsDnaBE7S2M9',

  /** Debe coincidir con Google Maps. */
  horario: {
    semana: { abre: '08:30', cierra: '19:30' },
    sabado: { abre: '08:30', cierra: '17:00' },
  },

  redes: {
    instagram: 'https://www.instagram.com/clinicadignidad/',
    facebook: 'https://www.facebook.com/clinicadignidad',
  },
} as const;

export const AGENDA_HREF = CLINICA.agendaUrl;

/** Datos estructurados (schema.org) que Google usa para entender que somos una clínica dental. */
export function clinicaJsonLd() {
  const { direccion, geo, horario } = CLINICA;
  return {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    '@id': `${CLINICA.url}/#clinica`,
    name: CLINICA.nombre,
    slogan: CLINICA.eslogan,
    url: CLINICA.url,
    logo: `${CLINICA.url}/logo-dignidad.png`,
    image: `${CLINICA.url}/foto-paciente.png`,
    telephone: CLINICA.telefono,
    email: CLINICA.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: direccion.calle,
      addressLocality: direccion.comuna,
      addressRegion: direccion.region,
      postalCode: direccion.codigoPostal,
      addressCountry: direccion.pais,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng },
    hasMap: CLINICA.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: horario.semana.abre,
        closes: horario.semana.cierra,
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: horario.sabado.abre,
        closes: horario.sabado.cierra,
      },
    ],
    areaServed: ['La Pintana', 'San Ramón', 'La Granja', 'El Bosque'].map((name) => ({ '@type': 'City', name })),
    medicalSpecialty: ['Dentistry'],
    potentialAction: {
      '@type': 'ReserveAction',
      target: CLINICA.agendaUrl,
      name: 'Agendar evaluación gratis',
    },
    sameAs: [CLINICA.redes.instagram, CLINICA.redes.facebook],
  };
}

/** Convierte un objeto a JSON seguro para meterlo en un <script> (evita inyección de HTML). */
export function jsonLdSeguro(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
