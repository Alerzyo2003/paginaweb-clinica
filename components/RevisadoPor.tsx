import { ShieldCheck } from 'lucide-react';
import { buscarProfesional, VERIFICAR_REGISTRO_URL } from '@/lib/equipo';
import { REVISIONES } from '@/lib/revisiones';

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/** '2026-11-03' → '3 de noviembre de 2026' (sin depender del idioma del navegador). */
function fechaLarga(iso: string) {
  const [a, m, d] = iso.split('-').map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}

/**
 * Bloque "Contenido revisado por…" al final de una página de tratamiento.
 * Se configura en lib/revisiones.ts; si la página no tiene revisor, no muestra nada.
 */
export default function RevisadoPor({ ruta }: { ruta: string }) {
  const revision = REVISIONES[ruta];
  if (!revision) return null;

  const profesional = buscarProfesional(revision.revisor);
  if (!profesional) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[RevisadoPor] "${revision.revisor}" no está en lib/equipo.ts (revisa el nombre).`);
    }
    return null;
  }

  return (
    <aside aria-label="Revisión clínica" className="bg-white px-4 pb-12 md:px-8">
      <div className="mx-auto flex max-w-[1000px] items-start gap-3 rounded-2xl border border-slate-200 bg-[#F6F9FD] px-5 py-4 text-[14px] leading-relaxed text-slate-600">
        <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#0A9BB8]" aria-hidden="true" />
        <p>
          Contenido revisado por <strong className="text-[#071B3A]">{profesional.nombre}</strong>, {profesional.rol}
          {profesional.registroSIS && (
            <>
              {' '}
              (Registro Superintendencia de Salud N°{' '}
              <a
                href={VERIFICAR_REGISTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#0A9BB8] underline-offset-2 hover:underline"
              >
                {profesional.registroSIS}
              </a>
              )
            </>
          )}
          . Última revisión: <time dateTime={revision.fecha}>{fechaLarga(revision.fecha)}</time>. Esta información es
          orientativa y no reemplaza la evaluación en la clínica.
        </p>
      </div>
    </aside>
  );
}
