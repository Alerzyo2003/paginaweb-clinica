/* ------------------------------------------------------------------ */
/*  Datos de la tienda que puedes cambiar sin tocar el resto del código */
/* ------------------------------------------------------------------ */

export const TIENDA = {
  /** Número de WhatsApp sin "+" ni espacios (lo usa wa.me). */
  whatsapp: '56966467641',
  telefonoVisible: '+56 9 6646 7641',

  direccion: 'Av. Venancia Leiva 1871, La Pintana',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Venancia+Leiva+1871,+La+Pintana',
  horario: ['Lunes a viernes de 8:30 a 19:00', 'Sábado de 8:30 a 17:00'],

  /** Días hábiles que guardas un pedido antes de liberarlo. */
  diasReserva: 3,

  /**
   * Datos para transferir. El cliente puede usar cualquiera de las cuentas.
   * Si dejas la lista vacía, la tienda le dice que le enviarán los datos por WhatsApp.
   */
  transferencia: {
    /** Razón social de la empresa. Si queda vacío, no se muestra. */
    titular: '',
    rut: '77.562.529-5',
    email: 'recepcion@clinicadignidad.com',
    cuentas: [
      { banco: 'Santander', tipoCuenta: 'Cuenta corriente', numeroCuenta: '00008681833-7' },
      { banco: 'Scotiabank', tipoCuenta: 'Cuenta corriente', numeroCuenta: '991066225' },
    ],
  },
} as const;

export function linkWhatsApp(texto: string) {
  return `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function hayDatosTransferencia() {
  return TIENDA.transferencia.cuentas.some((c) => c.numeroCuenta.trim().length > 0);
}