import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, Home, MessageCircle, Smile, Stethoscope } from 'lucide-react';
import { dancing, nunito } from '@/lib/fuentes';
import { AGENDA_HREF, CLINICA } from '@/lib/clinica';

// Página que se muestra cuando alguien entra a una dirección que no existe.
export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: true },
};

const ATAJOS = [
  { href: '/especialidades', titulo: 'Especialidades', detalle: 'Ortodoncia, implantes, conductos y más', icon: Stethoscope },
  { href: '/equipo', titulo: 'Nuestro equipo', detalle: 'Conoce a los especialistas', icon: Smile },
  { href: '/calculo', titulo: 'Calculadora', detalle: 'Estima el valor de tu tratamiento', icon: CalendarCheck },
];

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';

export default function NoEncontrada() {
  return (
    <section className={`${nunito.className} relative isolate overflow-hidden bg-[#071B3A] text-white`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B01C48]/20 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center md:py-28">
        <p className="text-[96px] font-black leading-none tracking-tight text-[#FDB92B] md:text-[140px]">404</p>

        <h1 className="mt-4 text-3xl font-black leading-tight md:text-5xl">No encontramos esta página</h1>
        <p className="mt-4 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
          Puede que el enlace esté mal escrito o que la página ya no exista. Tu sonrisa sí te la podemos cuidar:
          vuelve al inicio o agenda tu evaluación gratis.
        </p>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <a
            href={AGENDA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex w-full items-center justify-center gap-2 rounded-full bg-[#FDB92B] px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] sm:w-auto ${focusDark}`}
          >
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Agendar evaluación gratis
          </a>
          <Link
            href="/"
            className={`flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto ${focusDark}`}
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>

        <ul className="mt-14 grid w-full gap-3 text-left sm:grid-cols-3">
          {ATAJOS.map(({ href, titulo, detalle, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`group flex h-full items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition-colors hover:bg-white/[0.1] ${focusDark}`}
              >
                <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22B3CF]" aria-hidden="true" />
                <span>
                  <span className="flex items-center gap-1 font-extrabold">
                    {titulo}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                  <span className="mt-0.5 block text-[13px] text-slate-400">{detalle}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap items-center justify-center gap-x-2 text-[15px] text-slate-300">
          ¿Tienes una urgencia?
          <a
            href={CLINICA.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded font-bold text-[#FDB92B] hover:underline ${focusDark}`}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Escríbenos al {CLINICA.telefonoVisible}
          </a>
        </p>

        <p className={`${dancing.className} mt-10 text-3xl text-[#22B3CF]`}>{CLINICA.eslogan}</p>
      </div>
    </section>
  );
}
