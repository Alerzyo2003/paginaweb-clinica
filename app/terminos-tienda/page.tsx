import Link from 'next/link';
import PaginaLegal from '@/components/PaginaLegal';
import { CLINICA } from '@/lib/clinica';
import { TIENDA } from '@/lib/tienda/config';
import { metaPagina } from '@/lib/seo';

export const metadata = metaPagina({
  titulo: 'Términos y condiciones de la tienda',
  descripcion:
    'Condiciones de compra de la tienda de Clínica Dignidad: precios, pago, retiro en La Pintana, derecho a retracto y garantía legal.',
  ruta: '/terminos-tienda',
});

// Borrador preparado para revisión legal (Ley 19.496 de protección de los derechos de los consumidores).
// Antes de darlo por definitivo, completa la razón social y el RUT, y pídele a un abogado que lo revise.

export default function TerminosTiendaPage() {
  return (
    <PaginaLegal titulo="Términos y condiciones de la tienda" actualizado="2026-10-25">
      <p>
        Estos términos aplican a las compras hechas en la <Link href="/tienda">tienda</Link> de {CLINICA.nombre},{' '}
        {TIENDA.direccion}. Al confirmar un pedido aceptas estas condiciones.
      </p>

      <h2>Productos y precios</h2>
      <p>
        Los precios están en pesos chilenos e incluyen IVA. Las fotos son referenciales. El stock se actualiza con cada
        pedido; si un producto se agota después de que lo pediste, te avisaremos para cambiarlo o anularlo sin costo.
      </p>

      <h2>Cómo comprar</h2>
      <p>
        Agregas los productos al carrito, ingresas tus datos y eliges el día de retiro y la forma de pago. Te
        confirmamos el pedido por WhatsApp al {TIENDA.telefonoVisible} con su número.
      </p>

      <h2>Formas de pago</h2>
      <ul>
        <li>Transferencia bancaria, con los datos que te enviamos al confirmar el pedido.</li>
        <li>Pago en la clínica al momento de retirar.</li>
      </ul>

      <h2>Retiro</h2>
      <p>
        No hacemos envíos: los pedidos se retiran en {TIENDA.direccion}, en horario de atención (
        {TIENDA.horario.join(' y ').toLowerCase()}). Guardamos tu pedido {TIENDA.diasReserva} días hábiles desde la
        fecha de retiro elegida; después de ese plazo podemos liberarlo.
      </p>

      <h2>Derecho a retracto</h2>
      <p>
        Como compraste a distancia, puedes arrepentirte dentro de los 10 días siguientes a que retiras el producto,
        siempre que esté sin abrir ni usar y en su empaque original. Avísanos por WhatsApp o a{' '}
        <a href={`mailto:${CLINICA.email}`}>{CLINICA.email}</a> y tráelo a la clínica; te devolvemos el dinero pagado.
        Por higiene, los productos abiertos (como cepillos o pastas) no se pueden devolver por retracto.
      </p>

      <h2>Garantía legal</h2>
      <p>
        Si un producto viene defectuoso, incompleto o no sirve para su uso, tienes 6 meses desde que lo recibes para
        elegir entre cambiarlo, repararlo o que te devolvamos el dinero, presentando tu comprobante de compra.
      </p>

      <h2>Datos personales</h2>
      <p>
        Usamos tus datos solo para gestionar el pedido. Revisa nuestra <Link href="/privacidad">política de
        privacidad</Link>.
      </p>

      <h2>Contacto y reclamos</h2>
      <p>
        Para cualquier consulta o reclamo escríbenos por WhatsApp al {TIENDA.telefonoVisible} o a{' '}
        <a href={`mailto:${CLINICA.email}`}>{CLINICA.email}</a>. También puedes acudir al Servicio Nacional del
        Consumidor (Sernac).
      </p>
    </PaginaLegal>
  );
}
