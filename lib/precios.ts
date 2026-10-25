/* ------------------------------------------------------------------ */
/*  Precios de referencia de la clínica en un solo lugar               */
/*  Los usan la calculadora (/calculo), la tabla de precios y las      */
/*  páginas de cada especialidad. Si cambia un precio, se cambia aquí. */
/*  Son valores "desde": el precio final se confirma en la evaluación. */
/* ------------------------------------------------------------------ */

export type Precio = {
  id: string;
  nombre: string;
  /** Precio particular desde, en pesos chilenos. 0 = gratis. */
  desde: number;
  /** true si el precio es por cada diente. */
  porPieza: boolean;
  /** Aclaración corta que se muestra junto al precio (ej. "por sesión"). */
  nota?: string;
  /** Copago con Bono PAD Fonasa (si aplica). */
  fonasaPAD?: number;
  /** Página de la especialidad relacionada. */
  ruta?: string;
};

/*
 * Fuente: arancel base de la clínica (tabla "prestaciones", prestaciones habilitadas),
 * octubre de 2026. Se usan precios particulares normales: ni promociones ni convenios.
 * Entre paréntesis, el nombre de la prestación en el arancel.
 */
export const PRECIOS: Precio[] = [
  { id: 'evaluacion', nombre: 'Evaluación', desde: 0, porPieza: false },
  // (Limpieza + Destartraje + Profilaxis)
  { id: 'limpieza', nombre: 'Limpieza (destartraje y profilaxis)', desde: 38000, porPieza: false, ruta: '/especialidades/odontologia' },
  // (Resina Simple)
  { id: 'caries', nombre: 'Tapadura de resina', desde: 35000, porPieza: true, ruta: '/especialidades/odontologia' },
  // (Tratamiento Endodoncia Anterior / Unirradicular (Particular)) — PAD: copago Fonasa
  { id: 'endodoncia', nombre: 'Tratamiento de conducto anterior', desde: 102000, porPieza: true, fonasaPAD: 80050, ruta: '/especialidades/endodoncia' },
  // (Tratamiento Endodoncia Premolar / Birradicular (Particular))
  { id: 'endodoncia-premolar', nombre: 'Tratamiento de conducto premolar', desde: 138000, porPieza: true, fonasaPAD: 100370, ruta: '/especialidades/endodoncia' },
  // (Tratamiento Endodoncia Molar / Multiradicular (Particular))
  { id: 'endodoncia-molar', nombre: 'Tratamiento de conducto molar', desde: 168000, porPieza: true, fonasaPAD: 110520, ruta: '/especialidades/endodoncia' },
  // (Exodoncia Uniradiculares)
  { id: 'extraccion', nombre: 'Extracción', desde: 48000, porPieza: true, ruta: '/especialidades/odontologia' },
  // (Exodoncia 3er Molar Simple)
  { id: 'muela-juicio', nombre: 'Extracción de muela del juicio', desde: 105000, porPieza: true, ruta: '/especialidades/implantologia' },
  // (Corona de Cerómero Muñón Vital)
  { id: 'corona', nombre: 'Corona', desde: 157500, porPieza: true, nota: 'libre de metal desde $172.000', ruta: '/especialidades/rehabilitacion-oral' },
  // (Cirugia Implante Unitario de Titanio Convencional)
  { id: 'implante', nombre: 'Cirugía de implante', desde: 200000, porPieza: true, ruta: '/especialidades/implantologia' },
  // (Rehabilitacion sobre 1 implante convencional)
  { id: 'corona-implante', nombre: 'Corona sobre implante', desde: 200000, porPieza: true, ruta: '/especialidades/implantologia' },
  // (PROTESIS TIPO cucharita 1-3 PIEZAS; total o parcial de acrílico: 160.000)
  { id: 'protesis', nombre: 'Prótesis removible', desde: 120000, porPieza: false, nota: '1 a 3 piezas; total o parcial desde $160.000', ruta: '/especialidades/rehabilitacion-oral' },
  // (Instalación de Brackets Auto ligado; Control De Evolución Ortodoncia Convencional: 27.000)
  { id: 'brackets', nombre: 'Instalación de brackets', desde: 145000, porPieza: false, nota: 'controles desde $27.000', ruta: '/especialidades/ortodoncia' },
  // (Blanqueamiento 1era sesión)
  { id: 'blanqueamiento', nombre: 'Blanqueamiento', desde: 69990, porPieza: false, nota: 'por sesión', ruta: '/especialidades/estetica-dental' },
  // (Carillas Directas; Carillas Indirectas: 140.000)
  { id: 'carillas', nombre: 'Carillas de resina', desde: 85000, porPieza: true, nota: 'indirectas desde $140.000', ruta: '/especialidades/estetica-dental' },
  // (Sellante en Pieza permanente o temporal)
  { id: 'sellante', nombre: 'Sellante', desde: 17000, porPieza: true, ruta: '/especialidades/odontopediatria' },
  // (rx Panorámica)
  { id: 'panoramica', nombre: 'Radiografía panorámica', desde: 47000, porPieza: false },
];

export function precio(id: string) {
  const p = PRECIOS.find((x) => x.id === id);
  if (!p) throw new Error(`Precio "${id}" no existe en lib/precios.ts`);
  return p;
}

/** 19990 → "$19.990" (formato fijo: igual en servidor y navegador). */
export function pesos(n: number) {
  return `$${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}
