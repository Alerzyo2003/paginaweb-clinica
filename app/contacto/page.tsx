import Link from 'next/link';
import { CalendarCheck, Clock, Mail, MapPin, MessageCircle, Navigation, Phone, Siren } from 'lucide-react';
import ResenasGoogle from '@/components/ResenasGoogle';
import { AGENDA_HREF, CLINICA } from '@/lib/clinica';
import { dancing, nunito } from '@/lib/fuentes';
import { metaPagina } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd } from '@/lib/schema';

export const metadata = metaPagina({
  titulo: 'Contacto y cómo llegar · La Pintana',
  descripcion:
    'Av. Venancia Leiva 1871, La Pintana. WhatsApp +56 9 6646 7641. Lunes a viernes 8:30–19:30 y sábados 8:30–18:00. Agenda tu evaluación gratis.',
  ruta: '/contacto',
});

const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';
const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';

const { direccion, horario } = CLINICA;
const DIRECCION_COMPLETA = `${direccion.calle}, ${direccion.comuna}, ${direccion.region}`;
// Mapa de Google sin API key; se carga solo cuando el usuario baja hasta él (loading="lazy").
const MAPA_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(`Clínica Dignidad, ${DIRECCION_COMPLETA}`)}&z=16&output=embed`;

export default function ContactoPage() {
  return (
    <div className={`${nunito.className} bg-white`}>
      <JsonLd data={grafo(migasJsonLd([['Contacto', '/contacto']]))} />
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#B01C48]/20 blur-3xl" />
        </div>
        <div className="mx-auto max-w-[1100px] px-4 py-14 md:px-8 md:py-20">
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            Contacto y <span className="text-[#FDB92B]">cómo llegar</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-300">
            Estamos en {DIRECCION_COMPLETA}. La evaluación es gratis y ahí te entregamos tu presupuesto. Agenda en línea o
            escríbenos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={AGENDA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-full bg-[#FDB92B] px-8 py-4 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#FFC94F] ${focusDark}`}
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar evaluación gratis
            </a>
            <a
              href={CLINICA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusDark}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <address className="space-y-6 not-italic">
            <Dato icono={<MapPin className="h-5 w-5" />} titulo="Dirección">
              {direccion.calle}
              <br />
              {direccion.comuna}, {direccion.region}
              <br />
              <a
                href={CLINICA.google.perfilUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-1 inline-flex items-center gap-1.5 font-bold text-[#0A9BB8] hover:underline ${focusLight}`}
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Abrir en Google Maps
              </a>
            </Dato>

            <Dato icono={<Phone className="h-5 w-5" />} titulo="Teléfono y WhatsApp">
              <a href={`tel:${CLINICA.telefono}`} className={`font-bold text-[#071B3A] hover:underline ${focusLight}`}>
                {CLINICA.telefonoVisible}
              </a>{' '}
              (principal y WhatsApp)
              <br />
              <a
                href={`tel:${CLINICA.telefonoSecundario}`}
                className={`font-bold text-[#071B3A] hover:underline ${focusLight}`}
              >
                {CLINICA.telefonoSecundarioVisible}
              </a>{' '}
              (secundario)
            </Dato>

            <Dato icono={<Mail className="h-5 w-5" />} titulo="Correo">
              <a href={`mailto:${CLINICA.email}`} className={`font-bold text-[#071B3A] hover:underline ${focusLight}`}>
                {CLINICA.email}
              </a>
            </Dato>

            <Dato icono={<Clock className="h-5 w-5" />} titulo="Horario">
              <table className="text-left">
                <tbody>
                  <tr>
                    <th scope="row" className="pr-4 font-medium">Lunes a viernes</th>
                    <td className="font-bold text-[#071B3A]">
                      {horario.semana.abre} – {horario.semana.cierra}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="pr-4 font-medium">Sábado</th>
                    <td className="font-bold text-[#071B3A]">
                      {horario.sabado.abre} – {horario.sabado.cierra}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="pr-4 font-medium">Domingo</th>
                    <td className="font-bold text-[#071B3A]">Cerrado</td>
                  </tr>
                </tbody>
              </table>
            </Dato>

            <Link
              href="/urgencia-dental"
              className={`flex items-center gap-3 rounded-2xl border-2 border-[#E5527B]/30 bg-[#FFF3F6] p-4 font-bold text-[#071B3A] transition-colors hover:border-[#E5527B] ${focusLight}`}
            >
              <Siren className="h-5 w-5 flex-shrink-0 text-[#B01C48]" aria-hidden="true" />
              ¿Tienes una urgencia dental? Mira qué hacer
            </Link>
          </address>

          <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 shadow-sm">
            <iframe
              title={`Mapa de ${CLINICA.nombre}, ${DIRECCION_COMPLETA}`}
              src={MAPA_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0 lg:h-full lg:min-h-[480px]"
            />
          </div>
        </div>
      </section>
      <ResenasGoogle className="pb-6" />
      <p className={`${dancing.className} pb-14 pt-8 text-center text-3xl text-[#0A9BB8]`}>{CLINICA.eslogan}</p>
    </div>
  );
}

function Dato({ icono, titulo, children }: { icono: React.ReactNode; titulo: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#0A9BB8]/10 text-[#0A9BB8]">
        {icono}
      </span>
      <div className="text-[15.5px] leading-relaxed text-slate-600">
        <h2 className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-400">{titulo}</h2>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
