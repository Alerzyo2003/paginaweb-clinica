import Link from 'next/link';
import PaginaLegal from '@/components/PaginaLegal';
import { CLINICA } from '@/lib/clinica';
import { metaPagina } from '@/lib/seo';

export const metadata = metaPagina({
  titulo: 'Política de privacidad',
  descripcion:
    'Cómo Clínica Dignidad recopila, usa y protege tus datos personales en el sitio web, la agenda y la tienda, y cómo ejercer tus derechos.',
  ruta: '/privacidad',
});

// Borrador preparado para revisión legal. Antes de publicarlo como definitivo, completa la
// razón social y el RUT del responsable, y pídele a un abogado que lo revise
// (Ley 19.628 y Ley 21.719, vigente desde el 1 de diciembre de 2026).
const RESPONSABLE = CLINICA.nombre;

export default function PrivacidadPage() {
  return (
    <PaginaLegal titulo="Política de privacidad" actualizado="2026-10-25">
      <p>
        En {RESPONSABLE} cuidamos tus datos personales con la misma seriedad con la que cuidamos tu salud. Esta política
        explica qué datos recopilamos a través de este sitio web, para qué los usamos y cómo puedes ejercer tus derechos.
      </p>

      <h2>Quién es responsable de tus datos</h2>
      <p>
        {RESPONSABLE}, con domicilio en {CLINICA.direccion.calle}, {CLINICA.direccion.comuna},{' '}
        {CLINICA.direccion.region}. Puedes escribirnos a <a href={`mailto:${CLINICA.email}`}>{CLINICA.email}</a> o al
        WhatsApp {CLINICA.telefonoVisible}.
      </p>

      <h2>Qué datos recopilamos</h2>
      <ul>
        <li>
          <strong>Pedidos de la tienda:</strong> nombre, teléfono, correo (si lo entregas), productos, forma de pago, día
          de retiro y la nota que agregues.
        </li>
        <li>
          <strong>Contacto:</strong> lo que nos escribas por WhatsApp, teléfono o correo.
        </li>
        <li>
          <strong>Agenda:</strong> las horas se reservan en nuestra agenda en línea, que tiene sus propias condiciones de
          uso y donde ingresas tus datos de identificación y contacto.
        </li>
        <li>
          <strong>Navegación:</strong> datos técnicos y anónimos sobre la velocidad de carga del sitio, que no te
          identifican personalmente.
        </li>
      </ul>
      <p>
        Este sitio no recopila información de tu ficha clínica. Tu ficha clínica se maneja en la clínica, es
        confidencial y se rige por la Ley 20.584 sobre derechos y deberes de los pacientes.
      </p>

      <h2>Para qué usamos tus datos</h2>
      <ul>
        <li>Preparar tu pedido, avisarte cuando esté listo y coordinar el retiro.</li>
        <li>Responder tus consultas y gestionar tus horas.</li>
        <li>Mejorar el funcionamiento y la velocidad del sitio.</li>
      </ul>
      <p>
        No vendemos ni arrendamos tus datos. Solo te enviaremos promociones si nos das tu autorización expresa, y puedes
        retirarla cuando quieras.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>
        Usamos proveedores tecnológicos que nos prestan servicios de alojamiento web y base de datos (por ejemplo,
        Vercel y Supabase). Ellos tratan los datos solo para prestar ese servicio. También podemos entregar datos cuando
        lo exija la ley o una autoridad competente.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Los datos de pedidos se guardan mientras sean necesarios para entregarlos, para cumplir obligaciones legales y
        tributarias, y para atender garantías o reclamos.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedirnos acceder a tus datos, corregirlos, eliminarlos, oponerte a su uso o solicitar su portabilidad.
        Escríbenos a <a href={`mailto:${CLINICA.email}`}>{CLINICA.email}</a> indicando tu nombre y lo que necesitas, y
        te responderemos dentro de los plazos que establece la ley.
      </p>

      <h2>Seguridad</h2>
      <p>
        El sitio usa conexión cifrada (HTTPS) y el acceso a los pedidos está restringido al personal autorizado de la
        clínica.
      </p>

      <h2>Cambios a esta política</h2>
      <p>
        Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización. Revisa
        también los <Link href="/terminos-tienda">términos de la tienda</Link>.
      </p>
    </PaginaLegal>
  );
}
