/* ------------------------------------------------------------------ */
/*  Quién revisó el contenido clínico de cada página                   */
/*                                                                     */
/*  Google pide que las páginas de salud digan quién las revisó y      */
/*  cuándo. Para activarlo en una página, completa su línea:           */
/*    revisor: el nombre EXACTO como aparece en lib/equipo.ts          */
/*    fecha:   'AAAA-MM-DD' del día en que lo revisó                   */
/*  Mientras una página no tenga revisor, el bloque no se muestra.     */
/* ------------------------------------------------------------------ */

export type Revision = { revisor: string; fecha: string };

export const REVISIONES: Record<string, Revision | null> = {
  '/especialidades/odontologia': null, //      ej: { revisor: 'Dra. Moira Canales', fecha: '2026-11-03' }
  '/especialidades/ortodoncia': null,
  '/especialidades/implantologia': null,
  '/especialidades/endodoncia': null,
  '/especialidades/estetica-dental': null,
  '/especialidades/odontopediatria': null,
  '/especialidades/rehabilitacion-oral': null,
  '/fonasa': null,
  '/urgencia-dental': null,
};
