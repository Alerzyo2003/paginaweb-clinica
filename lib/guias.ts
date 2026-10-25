/* ------------------------------------------------------------------ */
/*  Guía de cada tratamiento: lo que el paciente necesita saber         */
/*  antes de agendar (y lo que Google pide a una página de salud).     */
/*  Los precios salen de lib/precios.ts: no los escribas aquí.         */
/*  Lenguaje clínico: rangos habituales, nada de "100%" ni "siempre".  */
/* ------------------------------------------------------------------ */

import { pesos, precio } from '@/lib/precios';

export type Guia = {
  /** Nombre corto del tratamiento, para los títulos. */
  nombre: string;
  /** Respuesta directa de 40–60 palabras: qué es, cuánto dura y cuánto cuesta. */
  resumen: string;
  etapas: { titulo: string; texto: string }[];
  /** Duración, sesiones y precio, como pares etiqueta–valor. */
  datos: [string, string][];
  riesgos: string[];
  cuidados: string[];
  preguntas: { p: string; r: string }[];
  relacionados: { href: string; titulo: string }[];
};

const limpieza = pesos(precio('limpieza').desde);
const tapadura = pesos(precio('caries').desde);
const extraccion = pesos(precio('extraccion').desde);
const brackets = pesos(precio('brackets').desde);
const implante = pesos(precio('implante').desde);
const coronaImplante = pesos(precio('corona-implante').desde);
const muelaJuicio = pesos(precio('muela-juicio').desde);
const endo = pesos(precio('endodoncia').desde);
const endoPAD = pesos(precio('endodoncia').fonasaPAD ?? 0);
const endoPremolar = pesos(precio('endodoncia-premolar').desde);
const endoMolar = pesos(precio('endodoncia-molar').desde);
const endoMolarPAD = pesos(precio('endodoncia-molar').fonasaPAD ?? 0);
const controlOrto = '$27.000'; // Control De Evolución Ortodoncia Convencional (arancel)
const blanqueamiento = pesos(precio('blanqueamiento').desde);
const carillas = pesos(precio('carillas').desde);
const sellante = pesos(precio('sellante').desde);
const corona = pesos(precio('corona').desde);
const protesis = pesos(precio('protesis').desde);

