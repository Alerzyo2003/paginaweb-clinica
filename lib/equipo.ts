/* ------------------------------------------------------------------ */
/*  Equipo de la clínica en un solo lugar                              */
/*  Lo usan /equipo, los bloques "Revisado por" de los tratamientos    */
/*  y los datos estructurados (schema Person) que lee Google.          */
/*                                                                     */
/*  Para que Google y los pacientes confíen en el sitio, completa      */
/*  registroSIS y universidad de cada profesional.                     */
/* ------------------------------------------------------------------ */

export type AreaId = 'cirugia' | 'ortodoncia' | 'endodoncia' | 'rehabilitacion' | 'general' | 'podologia';

export type Miembro = {
  nombre: string;
  rol: string;
  descripcion: string;
  area: AreaId;
  foto?: string;
  /**
   * N° de registro en la Superintendencia de Salud (Registro Nacional de Prestadores Individuales).
   * Cuando lo completes, se muestra en la tarjeta del profesional con un link para verificarlo.
   */
  registroSIS?: string;
  /** Universidad donde se tituló, por ejemplo 'Universidad de Chile'. */
  universidad?: string;
  /** Especialidad o postítulo y dónde lo hizo, por ejemplo 'Especialista en Endodoncia, U. de los Andes'. */
  especialidadFormacion?: string;
};

export const EQUIPO: Miembro[] = [
  {
    nombre: 'Dr. Ariel Zivov',
    rol: 'Cirujano traumatólogo bucomaxilofacial',
    descripcion: 'Resuelve cirugías complejas y traumatismos maxilofaciales con un protocolo seguro en cada etapa.',
    area: 'cirugia',
    foto: '/equipo/ariel-zivov.png',
  },
  {
    nombre: 'Dra. Nathalia Peñaloza',
    rol: 'Cirujana implantóloga bucomaxilofacial · TTM',
    descripcion: 'Implantes y trastornos de la articulación, para devolver función y estética a tu mordida.',
    area: 'cirugia',
    foto: '/equipo/nathalia-penaloza.png',
  },
  {
    nombre: 'Dr. Jaime Salazar',
    rol: 'Cirujano implantólogo bucomaxilofacial',
    descripcion: 'Rehabilita sonrisas con implantes, cuidando la salud del hueso y la encía que los sostiene.',
    area: 'cirugia',
    foto: '/equipo/jaime-salazar.png',
  },
  {
    nombre: 'Dr. Diego Torrijos',
    rol: 'Cirujano implantólogo bucomaxilofacial',
    descripcion: 'Combina planificación quirúrgica digital con un trato tranquilo, paso a paso.',
    area: 'cirugia',
    foto: '/equipo/diego-torrijos.png',
  },
  {
    nombre: 'Dra. Natalia Álvarez',
    rol: 'Endodoncista',
    descripcion: 'Me especializo en conservar tus dientes naturales con procedimientos minuciosos y un control absoluto del dolor desde el primer momento.',
    area: 'endodoncia',
    foto: '/equipo/natalia.png',
  },
  {
    nombre: 'Dr. Víctor Morgado',
    rol: 'Ortodoncista y odontopediatra',
    descripcion: 'Acompaña el crecimiento dental de niñas y niños, y corrige la mordida a tiempo.',
    area: 'ortodoncia',
    foto: '/equipo/victor-morgado.png',
  },
  {
    nombre: 'Dra. Valeska Moraga',
    rol: 'Ortodoncista',
    descripcion: 'Trabaja con brackets y alineadores discretos para ordenar la sonrisa a cualquier edad.',
    area: 'ortodoncia',
    foto: '/equipo/valeska-moraga.png',
  },
  {
    nombre: 'Dra. Antonia Urbina',
    rol: 'Endodoncista',
    descripcion: 'Salva piezas dentales con tratamientos precisos y control del dolor en cada sesión.',
    area: 'endodoncia',
    foto: '/equipo/antonia-urbina.png',
  },
  {
    nombre: 'Dr. Diego Provoste',
    rol: 'Rehabilitación oral',
    descripcion: 'Devuelve función y estética mediante prótesis y tratamientos integrales.',
    area: 'rehabilitacion',
    foto: '/equipo/diego-provoste.png',
  },
  {
    nombre: 'Dr. Pedro Chacón',
    rol: 'Rehabilitación adhesiva estética',
    descripcion: 'Restaura la forma natural del diente con técnicas mínimamente invasivas.',
    area: 'rehabilitacion',
    foto: '/equipo/pedro-chacon.png',
  },
  {
    nombre: 'Dr. Paulo Cerda',
    rol: 'Rehabilitación oral',
    descripcion: 'Planifica cada rehabilitación pensando en la mordida completa, no solo en una pieza.',
    area: 'rehabilitacion',
    foto: '/equipo/paulo-cerda.png',
  },
  {
    nombre: 'Dra. Moira Canales',
    rol: 'Cirujana dentista',
    descripcion: 'Diagnóstico, prevención y tratamiento general con un trato muy cercano.',
    area: 'general',
    foto: '/equipo/moira-canales.png',
  },
  {
    nombre: 'Dra. Tamara Gómez',
    rol: 'Cirujana dentista',
    descripcion: 'Enfocada en prevención: controles, higiene y detección temprana de caries.',
    area: 'general',
    foto: '/equipo/tamara-gomez.png',
  },
  {
    nombre: 'Dr. Patricio Yavar',
    rol: 'Cirujano dentista',
    descripcion: 'Atención integral, pensada para quienes llegan con miedo al dentista.',
    area: 'general',
    foto: '/equipo/patricio-yavar.png',
  },
  {
    nombre: 'Dr. Isaac Reyes',
    rol: 'Cirujano dentista',
    descripcion: 'Soluciones eficaces explicadas paso a paso, con seguimiento después del alta.',
    area: 'general',
    foto: '/equipo/isaac-reyes.png',
  },
  {
    nombre: 'Saira Marín',
    rol: 'Podóloga clínica',
    descripcion: 'Trata uñas, callosidades y afecciones del pie para que cada paso sea cómodo.',
    area: 'podologia',
    foto: '/equipo/saira-marin.png',
  },
];

/** Página oficial donde cualquiera puede verificar el registro de un profesional de la salud. */
export const VERIFICAR_REGISTRO_URL =
  'https://www.superdesalud.gob.cl/tramites/registro-nacional-de-prestadores-individuales-de-salud/';

export function buscarProfesional(nombre: string) {
  return EQUIPO.find((m) => m.nombre === nombre);
}
