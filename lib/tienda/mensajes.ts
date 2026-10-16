/* ------------------------------------------------------------------ */
/*  Mensajes de WhatsApp que el panel le prepara a cada cliente.        */
/*  Puedes cambiar los textos aquí. Antes de enviar, WhatsApp te deja   */
/*  revisar y editar el mensaje.                                        */
/* ------------------------------------------------------------------ */

import { hayDatosTransferencia, TIENDA } from './config';
import { precio } from './formato';
import { fechaLarga, horarioDelDia, hoyEnChile } from './retiro';
import type { Pedido } from './tipos';

export type PlantillaId =
  | 'confirmar'
  | 'recordar_pago'
  | 'pago_recibido'
  | 'listo'
  | 'recordar_retiro'
  | 'gracias'
  | 'cancelado';

type Plantilla = {
  id: PlantillaId;
  /** Texto del botón en el panel. */
  nombre: string;
  texto: (p: Pedido) => string;
};

/* ---------- Piezas que se repiten ---------- */

function primerNombre(p: Pedido) {
  const n = p.cliente_nombre.trim().split(/\s+/)[0] ?? '';
  return n.charAt(0).toLocaleUpperCase('es-CL') + n.slice(1);
}

function productos(p: Pedido) {
  return p.items.map((i) => `• ${i.cantidad} x ${i.nombre}`).join('\n');
}

/** "lunes a viernes de 8:30 a 19:30 y sábado de 8:30 a 17:00" */
export function horarioEnTexto() {
  return TIENDA.horario.map((h) => h.charAt(0).toLocaleLowerCase('es-CL') + h.slice(1)).join(' y ');
}

function dondeYCuando() {
  return `Atendemos ${horarioEnTexto()}, en ${TIENDA.direccion}.`;
}

/** El día de retiro todavía no pasa (los pedidos antiguos no lo tienen). */
function retiroVigente(p: Pedido) {
  return p.fecha_retiro && p.fecha_retiro >= hoyEnChile() ? p.fecha_retiro : null;
}

/** "Te esperamos el sábado 17 de octubre, de 8:30 a 17:00, en Av. …" */
function teEsperamos(fecha: string) {
  return `Te esperamos el ${fechaLarga(fecha)}, ${horarioDelDia(fecha)}, en ${TIENDA.direccion}.`;
}

function datosTransferencia(p: Pedido) {
  const t = TIENDA.transferencia;
  if (!hayDatosTransferencia()) return '';
  const cuentas = t.cuentas.map((c) => `${c.banco}, ${c.tipoCuenta.toLowerCase()}: ${c.numeroCuenta}`);
  return [
    ...cuentas,
    t.titular && `Titular: ${t.titular}`,
    t.rut && `RUT: ${t.rut}`,
    t.email && `Correo: ${t.email}`,
    `Monto: ${precio(p.total)}`,
    `Comentario: Pedido ${p.numero}`,
  ]
    .filter(Boolean)
    .join('\n');
}

/* ---------- Plantillas, en el orden en que avanza un pedido ---------- */