export const GUIAS: Record<string, Guia> = {
  odontologia: {
    nombre: 'odontología general',
    resumen: `La odontología general cubre los controles, limpiezas, tapaduras y extracciones simples. En Clínica Dignidad la evaluación es gratis, la limpieza parte en ${limpieza} y las tapaduras en ${tapadura} por pieza. Lo habitual es un control cada 6 meses, o antes si aparece dolor, sangrado de encías o sensibilidad.`,
    etapas: [
      { titulo: 'Evaluación', texto: 'Revisamos dientes y encías, tomamos radiografías si hacen falta y te entregamos un presupuesto por escrito.' },
      { titulo: 'Limpieza (destartraje y pulido)', texto: 'Se retira el sarro y la placa que el cepillo no alcanza. Ayuda a prevenir caries y enfermedad de las encías.' },
      { titulo: 'Tapaduras', texto: 'Se elimina la caries y se rellena el diente con resina del mismo color. Si la caries es profunda se usa anestesia local.' },
      { titulo: 'Controles', texto: 'Revisiones periódicas para detectar problemas cuando todavía son pequeños y más simples de tratar.' },
    ],
    datos: [
      ['Evaluación', 'Gratis, unos 30 minutos'],
      ['Limpieza', `Desde ${limpieza} · 30 a 45 minutos`],
      ['Tapadura', `Desde ${tapadura} por pieza · 30 a 60 minutos`],
      ['Extracción simple', `Desde ${extraccion} por pieza`],
    ],
    riesgos: [
      'Sensibilidad al frío durante algunos días después de una limpieza o tapadura.',
      'Adormecimiento de labio o lengua por 2 a 3 horas si se usó anestesia.',
      'Si la caries llegó al nervio, puede ser necesario un tratamiento de conducto en vez de una tapadura.',
    ],
    cuidados: [
      'No comas hasta que pase el efecto de la anestesia, para no morderte.',
      'Cepíllate dos veces al día con pasta con flúor y usa hilo dental o cepillo interdental.',
      'Vuelve a control en el plazo que te indique tu dentista.',
    ],
    preguntas: [
      { p: '¿Cada cuánto debo hacerme una limpieza?', r: 'En la mayoría de las personas, cada 6 meses. Si tienes enfermedad de las encías, tu dentista puede indicarla con más frecuencia.' },
      { p: '¿Duele una tapadura?', r: 'Las caries pequeñas suelen tratarse sin molestias. En las más profundas se usa anestesia local y lo habitual es sentir solo presión.' },
    ],
    relacionados: [
      { href: '/especialidades/endodoncia', titulo: 'Tratamiento de conducto' },
      { href: '/especialidades/odontopediatria', titulo: 'Dentista para niños' },
      { href: '/calculo', titulo: 'Todos los precios' },
      { href: '/convenios', titulo: 'Convenios' },
    ],
  },

  ortodoncia: {
    nombre: 'ortodoncia',
    resumen: `La ortodoncia corrige la posición de los dientes y la mordida con brackets o alineadores transparentes. El tratamiento suele durar entre 12 y 24 meses, con controles cada 4 a 6 semanas, y termina con un retenedor. En Clínica Dignidad la instalación de brackets parte en ${brackets} y cada control en ${controlOrto}. La evaluación es gratis.`,
    etapas: [
      { titulo: 'Evaluación y estudio', texto: 'Radiografías, fotos y registros de la mordida para diagnosticar el problema y planificar el tratamiento.' },
      { titulo: 'Instalación', texto: 'Se pegan los brackets o se entregan los primeros alineadores. La instalación toma entre 1 y 2 horas.' },
      { titulo: 'Controles', texto: 'Cada 4 a 6 semanas se ajustan los arcos o se cambian alineadores para mover los dientes de forma gradual.' },
      { titulo: 'Retiro y contención', texto: 'Al terminar se usa un retenedor para que los dientes no vuelvan a moverse. Es tan importante como el tratamiento.' },
    ],
    datos: [
      ['Duración habitual', '12 a 24 meses, según el caso'],
      ['Instalación de brackets', `Desde ${brackets} (autoligado)`],
      ['Cada control', `Desde ${controlOrto}`],
      ['Edad', 'Niños desde los 7 años (evaluación) y adultos sin límite si las encías están sanas'],
    ],
    riesgos: [
      'Molestia o presión los primeros días después de la instalación y de cada control.',
      'Roces en mejillas y labios al comienzo; se alivian con cera de ortodoncia.',
      'Manchas blancas o caries alrededor de los brackets si la higiene no es buena.',
      'Los dientes pueden volver a moverse si no se usa el retenedor como se indica.',
    ],
    cuidados: [
      'Usa cepillo de ortodoncia y cepillo interdental después de cada comida.',
      'Evita alimentos duros o pegajosos que puedan despegar un bracket.',
      'Si usas alineadores, llévalos 20 a 22 horas al día y sácalos solo para comer y cepillarte.',
      'Asiste a todos los controles: saltarlos alarga el tratamiento.',
    ],
    preguntas: [
      { p: '¿Brackets o alineadores?', r: 'Depende del caso y de tu constancia. Los alineadores son discretos y removibles, pero solo funcionan si se usan casi todo el día. En la evaluación te decimos qué opciones sirven para ti.' },
      { p: '¿Duele la ortodoncia?', r: 'Se siente presión y algo de molestia por 2 a 4 días después de cada ajuste. Suele bastar con dieta blanda y el analgésico que indique tu ortodoncista.' },
    ],
    relacionados: [
      { href: '/especialidades/odontopediatria', titulo: 'Ortodoncia para niños' },
      { href: '/especialidades/estetica-dental', titulo: 'Estética dental' },
      { href: '/tienda', titulo: 'Cepillos de ortodoncia' },
      { href: '/calculo', titulo: 'Todos los precios' },
    ],
  },

  implantologia: {
    nombre: 'implantes dentales',
    resumen: `Un implante dental es un tornillo de titanio que reemplaza la raíz de un diente perdido y sostiene una corona fija. Entre la cirugía y la corona definitiva pasan habitualmente de 3 a 6 meses. En Clínica Dignidad la cirugía del implante parte en ${implante} y la corona sobre implante en ${coronaImplante}.`,
    etapas: [
      { titulo: 'Evaluación con imágenes', texto: 'Una radiografía o escáner muestra la cantidad de hueso disponible. Si falta, puede requerirse un injerto antes.' },
      { titulo: 'Cirugía', texto: 'Con anestesia local se coloca el implante en el hueso. Toma alrededor de una hora por implante.' },
      { titulo: 'Integración', texto: 'Durante 3 a 6 meses el hueso se une al implante. Mientras tanto puede usarse un diente provisorio.' },
      { titulo: 'Corona', texto: 'Se toma una impresión y se instala la corona definitiva, hecha a la medida de tu mordida.' },
    ],
    datos: [
      ['Cirugía de implante', `Desde ${implante} por pieza`],
      ['Corona sobre implante', `Desde ${coronaImplante} por pieza`],
      ['Tiempo total', '3 a 6 meses (más si se necesita injerto)'],
      ['Cirugía', 'Alrededor de 1 hora por implante, con anestesia local'],
      ['Muela del juicio', `Extracción desde ${muelaJuicio}`],
    ],
    riesgos: [
      'Hinchazón, molestia y algo de sangrado durante 2 a 5 días después de la cirugía.',
      'Infección de la zona, que se previene con higiene y las indicaciones del cirujano.',
      'En una minoría de casos el implante no se integra al hueso y debe reemplazarse. El riesgo es mayor en fumadores y en diabetes no controlada.',
      'Inflamación alrededor del implante (periimplantitis) si no se limpia bien con los años.',
    ],
    cuidados: [
      'Frío por fuera de la cara las primeras 24 horas y dieta blanda unos días.',
      'No fumar, sobre todo durante la cicatrización.',
      'Limpiar el implante como un diente más, con cepillo e interdental.',
      'Control anual para revisar el implante y la encía.',
    ],
    preguntas: [
      { p: '¿Cualquier persona puede ponerse un implante?', r: 'Se necesita hueso suficiente y encías sanas. Algunas condiciones, como diabetes no controlada, tabaquismo o ciertos medicamentos para los huesos, aumentan el riesgo y se evalúan caso a caso.' },
      { p: '¿Cuánto dura un implante?', r: 'Con buena higiene y controles, un implante puede durar muchos años. Como un diente natural, necesita mantención.' },
    ],
    relacionados: [
      { href: '/especialidades/rehabilitacion-oral', titulo: 'Coronas y prótesis' },
      { href: '/equipo', titulo: 'Cirujanos del equipo' },
      { href: '/calculo', titulo: 'Todos los precios' },
      { href: '/convenios', titulo: 'Convenios' },
    ],
  },

  endodoncia: {
    nombre: 'endodoncia',
    resumen: `La endodoncia o tratamiento de conducto limpia y sella el interior de un diente con el nervio inflamado o infectado, para conservarlo en vez de extraerlo. Se hace con anestesia local en 1 a 3 sesiones. En Clínica Dignidad parte en ${endo} en dientes anteriores y ${endoMolar} en molares, o desde ${endoPAD} con Bono PAD Fonasa si cumples los requisitos.`,
    etapas: [
      { titulo: 'Diagnóstico', texto: 'Con radiografías y pruebas de sensibilidad confirmamos si el nervio está dañado y cuántos conductos tiene el diente.' },
      { titulo: 'Limpieza de los conductos', texto: 'Con anestesia local y el diente aislado, se retira el tejido dañado y se desinfectan los conductos.' },
      { titulo: 'Sellado', texto: 'Los conductos se rellenan y sellan para que no vuelvan a entrar bacterias.' },
      { titulo: 'Restauración', texto: 'El diente se reconstruye con resina o, en muelas, muchas veces con una corona, para que no se fracture.' },
    ],
    datos: [
      ['Particular', `Anterior desde ${endo} · premolar desde ${endoPremolar} · molar desde ${endoMolar}`],
      ['Con Bono PAD Fonasa', `Desde ${endoPAD} hasta ${endoMolarPAD} (12 a 34 años, tramos B, C y D)`],
      ['Sesiones', '1 a 3, de 60 a 90 minutos cada una'],
      ['Anestesia', 'Local'],
    ],
    riesgos: [
      'Molestia al morder durante algunos días después del tratamiento.',
      'En algunos casos la infección persiste y se necesita repetir el tratamiento (retratamiento) o una pequeña cirugía.',
      'Un diente tratado se vuelve más frágil: si no se restaura a tiempo puede fracturarse.',
    ],
    cuidados: [
      'Evita masticar por ese lado hasta tener la restauración definitiva.',
      'Toma solo el analgésico que te indique el dentista.',
      'No dejes pasar la restauración final: es la que protege el tratamiento.',
    ],
    preguntas: [
      { p: '¿No es mejor sacar el diente?', r: 'Conservar el diente suele ser preferible: una extracción deja un espacio que después requiere implante, puente o prótesis para no afectar la mordida.' },
      { p: '¿Cómo sé si necesito un tratamiento de conducto?', r: 'Las señales habituales son dolor espontáneo o de noche, dolor que dura después del frío o el calor, dolor al morder o hinchazón. A veces no hay síntomas y se detecta en una radiografía.' },
    ],
    relacionados: [
      { href: '/fonasa', titulo: 'Bono PAD Fonasa' },
      { href: '/urgencia-dental', titulo: 'Urgencia dental' },
      { href: '/especialidades/rehabilitacion-oral', titulo: 'Coronas' },
      { href: '/calculo', titulo: 'Todos los precios' },
    ],
  },

  'estetica-dental': {
    nombre: 'estética dental',
    resumen: `La estética dental mejora el color, la forma y la proporción de los dientes con blanqueamiento, carillas de resina o cerámica y contorneado. Antes se revisa que dientes y encías estén sanos. En Clínica Dignidad el blanqueamiento parte en ${blanqueamiento} por sesión y las carillas de resina en ${carillas} por pieza. La evaluación es gratis.`,
    etapas: [
      { titulo: 'Evaluación y limpieza', texto: 'Se tratan caries o problemas de encías antes de cualquier tratamiento estético, y se registra el color inicial.' },
      { titulo: 'Diseño', texto: 'Definimos contigo el color y la forma que buscas, de acuerdo con tu rostro y tu sonrisa.' },
      { titulo: 'Tratamiento', texto: 'Blanqueamiento en la clínica o con cubetas en casa, o carillas de resina (en una sesión) o cerámica (en varias).' },
      { titulo: 'Control', texto: 'Revisamos el resultado, la sensibilidad y te indicamos cómo mantenerlo.' },
    ],
    datos: [
      ['Blanqueamiento', `Desde ${blanqueamiento} por sesión`],
      ['Carillas', `Resina desde ${carillas} · cerámica (indirectas) desde $140.000, por pieza`],
      ['Carillas de resina', 'Habitualmente en 1 sesión'],
      ['Duración del blanqueamiento', '1 a 3 años, según hábitos como café o cigarro'],
    ],
    riesgos: [
      'Sensibilidad dental temporal durante algunos días después del blanqueamiento.',
      'El blanqueamiento no aclara tapaduras, coronas ni carillas existentes.',
      'Las carillas pueden despegarse o quebrarse con golpes o al morder objetos duros.',
      'Las carillas de cerámica requieren desgastar algo de esmalte, lo que no se puede revertir.',
      'El blanqueamiento no se recomienda durante el embarazo ni la lactancia.',
    ],
    cuidados: [
      'Evita café, té, vino y alimentos con colorante las 48 horas siguientes al blanqueamiento.',
      'No muerdas lápices, uñas ni envases con las carillas.',
      'Mantén tus controles y limpiezas para cuidar el resultado.',
    ],
    preguntas: [
      { p: '¿El blanqueamiento daña el esmalte?', r: 'Hecho o supervisado por un dentista, con las concentraciones adecuadas, es un tratamiento seguro. El efecto más común es sensibilidad pasajera.' },
      { p: '¿Carillas de resina o de cerámica?', r: 'La resina es más económica, se hace en una sesión y se puede reparar. La cerámica mantiene mejor el color y dura más, pero requiere más sesiones y desgaste.' },
    ],
    relacionados: [
      { href: '/especialidades/ortodoncia', titulo: 'Ortodoncia' },
      { href: '/especialidades/rehabilitacion-oral', titulo: 'Rehabilitación oral' },
      { href: '/calculo', titulo: 'Todos los precios' },
      { href: '/tienda', titulo: 'Productos de higiene' },
    ],
  },

  odontopediatria: {
    nombre: 'odontopediatría',
    resumen: `La odontopediatría es la atención dental de niñas y niños, desde los primeros dientes hasta la adolescencia. La primera visita se recomienda al aparecer el primer diente o antes del año de vida, con controles cada 6 meses. Incluye prevención con flúor y sellantes (desde ${sellante} por pieza), tapaduras y orientación para la familia.`,
    etapas: [
      { titulo: 'Adaptación', texto: 'Mostramos y explicamos cada instrumento antes de usarlo, para que la visita sea tranquila.' },
      { titulo: 'Examen', texto: 'Revisamos dientes, encías y mordida, y evaluamos el riesgo de caries según los hábitos del niño.' },
      { titulo: 'Prevención', texto: 'Flúor en barniz y sellantes en las muelas definitivas, que suelen salir cerca de los 6 y los 12 años.' },
      { titulo: 'Tratamiento y controles', texto: 'Si hay caries se tratan a tiempo, y se agenda el próximo control.' },
    ],
    datos: [
      ['Primera visita', 'Con el primer diente o antes del año'],
      ['Controles', 'Cada 6 meses, o según el riesgo de caries'],
      ['Sellante', `Desde ${sellante} por pieza`],
      ['Evaluación', 'Gratis'],
    ],
    riesgos: [
      'Una caries en un diente de leche puede infectarse, causar dolor y afectar al diente definitivo que viene debajo.',
      'Perder un diente de leche antes de tiempo puede quitar espacio y desordenar los dientes definitivos.',
      'Algunos niños necesitan más de una visita de adaptación antes de un tratamiento.',
    ],
    cuidados: [
      'Cepilla sus dientes desde que aparece el primero, con pasta con flúor: del tamaño de un grano de arroz hasta los 3 años y de una arveja desde los 3.',
      'Supervisa o termina tú el cepillado hasta los 7 u 8 años.',
      'Evita que se duerma con mamadera con leche azucarada, jugo o bebida.',
      'Prefiere agua entre comidas y deja los dulces para después de almuerzo.',
    ],
    preguntas: [
      { p: '¿Vale la pena tratar los dientes de leche?', r: 'Sí. Permiten comer y hablar bien, guardan el espacio para los definitivos y una infección en ellos puede dañar el diente que viene.' },
      { p: '¿Qué hago si mi hijo tiene miedo?', r: 'Cuéntanos antes de la cita. Trabajamos con adaptación gradual y evitamos usar el dentista como castigo o amenaza en casa.' },
    ],
    relacionados: [
      { href: '/especialidades/ortodoncia', titulo: 'Ortodoncia' },
      { href: '/especialidades/odontologia', titulo: 'Odontología general' },
      { href: '/tienda', titulo: 'Cepillos y pastas para niños' },
      { href: '/urgencia-dental', titulo: 'Golpes y urgencias' },
    ],
  },

  'rehabilitacion-oral': {
    nombre: 'rehabilitación oral',
    resumen: `La rehabilitación oral recupera dientes dañados o perdidos con coronas, puentes y prótesis removibles o sobre implantes, para volver a masticar y hablar con comodidad. En Clínica Dignidad las coronas parten en ${corona} por pieza y las prótesis removibles en ${protesis}. El plan y su valor final se definen en la evaluación gratuita.`,
    etapas: [
      { titulo: 'Evaluación', texto: 'Revisamos los dientes que quedan, las encías y la mordida, con radiografías, para elegir la mejor opción.' },
      { titulo: 'Tratamientos previos', texto: 'Si hace falta, primero se tratan caries, conductos o encías para que la base esté sana.' },
      { titulo: 'Impresiones y pruebas', texto: 'Se toman medidas de tu boca y se prueba la corona o prótesis antes de terminarla.' },
      { titulo: 'Instalación y ajustes', texto: 'Se instala y se ajusta la mordida. Las prótesis removibles suelen necesitar uno o dos ajustes más.' },
    ],
    datos: [
      ['Corona', `Desde ${corona} por pieza · 2 a 3 sesiones`],
      ['Prótesis removible', `Desde ${protesis} (1 a 3 piezas) · 3 a 5 sesiones`],
      ['Opciones', 'Coronas, puentes, prótesis removibles y sobre implantes'],
      ['Evaluación', 'Gratis'],
    ],
    riesgos: [
      'Período de adaptación de algunas semanas para hablar y comer con una prótesis nueva.',
      'Puntos de roce o molestias en la encía, que se resuelven con ajustes.',
      'Sensibilidad en dientes preparados para una corona.',
      'Con los años el hueso cambia y las prótesis removibles necesitan rebasado o recambio.',
    ],
    cuidados: [
      'Limpia la prótesis todos los días fuera de la boca, con cepillo y jabón neutro o el producto indicado.',
      'Sácala para dormir, salvo que tu dentista te indique lo contrario.',
      'Limpia las coronas y puentes como dientes naturales, incluido bajo el puente.',
      'Control al menos una vez al año.',
    ],
    preguntas: [
      { p: '¿Corona o sacar el diente y poner un implante?', r: 'Si queda suficiente diente sano, una corona suele ser la opción más simple. Si el diente no se puede recuperar, se evalúa un implante, un puente o una prótesis.' },
      { p: '¿Cuánto me demoro en acostumbrarme a una prótesis?', r: 'La mayoría de las personas se adapta en 2 a 4 semanas. Los ajustes en los primeros controles ayudan a que sea más cómoda.' },
    ],
    relacionados: [
      { href: '/especialidades/implantologia', titulo: 'Implantes dentales' },
      { href: '/especialidades/endodoncia', titulo: 'Tratamiento de conducto' },
      { href: '/tienda', titulo: 'Productos para prótesis' },
      { href: '/calculo', titulo: 'Todos los precios' },
    ],
  },
};
