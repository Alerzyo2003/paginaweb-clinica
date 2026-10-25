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
  /** Copago con Bono PAD Fonasa (si aplica). */
  fonasaPAD?: number;
  /** Página de la especialidad relacionada. */
  ruta?: string;
};

export const PRECIOS: Precio[] = [
  { id: 'evaluacion', nombre: 'Evaluación', desde: 0, porPieza: false },
  { id: 'limpieza', nombre: 'Limpieza', desde: 19990, porPieza: false, ruta: '/especialidades/odontologia' },
  { id: 'caries', nombre: 'Tapaduras (caries)', desde: 28000, porPieza: true, ruta: '/especialidades/odontologia' },
  { id: 'endodoncia', nombre: 'Tratamiento de conducto', desde: 102000, porPieza: true, fonasaPAD: 80050, ruta: '/especialidades/endodoncia' },
  { id: 'extraccion', nombre: 'Extracción', desde: 40000, porPieza: true, ruta: '/especialidades/odontologia' },
  { id: 'corona', nombre: 'Corona dental', desde: 55000, porPieza: true, ruta: '/especialidades/rehabilitacion-oral' },
  { id: 'implante', nombre: 'Implante', desde: 139990, porPieza: true, ruta: '/especialidades/implantologia' },
  { id: 'protesis', nombre: 'Prótesis', desde: 56650, porPieza: false, ruta: '/especialidades/rehabilitacion-oral' },
  { id: 'brackets', nombre: 'Brackets', desde: 145000, porPieza: false, ruta: '/especialidades/ortodoncia' },
  { id: 'blanqueamiento', nombre: 'Blanqueamiento', desde: 53000, porPieza: false, ruta: '/especialidades/estetica-dental' },
  { id: 'carillas', nombre: 'Carillas', desde: 67000, porPieza: true, ruta: '/especialidades/estetica-dental' },
  { id: 'sellante', nombre: 'Flúor / sellante', desde: 13000, porPieza: false, ruta: '/especialidades/odontopediatria' },
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
