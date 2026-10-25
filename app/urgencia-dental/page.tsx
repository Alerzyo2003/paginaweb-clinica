import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  Siren,
} from 'lucide-react';
import RevisadoPor from '@/components/RevisadoPor';
import { CLINICA } from '@/lib/clinica';
import { dancing, nunito } from '@/lib/fuentes';
import { metaPagina } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { grafo, migasJsonLd } from '@/lib/schema';

export const metadata = metaPagina({
  titulo: 'Urgencia dental en La Pintana',
  descripcion:
    'Dolor de muelas, diente roto o hinchazón: escríbenos por WhatsApp al +56 9 6646 7641. Lunes a sábado en Av. Venancia Leiva 1871, La Pintana.',
  ruta: '/urgencia-dental',
});

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';
const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const { horario } = CLINICA;
const HORARIO_TEXTO = `lunes a viernes de ${horario.semana.abre} a ${horario.semana.cierra} y sábados de ${horario.sabado.abre} a ${horario.sabado.cierra}`;

const CASOS = [
  { titulo: 'Dolor fuerte que no se pasa', texto: 'Dolor de muelas que te despierta, late o no cede con un analgésico común.' },
  { titulo: 'Hinchazón de la cara o la encía', texto: 'Puede ser una infección (absceso) y conviene tratarla pronto.' },
  { titulo: 'Diente roto o quebrado', texto: 'Por un golpe o al morder algo duro, sobre todo si duele o quedó un borde filoso.' },
  { titulo: 'Diente que se salió por un golpe', texto: 'El tiempo es clave: mientras antes llegues, más posibilidades de salvarlo.' },
  { titulo: 'Sangrado después de una extracción', texto: 'Si no se detiene presionando con una gasa por 30 minutos.' },
  { titulo: 'Se cayó una tapadura o corona', texto: 'No suele ser grave, pero el diente queda expuesto y puede doler.' },
];

const MIENTRAS_LLEGAS = [
  {
    titulo: 'Si un diente definitivo se salió',
    pasos: [
      'Tómalo por la corona (la parte blanca), nunca por la raíz.',
      'Si está sucio, enjuágalo unos segundos con leche o suero, sin frotarlo.',
      'Guárdalo en un vaso con leche o dentro de la boca, junto a la mejilla.',
      'Ven de inmediato: lo ideal es llegar dentro de la primera hora.',
    ],
  },
  {
    titulo: 'Si tienes dolor o hinchazón',
    pasos: [
      'Pon frío por fuera de la cara, 10 a 15 minutos, con un paño entre medio.',
      'No pongas aspirina ni otros remedios directamente sobre la encía: la quema.',
      'Si tomas un analgésico, usa uno de uso habitual según lo que indica su envase.',
      'No apliques calor sobre una zona hinchada.',
    ],
  },
  {
    titulo: 'Si se quebró un diente',
    pasos: [
      'Enjuaga la boca con agua tibia.',
      'Guarda el trozo que se quebró, si lo encuentras, y tráelo.',
      'Evita masticar por ese lado hasta que te veamos.',
    ],
  },
];

const IR_A_URGENCIA = [
  'Hinchazón que te dificulta respirar, tragar o abrir la boca.',
  'Fiebre alta junto con la cara hinchada.',
  'Un golpe en la cabeza con mareo, vómitos o pérdida de conocimiento.',
  'Sangrado abundante que no se detiene.',
];

