/* ------------------------------------------------------------------ */
/*  Días en que el cliente puede venir a retirar su pedido.             */
/*  Las fechas se manejan como texto "AAAA-MM-DD" en hora de Chile.     */
/* ------------------------------------------------------------------ */

import { TIENDA } from './config';

const ZONA = 'America/Santiago';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_CORTOS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

export type DiaRetiro = {
  iso: string;
  /** "Hoy", "Mañana" o "lun" */
  arriba: string;
  /** "19 oct" */
  abajo: string;
};

/** Fecha y minutos del día ahora en Chile. */
function ahoraEnChile(ahora: Date) {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(ahora);
  const p = (t: string) => partes.find((x) => x.type === t)?.value ?? '00';
  return { iso: `${p('year')}-${p('month')}-${p('day')}`, minutos: Number(p('hour')) * 60 + Number(p('minute')) };
}

function aFecha(iso: string) {
  return new Date(`${iso}T12:00:00Z`);
}

function sumarDias(iso: string, n: number) {
  const d = aFecha(iso);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** 0 = domingo … 6 = sábado */
function diaSemana(iso: string) {
  return aFecha(iso).getUTCDay();
}

function minutos(hora: string) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + (m || 0);
}

export function hoyEnChile(ahora = new Date()) {
  return ahoraEnChile(ahora).iso;
}

/** Hora de cierre de ese día ("19:30"), o null si la clínica no abre. */
export function cierreDelDia(iso: string): string | null {
  const dia = diaSemana(iso);
  if (dia === 0 || (TIENDA.retiro.diasCerrados as readonly string[]).includes(iso)) return null;
  return dia === 6 ? TIENDA.retiro.cierraSabado : TIENDA.retiro.cierraSemana;
}

/** "de 8:30 a 19:30" */
export function horarioDelDia(iso: string) {
  const cierre = cierreDelDia(iso);
  return cierre ? `de ${TIENDA.retiro.abre} a ${cierre}` : '';
}

/** Próximos días con atención. Hoy aparece solo si queda tiempo para preparar el pedido. */
export function diasDeRetiro(ahora = new Date()): DiaRetiro[] {
  const { iso: hoy, minutos: ahoraMin } = ahoraEnChile(ahora);
  const dias: DiaRetiro[] = [];
  for (let i = 0; dias.length < TIENDA.retiro.diasParaElegir && i < 60; i++) {
    const iso = sumarDias(hoy, i);
    const cierre = cierreDelDia(iso);
    if (!cierre) continue;
    if (i === 0 && ahoraMin > minutos(cierre) - TIENDA.retiro.minutosParaPreparar) continue;
    const d = aFecha(iso);
    dias.push({
      iso,
      arriba: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : DIAS_CORTOS[d.getUTCDay()],
      abajo: `${d.getUTCDate()} ${MESES[d.getUTCMonth()].slice(0, 3)}`,
    });
  }
  return dias;
}

/** "sábado 17 de octubre" */
export function fechaLarga(iso: string) {
  const d = aFecha(iso);
  return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()} de ${MESES[d.getUTCMonth()]}`;
}

/** "sáb 17 oct", o "hoy" / "mañana" */
export function fechaCorta(iso: string, ahora = new Date()) {
  const hoy = hoyEnChile(ahora);
  if (iso === hoy) return 'hoy';
  if (iso === sumarDias(hoy, 1)) return 'mañana';
  const d = aFecha(iso);
  return `${DIAS_CORTOS[d.getUTCDay()]} ${d.getUTCDate()} ${MESES[d.getUTCMonth()].slice(0, 3)}`;
}
