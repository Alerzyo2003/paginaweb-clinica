/* ------------------------------------------------------------------ */
/*  Días en que el cliente puede venir a retirar su pedido.             */
/*  Las fechas se manejan como texto "AAAA-MM-DD" en hora de Chile.     */
/* ------------------------------------------------------------------ */

import { TIENDA } from './config';

const ZONA = 'America/Santiago';

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const DIAS_CORTOS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

/** Un casillero del calendario de retiro (lunes a sábado). */
export type CeldaRetiro = {
  iso: string;
  numero: number;
  /** "oct" en el primer casillero y cuando cambia el mes. */
  mes: string | null;
  disponible: boolean;
  esHoy: boolean;
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

function disponible(iso: string, hoy: string, ahoraMin: number) {
  const cierre = cierreDelDia(iso);
  if (!cierre || iso < hoy) return false;
  if (iso === hoy) {
    return TIENDA.retiro.permitirHoy && ahoraMin <= minutos(cierre) - TIENDA.retiro.minutosParaPreparar;
  }
  return true;
}

/**
 * Semanas de lunes a sábado para el calendario de retiro. Parte en la semana
 * del primer día disponible y agrega semanas hasta tener suficientes días.
 */
export function semanasDeRetiro(ahora = new Date()): CeldaRetiro[][] {
  const { iso: hoy, minutos: ahoraMin } = ahoraEnChile(ahora);

  let primero = hoy;
  for (let i = 0; i < 30 && !disponible(primero, hoy, ahoraMin); i++) primero = sumarDias(primero, 1);

  const dia = diaSemana(primero); // 0 = domingo
  let lunes = sumarDias(primero, dia === 0 ? 1 : 1 - dia);

  const semanas: CeldaRetiro[][] = [];
  let disponibles = 0;
  let mesAnterior = -1;
  while ((disponibles < TIENDA.retiro.diasParaElegir || semanas.length < 2) && semanas.length < 6) {
    const semana: CeldaRetiro[] = [];
    for (let i = 0; i < 6; i++) {
      const iso = sumarDias(lunes, i);
      const d = aFecha(iso);
      const libre = disponible(iso, hoy, ahoraMin);
      if (libre) disponibles++;
      const mesDeEste = d.getUTCMonth();
      semana.push({
        iso,
        numero: d.getUTCDate(),
        // El mes se muestra en el primer casillero y cuando cambia.
        mes: d.getUTCMonth() !== mesAnterior ? MESES[d.getUTCMonth()].slice(0, 3) : null,
        disponible: libre,
        esHoy: iso === hoy,
      });
      mesAnterior = mesDeEste;
    }
    semanas.push(semana);
    lunes = sumarDias(lunes, 7);
  }
  return semanas;
}

/** "octubre" o "octubre – noviembre" */
export function mesesDe(semanas: CeldaRetiro[][]) {
  const primero = aFecha(semanas[0][0].iso).getUTCMonth();
  const ultimo = aFecha(semanas.at(-1)!.at(-1)!.iso).getUTCMonth();
  return primero === ultimo ? MESES[primero] : `${MESES[primero]} – ${MESES[ultimo]}`;
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
