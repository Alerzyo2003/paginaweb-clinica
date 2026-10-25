import Link from 'next/link';
import { AlertCircle, ArrowRight, CheckCircle2, Clock, HeartHandshake } from 'lucide-react';
import { GUIAS } from '@/lib/guias';

const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/**
 * Guía completa de un tratamiento: respuesta directa, etapas, duración y precio,
 * riesgos, cuidados, preguntas frecuentes y páginas relacionadas.
 * El contenido vive en lib/guias.ts.
 */
export default function GuiaTratamiento({ id, color = '#0A9BB8' }: { id: keyof typeof GUIAS; color?: string }) {
  const g = GUIAS[id];
  const titulo = g.nombre.charAt(0).toUpperCase() + g.nombre.slice(1);

  return (
    <section aria-labelledby={`guia-${id}`} className="bg-white px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1000px]">
        <h2 id={`guia-${id}`} className="text-3xl font-black tracking-tight text-[#071B3A] md:text-4xl">
          {titulo}: lo esencial
        </h2>
        <p
          className="mt-6 rounded-[1.5rem] border-l-4 bg-[#F6F9FD] px-6 py-5 text-[17px] font-medium leading-relaxed text-slate-700 md:text-lg"
          style={{ borderColor: color }}
        >
          {g.resumen}
        </p>

        <h3 className="mt-14 text-2xl font-black text-[#071B3A]">Cómo es el tratamiento</h3>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {g.etapas.map((e, i) => (
            <li key={e.titulo} className="flex gap-4 rounded-[1.25rem] border border-slate-100 p-5 shadow-sm">
              <span
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[15px] font-black text-white"
                style={{ backgroundColor: color }}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-extrabold text-[#071B3A]">{e.titulo}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 flex items-center gap-2 text-2xl font-black text-[#071B3A]">
          <Clock className="h-6 w-6" style={{ color }} aria-hidden="true" />
          Duración y precio
        </h3>
        <dl className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-[1.25rem] border border-slate-200">
          {g.datos.map(([k, v]) => (
            <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
              <dt className="font-bold text-slate-500">{k}</dt>
              <dd className="font-bold text-[#071B3A]">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-[14px] text-slate-500">
          Valores de referencia. El presupuesto exacto se entrega en la evaluación, que es gratis.{' '}
          <Link href="/calculo" className={`font-bold text-[#0A9BB8] hover:underline ${focusLight}`}>
            Ver todos los precios
          </Link>
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.5rem] bg-[#FFF8EB] p-6 md:p-7">
            <h3 className="flex items-center gap-2 text-xl font-black text-[#071B3A]">
              <AlertCircle className="h-6 w-6 text-[#D9930B]" aria-hidden="true" />
              Molestias y riesgos posibles
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-slate-700">
              {g.riesgos.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#D9930B]" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] bg-[#F1F8E6] p-6 md:p-7">
            <h3 className="flex items-center gap-2 text-xl font-black text-[#071B3A]">
              <HeartHandshake className="h-6 w-6 text-[#6B9A2A]" aria-hidden="true" />
              Cuidados después
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-slate-700">
              {g.cuidados.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#6B9A2A]" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-14 text-2xl font-black text-[#071B3A]">Preguntas frecuentes</h3>
        <div className="mt-6 space-y-5">
          {g.preguntas.map((q) => (
            <div key={q.p}>
              <h4 className="text-[17px] font-extrabold text-[#071B3A]">{q.p}</h4>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-slate-600">{q.r}</p>
            </div>
          ))}
        </div>

        <nav aria-label="Páginas relacionadas" className="mt-14">
          <p className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-400">Sigue leyendo</p>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {g.relacionados.map((r) => (
              <li key={r.href}>
                <Link
                  href={r.href}
                  className={`group inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-[14.5px] font-bold text-[#071B3A] transition-colors hover:border-[#0A9BB8] hover:text-[#0A9BB8] ${focusLight}`}
                >
                  {r.titulo}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