export const PLANTILLAS: Plantilla[] = [
  {
    id: 'confirmar',
    nombre: 'Confirmar pedido',
    texto: (p) => {
      const inicio = `Hola ${primerNombre(p)} 👋 Te escribimos de Clínica Dignidad. Recibimos tu pedido N° ${p.numero}:\n\n${productos(p)}\n\n`;
      const fecha = retiroVigente(p);
      if (p.metodo_pago === 'pago_al_retirar') {
        return `${inicio}Total a pagar al retirar: ${precio(p.total)}\n\n${
          fecha ? teEsperamos(fecha) : `¿Qué día te acomoda venir a buscarlo? ${dondeYCuando()}`
        }`;
      }
      const datos = datosTransferencia(p);
      const dia = fecha ? ` ${teEsperamos(fecha)}` : ' y cuéntanos qué día quieres venir a retirarlo.';
      return datos
        ? `${inicio}Total: ${precio(p.total)}\n\nPara dejarlo reservado, transfiere a cualquiera de estas cuentas:\n\n${datos}\n\nLuego envíanos el comprobante por aquí${fecha ? '.' : ''}${dia} ¡Gracias!`
        : `${inicio}Total: ${precio(p.total)}\n\nTe enviamos ahora los datos para transferir. Cuando pagues, mándanos el comprobante por aquí${fecha ? '.' : ''}${dia}`;
    },
  },
  {
    id: 'recordar_pago',
    nombre: 'Recordar transferencia',
    texto: (p) => {
      const datos = datosTransferencia(p);
      return (
        `Hola ${primerNombre(p)}, ¿cómo estás? Te escribimos de Clínica Dignidad. ` +
        `Tu pedido N° ${p.numero} por ${precio(p.total)} sigue esperando la transferencia.\n\n` +
        (datos
          ? `Si ya pagaste, envíanos el comprobante por aquí 🙌 Si aún no, estos son los datos:\n\n${datos}\n\n`
          : 'Si ya pagaste, envíanos el comprobante por aquí 🙌 Si necesitas los datos para transferir, te los enviamos.\n\n') +
        `Te guardamos los productos ${TIENDA.diasReserva} días hábiles. Si ya no lo quieres, avísanos y lo anulamos sin problema.`
      );
    },
  },
  {
    id: 'pago_recibido',
    nombre: 'Pago recibido',
    texto: (p) => {
      const fecha = retiroVigente(p);
      return (
        `¡Hola ${primerNombre(p)}! Recibimos tu transferencia de ${precio(p.total)} ✅ Muchas gracias.\n\n` +
        (fecha
          ? `Tu pedido N° ${p.numero} queda reservado. ${teEsperamos(fecha)} Si necesitas cambiar el día, avísanos por aquí.`
          : `¿Qué día te acomoda venir a retirar tu pedido N° ${p.numero}? ${dondeYCuando()}\n\nRespóndenos con el día y te lo dejamos listo.`)
      );
    },
  },
  {
    id: 'listo',
    nombre: 'Ya está listo',
    texto: (p) =>
      `¡Hola ${primerNombre(p)}! Tenemos tus productos listos 🦷✨\n\nPedido N° ${p.numero}:\n${productos(p)}\n\n` +
      (p.metodo_pago === 'pago_al_retirar'
        ? `Total a pagar en recepción: ${precio(p.total)}\n\n`
        : 'Ya está pagado, solo tienes que venir a buscarlo.\n\n') +
      `${retiroVigente(p) ? teEsperamos(retiroVigente(p)!) : dondeYCuando()} Menciona tu número de pedido en recepción. Te lo guardamos ${TIENDA.diasReserva} días hábiles.`,
  },
  {
    id: 'recordar_retiro',
    nombre: 'Recordar retiro',
    texto: (p) =>
      `Hola ${primerNombre(p)}, te recordamos que tu pedido N° ${p.numero} te está esperando en la clínica 😊\n\n` +
      `${dondeYCuando()} ¿Qué día te acomoda venir?`,
  },
  {
    id: 'gracias',
    nombre: 'Gracias por tu compra',
    texto: (p) =>
      `¡Gracias por tu compra, ${primerNombre(p)}! Si tienes cualquier duda sobre cómo usar tus productos, escríbenos por aquí.\n\n` +
      'Que sonreír sea costumbre 😁\nClínica Dignidad',
  },
  {
    id: 'cancelado',
    nombre: 'Pedido anulado',
    texto: (p) =>
      `Hola ${primerNombre(p)}, te escribimos de Clínica Dignidad. ` +
      (p.metodo_pago === 'transferencia'
        ? `Como no recibimos la transferencia, anulamos tu pedido N° ${p.numero}.`
        : `Como no alcanzaste a retirarlo, anulamos tu pedido N° ${p.numero}.`) +
      '\n\nSi todavía quieres los productos, escríbenos por aquí o haz un nuevo pedido en la tienda y te lo dejamos listo.',
  },
];

const POR_ID = new Map(PLANTILLAS.map((m) => [m.id, m]));

export function plantilla(id: PlantillaId) {
  return POR_ID.get(id)!;
}

/** El mensaje que más conviene enviar según el estado del pedido. */
export function mensajeSugerido(p: Pedido): PlantillaId {
  switch (p.estado) {
    case 'pendiente':
      return p.metodo_pago === 'transferencia' ? 'recordar_pago' : 'confirmar';
    case 'pagado':
      return p.metodo_pago === 'transferencia' ? 'pago_recibido' : 'listo';
    case 'listo':
      return 'listo';
    case 'entregado':
      return 'gracias';
    case 'cancelado':
      return 'cancelado';
  }
}

/** Teléfono guardado ("912345678") → número para wa.me ("56912345678"). */
export function telefonoWhatsApp(telefono: string) {
  const d = telefono.replace(/\D/g, '');
  return d.startsWith('56') ? d : `56${d}`;
}

export function linkMensaje(p: Pedido, id: PlantillaId) {
  return `https://wa.me/${telefonoWhatsApp(p.cliente_telefono)}?text=${encodeURIComponent(plantilla(id).texto(p))}`;
}