export default function UrgenciaDentalPage() {
  return (
    <div className={`${nunito.className} bg-white`}>
      <JsonLd data={grafo(migasJsonLd([['Urgencia dental', '/urgencia-dental']]))} />
      {/* ================= PORTADA ================= */}
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#B01C48]/25 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#0A9BB8]/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
        </div>

        <div className="mx-auto max-w-[1000px] px-4 py-16 md:px-8 md:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[13px] font-bold text-slate-200">
            <Siren className="h-4 w-4 text-[#E5527B]" aria-hidden="true" />
            Urgencias dentales
          </p>
          <h1 className="mt-5 text-4xl font-black leading-[1.08] tracking-tight md:text-6xl">
            Urgencia dental en <span className="text-[#FDB92B]">La Pintana</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 md:text-xl">
            Si tienes dolor fuerte, un diente roto o la cara hinchada, escríbenos por WhatsApp o llámanos al{' '}
            <strong className="text-white">{CLINICA.telefonoVisible}</strong>. Atendemos urgencias {HORARIO_TEXTO}, en{' '}
            {CLINICA.direccion.calle}. Te damos la primera hora disponible.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CLINICA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-full bg-[#FDB92B] px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusDark}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Escribir por WhatsApp
            </a>
            <a
              href={`tel:${CLINICA.telefono}`}
              className={`flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusDark}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Llamar al {CLINICA.telefonoVisible}
            </a>
          </div>

          <ul className="mt-10 grid gap-3 text-[15px] text-slate-300 sm:grid-cols-2">
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22B3CF]" aria-hidden="true" />
              <span>
                Lunes a viernes {horario.semana.abre}–{horario.semana.cierra}
                <br />
                Sábados {horario.sabado.abre}–{horario.sabado.cierra} · Domingo cerrado
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#22B3CF]" aria-hidden="true" />
              <span>
                {CLINICA.direccion.calle}, {CLINICA.direccion.comuna}
                <br />
                <a
                  href={CLINICA.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-bold text-[#FDB92B] hover:underline ${focusDark}`}
                >
                  Cómo llegar
                </a>
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ================= CUÁNDO ES URGENCIA ================= */}
      <section className="bg-[#F6F9FD] px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-3xl font-black tracking-tight text-[#071B3A] md:text-4xl">¿Cuándo es una urgencia dental?</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-600">
            Escríbenos el mismo día si te pasa alguna de estas situaciones. Si tienes dudas, mándanos una foto por
            WhatsApp y te orientamos.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CASOS.map((c) => (
              <li key={c.titulo} className="rounded-[1.25rem] border border-slate-100 bg-white p-6 shadow-sm">
                <p className="font-extrabold text-[#071B3A]">{c.titulo}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{c.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= MIENTRAS LLEGAS ================= */}
      <section className="px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-3xl font-black tracking-tight text-[#071B3A] md:text-4xl">Qué hacer mientras llegas</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {MIENTRAS_LLEGAS.map((bloque) => (
              <div key={bloque.titulo} className="rounded-[1.5rem] bg-[#F6F9FD] p-6 md:p-7">
                <h3 className="text-xl font-black text-[#071B3A]">{bloque.titulo}</h3>
                <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-[15px] leading-relaxed text-slate-600 marker:font-bold marker:text-[#0A9BB8]">
                  {bloque.pasos.map((paso) => (
                    <li key={paso}>{paso}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CUÁNDO IR A UN SERVICIO DE URGENCIA ================= */}
      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-[1000px] rounded-[1.75rem] border-2 border-[#E5527B]/30 bg-[#FFF3F6] p-7 md:p-10">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-7 w-7 flex-shrink-0 text-[#B01C48]" aria-hidden="true" />
            <h2 className="text-2xl font-black text-[#071B3A] md:text-3xl">Cuándo ir directo a un servicio de urgencia</h2>
          </div>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-700">
            Estas situaciones necesitan atención médica inmediata. No esperes a la clínica: ve al SAPU, SAR o servicio de
            urgencia del hospital más cercano, o llama al <strong>131</strong> (SAMU).
          </p>
          <ul className="mt-5 space-y-2 text-[15px] leading-relaxed text-slate-700">
            {IR_A_URGENCIA.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#B01C48]" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[15px] leading-relaxed text-slate-600">
            <strong className="text-[#071B3A]">Domingos y fuera de horario:</strong> si el dolor es soportable, déjanos
            un mensaje por WhatsApp y te respondemos apenas abramos. Si es grave, acude a un servicio de urgencia.
          </p>
        </div>
      </section>

      {/* ================= ENLACES ================= */}
      <section className="px-4 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto grid max-w-[1000px] gap-4 sm:grid-cols-3">
          {[
            { href: '/especialidades/endodoncia', titulo: 'Tratamiento de conducto', detalle: 'Cuando el dolor viene del nervio del diente' },
            { href: '/fonasa', titulo: 'Bono PAD Fonasa', detalle: 'Conductos con copago fijo de 12 a 34 años' },
            { href: '/contacto', titulo: 'Contacto y cómo llegar', detalle: 'Teléfonos, mapa y horario' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`group rounded-[1.25rem] border border-slate-200 p-5 transition-colors hover:border-[#0A9BB8] ${focusLight}`}
            >
              <span className="flex items-center gap-1 font-extrabold text-[#071B3A]">
                {l.titulo}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="mt-1 block text-[14px] text-slate-500">{l.detalle}</span>
            </Link>
          ))}
        </div>
        <p className={`${dancing.className} mt-12 text-center text-3xl text-[#0A9BB8]`}>{CLINICA.eslogan}</p>
      </section>

      <RevisadoPor ruta="/urgencia-dental" />
    </div>
  );
}
