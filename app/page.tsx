'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  CalendarCheck,
  Check,
  ChevronDown,
  ExternalLink,
  Gem,
  Heart,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ------------------------------------------------------------------ */
/*  Tipografías y colores: los mismos del Navbar                       */
/*  (Si mueves esto a un archivo compartido, importa desde ahí en      */
/*   ambos componentes.)                                               */
/* ------------------------------------------------------------------ */
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const NAVY_RAISED = '#0B2350';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const TEAL_LIGHT = '#22B3CF';
const GREEN = '#6B9A2A';
const GREEN_LIGHT = '#8DBF3F';
const MAGENTA = '#B01C48';
const MAGENTA_LIGHT = '#E5527B';
const SOFT = '#F6F9FD';
const BRAND_BAR = [GREEN, TEAL, AMBER, MAGENTA];

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const AGENDA_HREF = 'http://agendar.clinicadignidad.cl/agendar';
// Confirma que este número tenga WhatsApp; si no, elimina el botón de la sección #agenda.
const WHATSAPP_HREF = 'https://wa.me/56966467641';

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';
const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* ------------------------------------------------------------------ */
/*  Datos                                                              */
/* ------------------------------------------------------------------ */
const heroFeatures: { icon: LucideIcon; color: string; title: string }[] = [
  { icon: Users, color: TEAL_LIGHT, title: 'Atención\npersonalizada' },
  { icon: ShieldCheck, color: GREEN_LIGHT, title: 'Profesionales\nespecialistas' },
  { icon: Gem, color: AMBER, title: 'Tecnología\nde vanguardia' },
  { icon: Heart, color: MAGENTA_LIGHT, title: 'Un trato\ncercano y humano' },
];

const stats: { icon: LucideIcon; color: string; value: ReactNode; label: string }[] = [
  {
    icon: Smile,
    color: TEAL_LIGHT,
    value: (
      <span data-count="8" data-prefix="+">
        +8
      </span>
    ),
    label: 'Especialidades',
  },
  { icon: Users, color: GREEN_LIGHT, value: 'Profesionales', label: 'Comprometidos' },
  { icon: Star, color: AMBER, value: 'Miles de sonrisas', label: 'Nos respaldan' },
  { icon: Heart, color: MAGENTA_LIGHT, value: 'Para toda la familia', label: 'Salud bucal' },
];

const equipo: { nombre: string; rol: string; color: string; icon: LucideIcon; foto?: string }[] = [
  {
    nombre: 'Dr. Ariel Zivov',
    rol: 'Cirujano traumatólogo bucomaxilofacial',
    color: TEAL,
    icon: ShieldCheck,
    foto: '/equipo/ariel-zivov.png',
  },
  {
    nombre: 'Dra. Valeska Moraga',
    rol: 'Ortodoncista',
    color: AMBER,
    icon: Smile,
    foto: '/equipo/valeska-moraga.png',
  },
  {
    nombre: 'Dra. Antonia Urbina',
    rol: 'Endodoncista',
    color: GREEN,
    icon: Stethoscope,
    foto: '/equipo/antonia-urbina.png',
  },
  {
    nombre: 'Dr. Víctor Morgado',
    rol: 'Ortodoncista y odontopediatra',
    color: MAGENTA,
    icon: Baby,
    foto: '/equipo/victor-morgado.png',
  },
];

const esencia: { icon: LucideIcon; color: string; title: string; text: string }[] = [
  {
    icon: Users,
    color: TEAL,
    title: '¿Por qué nos eligen?',
    text: 'Nos prefieren por nuestra atención cercana y humana, combinada con la experiencia profesional de nuestros especialistas médicos.',
  },
  {
    icon: ShieldCheck,
    color: GREEN,
    title: 'Experiencia profesional',
    text: 'Contamos con un equipo altamente capacitado en diversas áreas de la salud médica y dental, comprometidos con entregar una atención integral.',
  },
  {
    icon: HeartPulse,
    color: MAGENTA,
    title: 'Servicios de emergencia',
    text: 'Sabemos que una urgencia dental no puede esperar. Por eso contamos con un servicio de emergencia odontológica cuando más lo necesitas.',
  },
];

// Mantén esta lista igual a la del Navbar (idealmente muévela a un archivo compartido).
const especialidades: { name: string; desc: string; icon: LucideIcon; color: string; href: string }[] = [
  { name: 'Ortodoncia', desc: 'Brackets y alineadores', icon: Smile, color: TEAL_LIGHT, href: '/especialidades/ortodoncia' },
  { name: 'Implantología', desc: 'Recupera piezas perdidas', icon: ShieldCheck, color: AMBER, href: '/especialidades/implantologia' },
  { name: 'Endodoncia', desc: 'Tratamiento de conductos', icon: Stethoscope, color: GREEN_LIGHT, href: '/especialidades/endodoncia' },
  { name: 'Estética dental', desc: 'Blanqueamiento y carillas', icon: Sparkles, color: MAGENTA_LIGHT, href: '/especialidades/estetica-dental' },
  { name: 'Odontopediatría', desc: 'Atención para niños', icon: Baby, color: TEAL_LIGHT, href: '/especialidades/odontopediatria' },
  { name: 'Rehabilitación oral', desc: 'Prótesis y función masticatoria', icon: HeartPulse, color: AMBER, href: '/especialidades/rehabilitacion-oral' },
];

const faqs = [
  {
    q: '¿Qué hace diferente a Clínica Dignidad?',
    a: 'Ofrecemos una atención centrada en las personas, combinando experiencia profesional, tecnología moderna y un trato humano. Nos diferenciamos por brindar evaluaciones gratuitas y acompañamiento en cada etapa.',
  },
  {
    q: '¿Qué puedo esperar durante mi primera visita?',
    a: 'Realizaremos una Evaluación Integral Costo Cero para conocer el estado de tu salud dental. Un especialista revisará tu caso y te propondrá el mejor plan de tratamiento, explicando cada paso.',
  },
  {
    q: '¿Ofrecen atención dental de emergencia?',
    a: 'Sí, sabemos que el dolor no avisa. Contamos con profesionales preparados para atender tu urgencia dental de forma rápida, segura y efectiva.',
  },
  {
    q: '¿Cómo acceder al descuento Tarjeta Más Comunidad?',
    a: 'Es muy simple: solo debes presentar tu tarjeta vigente (física o digital) al momento de agendar o asistir a tu evaluación en recepción.',
  },
];

/* ------------------------------------------------------------------ */
/*  Piezas reutilizables                                               */
/* ------------------------------------------------------------------ */

/** Divide un texto en palabras que suben desde una máscara (para el titular del hero). */
function SplitWords({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <span data-hero="word" className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </>
  );
}

/** Barra con los 4 colores del logo, igual a la del Navbar. */
function BrandBar({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-[3px] w-full ${className}`} aria-hidden="true">
      {BRAND_BAR.map((c) => (
        <span key={c} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

function SectionHeader({ title, text, dark = false }: { title: string; text?: string; dark?: boolean }) {
  return (
    <div className="grid items-end gap-5 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <h2
        className={`text-4xl font-black leading-[1.08] tracking-tight md:text-[50px] ${
          dark ? 'text-white' : 'text-[#071B3A]'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`max-w-md text-lg font-medium leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {text}
        </p>
      )}
    </div>
  );
}

/** Botón ámbar del Navbar, con respuesta al hover/tap. */
function AmberLink({
  href,
  children,
  className = '',
  large = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  large?: boolean;
}) {
  const external = href.startsWith('http');

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className={className}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-center gap-2 rounded-full font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${
            large ? 'px-8 py-4 text-[15px]' : 'px-8 py-3.5 text-sm'
          } ${focusDark}`}
          style={{ backgroundColor: AMBER }}
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className={`group flex items-center justify-center gap-2 rounded-full font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${
            large ? 'px-8 py-4 text-[15px]' : 'px-8 py-3.5 text-sm'
          } ${focusDark}`}
          style={{ backgroundColor: AMBER }}
        >
          {children}
        </Link>
      )}
    </motion.div>
  );
}

/** Barra fija inferior en móvil: el Navbar oculta su botón de agenda en pantallas chicas. */
function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setShow(v > 520));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="mx-3 mb-3 flex gap-2 rounded-full border border-white/10 bg-[#071B3A]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <a
              href={PHONE_HREF}
              aria-label={`Llamar al ${PHONE_LABEL}`}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-[#FDB92B] ${focusDark}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={AGENDA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-extrabold text-[#071B3A] ${focusDark}`}
              style={{ backgroundColor: AMBER }}
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agenda tu evaluación
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Pregunta del acordeón: solo una abierta a la vez, accesible con teclado. */
function FaqItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        open ? 'border-[#FDB92B] shadow-lg' : 'border-white/70 shadow-sm hover:border-slate-300'
      }`}
    >
      <h3>
        <button
          type="button"
          id={`faq-btn-${index}`}
          aria-expanded={open}
          aria-controls={`faq-panel-${index}`}
          onClick={onToggle}
          className={`flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left text-lg font-bold text-[#071B3A] ${focusLight}`}
        >
          {q}
          <motion.span
            aria-hidden="true"
            animate={{
              rotate: open ? 180 : 0,
              backgroundColor: open ? NAVY : '#EAF1FB',
              color: open ? '#FFFFFF' : NAVY,
            }}
            transition={{ duration: 0.25 }}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
          >
            <ChevronDown className="h-[18px] w-[18px]" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-btn-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="border-t border-slate-100 px-6 pb-6 pt-4 leading-relaxed text-slate-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */
export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      // Todo el movimiento se apaga si la persona pidió "reducir movimiento".
      const mm = gsap.matchMedia(root);

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* --- 1. Entrada del hero (el momento orquestado de la página) --- */
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-hero="badge"]', { y: 16, opacity: 0, duration: 0.6 })
          .from('[data-hero="word"]', { yPercent: 115, duration: 0.9, stagger: 0.05 }, '-=0.3')
          .from('[data-hero="fade"]', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.5')
          .from('[data-hero="photo"]', { scale: 0.85, opacity: 0, duration: 1.1, ease: 'power4.out' }, 0.2)
          .from('[data-hero="chip"]', { scale: 0.6, opacity: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.5')
          .from('[data-hero="stat"]', { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.4');

        /* --- 2. Movimiento ambiental (muy sutil) --- */
        gsap.to('[data-spin]', { rotation: 360, duration: 48, repeat: -1, ease: 'none' });
        gsap.utils.toArray<HTMLElement>('[data-float]', root).forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 12 : -12,
            duration: 2.8 + (i % 3) * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.6 + i * 0.2,
          });
        });

        /* --- 3. Parallax --- */
        gsap.utils.toArray<HTMLElement>('[data-parallax]', root).forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax) || -10,
            ease: 'none',
            scrollTrigger: {
              trigger: el.closest('section') || el,
              start: el.dataset.parallaxStart || 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        });

        /* --- 4. Contadores --- */
        root.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
          const end = Number(el.dataset.count);
          const prefix = el.dataset.prefix ?? '';
          const state = { v: 0 };
          el.textContent = `${prefix}0`;
          gsap.to(state, {
            v: end,
            duration: 1.8,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 95%', once: true },
            onUpdate: () => {
              el.textContent = `${prefix}${Math.round(state.v)}`;
            },
          });
        });

        /* --- 5. Líneas que se dibujan en la lista de especialidades --- */
        gsap.utils.toArray<HTMLElement>('[data-line]', root).forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: el, start: 'top 92%', once: true },
            }
          );
        });

        /* --- 6. Aparición escalonada solo en grupos (equipo, nosotros, especialidades) --- */
        const reveals = gsap.utils.toArray<HTMLElement>('[data-reveal]', root);
        gsap.set(reveals, { opacity: 0, y: 28 });
        ScrollTrigger.batch(reveals, {
          start: 'top 90%',
          once: true,
          onEnter: (els) =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1, overwrite: true }),
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <MotionConfig reducedMotion="user">
      <main ref={containerRef} className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
        {/* ================= HERO ================= */}
        <section id="inicio" className="relative isolate overflow-hidden bg-[#071B3A] text-white">
          {/* Fondo: resplandores con los colores del logo + trama de puntos */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
            <div className="absolute -right-32 top-1/3 h-[460px] w-[460px] rounded-full bg-[#B01C48]/20 blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-[#FDB92B]/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            />
          </div>

          <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14 lg:pt-16">
            <div className="grid items-center gap-12 pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-16">
              {/* Columna izquierda */}
              <div className="space-y-6">
                <div
                  data-hero="photo"
                  className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-white/90 lg:hidden"
                >
                  <Image
                    src="/foto-paciente.png"
                    alt="Paciente atendida en Clínica Dignidad"
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                

                <h1 className="text-[40px] font-black leading-[1.08] tracking-tight md:text-5xl lg:text-[56px]">
                  <SplitWords text="Tu sonrisa nos importa." />
                  <span className="mt-2 block text-[#FDB92B]">
                    <SplitWords text="Confía en expertos para un futuro brillante." />
                  </span>
                </h1>

                <p data-hero="fade" className="max-w-lg text-base font-medium leading-relaxed text-slate-300 lg:text-lg">
                  Cuidamos tu sonrisa con profesionalismo y calidez. En Clínica Dignidad, construimos juntos un futuro
                  más saludable.
                </p>

                <div data-hero="fade" className="flex flex-col items-center gap-4 pt-1 sm:flex-row">
                  <AmberLink href={AGENDA_HREF} className="w-full sm:w-auto">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar hora
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </AmberLink>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="w-full sm:w-auto">
                    <Link
                      href="/especialidades"
                      className={`flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusDark}`}
                    >
                      Conoce nuestras especialidades
                    </Link>
                  </motion.div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-5 md:grid-cols-4">
                  {heroFeatures.map(({ icon: Icon, color, title }) => (
                    <div key={title} data-hero="fade" className="flex items-center gap-2.5">
                      <span
                        className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${color}26`, color }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="whitespace-pre-line text-xs font-bold leading-tight text-slate-200">{title}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Columna derecha: foto con órbita de colores del logo */}
              <div
                data-parallax="-6"
                data-parallax-start="top top"
                className="relative hidden lg:block"
              >
                <div className="relative mx-auto aspect-square w-full max-w-[420px] xl:max-w-[460px]">
                  {/* Anillo orbital con los 4 colores del logo */}
                  <div
                    data-spin
                    aria-hidden="true"
                    className="absolute -inset-7 rounded-full border border-dashed border-white/20"
                  >
                    <span className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: TEAL_LIGHT }} />
                    <span className="absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full" style={{ backgroundColor: AMBER }} />
                    <span className="absolute bottom-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2 translate-y-1/2 rounded-full" style={{ backgroundColor: MAGENTA_LIGHT }} />
                    <span className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: GREEN_LIGHT }} />
                  </div>

                  <div
                    data-hero="photo"
                    className="relative h-full w-full overflow-hidden rounded-full shadow-[0_30px_70px_-15px_rgba(10,155,184,0.45)] ring-[10px] ring-white/90"
                  >
                    <Image
                      src="/foto-paciente.png"
                      alt="Paciente sonriendo"
                      fill
                      sizes="460px"
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Tarjeta: evaluación gratis */}
                  <div data-hero="chip" data-float className="absolute -bottom-6 -left-12">
                    <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                      <span
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-[#071B3A]"
                        style={{ backgroundColor: AMBER }}
                      >
                        <CalendarCheck className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-lg font-black leading-tight text-[#071B3A]">
                          Evaluación
                          <br />
                          gratis
                        </p>
                        <p className="mt-1 text-xs font-bold text-slate-500">Costo cero $0</p>
                      </div>
                    </div>
                  </div>

                  {/* Chip: urgencias */}
                  <div data-hero="chip" data-float className="absolute -right-8 top-8">
                    <div className="flex items-center gap-2.5 rounded-2xl border border-white/20 bg-[#0B2350]/90 px-4 py-2.5 shadow-xl backdrop-blur">
                      <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E5527B] opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#E5527B]" />
                      </span>
                      <span className="text-[13px] font-bold">Urgencias dentales</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Franja de datos */}
            <div className="pb-20 md:pb-24">
              <div className="grid grid-cols-2 gap-6 rounded-[2rem] border border-white/10 bg-white/[0.06] px-6 py-6 backdrop-blur-md md:px-10 lg:grid-cols-4 lg:gap-0">
                {stats.map(({ icon: Icon, color, value, label }, i) => (
                  <div
                    key={label}
                    data-hero="stat"
                    className={`flex items-center gap-3 lg:px-6 ${i > 0 ? 'lg:border-l lg:border-white/10' : ''} ${
                      i === 0 ? 'lg:pl-0' : ''
                    }`}
                  >
                    <span
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${color}26`, color }}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="block text-xl font-black leading-tight">{value}</span>
                      <span className="mt-0.5 block text-xs font-semibold text-slate-400">{label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transición curva hacia la sección siguiente */}
          <svg
            aria-hidden="true"
            className="absolute bottom-[-1px] left-0 h-10 w-full md:h-16"
            viewBox="0 0 1440 72"
            preserveAspectRatio="none"
            fill={SOFT}
          >
            <path d="M0 40 C 240 90, 480 -10, 720 30 S 1200 80, 1440 24 V72 H0 Z" />
          </svg>
        </section>

        {/* ================= EQUIPO ================= */}
        <section id="equipo" className="scroll-mt-24 py-20 md:py-28" style={{ backgroundColor: SOFT }}>
          <div className="mx-auto max-w-[1300px] px-4 md:px-8">
            <SectionHeader
              title="Un equipo que te acompaña en cada etapa"
              text="Especialistas de distintas áreas de la salud dental, con un trato cercano y humano."
            />

            <ul className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
              {equipo.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.li
                    key={m.nombre}
                    data-reveal
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    className="group rounded-[26px] border border-slate-200/80 bg-white p-4 text-center shadow-[0_16px_40px_-28px_rgba(7,27,58,.55)]"
                  >
                    <div
                      className="relative mx-auto h-32 w-32 rounded-full p-1 md:h-40 md:w-40"
                      style={{ background: `conic-gradient(${m.color}, ${NAVY_RAISED}, ${m.color})` }}
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#EAF2FB] ring-4 ring-white">
                        {m.foto ? (
                          <Image
                            src={m.foto}
                            alt={`Fotografía de ${m.nombre}`}
                            fill
                            sizes="160px"
                            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div
                            className="flex h-full w-full items-center justify-center"
                            style={{ backgroundColor: `${m.color}1F`, color: m.color }}
                          >
                            <Icon className="h-14 w-14" aria-hidden="true" />
                          </div>
                        )}
                      </div>

                      <span
                        className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white shadow-md"
                        style={{ backgroundColor: m.color }}
                      >
                        <Icon className="h-4 w-4 text-white" aria-hidden="true" />
                      </span>
                    </div>

                    <h3 className="mt-5 text-base font-black leading-tight text-[#071B3A] md:text-lg">{m.nombre}</h3>
                    <p className="mt-2 min-h-[40px] text-[13px] font-bold leading-snug" style={{ color: m.color }}>
                      {m.rol}
                    </p>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-10 flex justify-center">
              <Link
                href="/equipo"
                className={`group inline-flex items-center gap-2 rounded-full border-2 border-[#071B3A] px-6 py-3 text-sm font-extrabold text-[#071B3A] transition-all hover:bg-[#071B3A] hover:text-white ${focusLight}`}
              >
                Conocer a todo el equipo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= NOSOTROS ================= */}
        <section id="nosotros" className="relative scroll-mt-24 overflow-hidden bg-white py-20 md:py-28">
          {/* Diente decorativo */}
          <div
            data-parallax="-12"
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-10 hidden xl:block"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[440px] w-[440px] text-[#EEF4FC]">
              <path d="M12 21.5C8 21.5 5 18.5 5 14.5C5 12 6.5 9 8 7C9.5 5 11 3 12 3C13 3 14.5 5 16 7C17.5 9 19 12 19 14.5C19 18.5 16 21.5 12 21.5Z" />
            </svg>
          </div>

          <div className="relative mx-auto grid max-w-[1300px] gap-14 px-4 md:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div className="self-start lg:sticky lg:top-32">
              <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-[#071B3A] md:text-[50px]">
                Cuidamos tu salud con calidad y cercanía.
              </h2>
              <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-slate-600">
                Creemos que todas las personas merecen una atención médica y dental de primer nivel, con un enfoque
                humano y tecnología moderna.
              </p>
              <p className={`${scriptFont.className} mt-8 text-4xl leading-tight text-[#0A9BB8] md:text-5xl`}>
                Que sonreír sea costumbre
              </p>
            </div>

            <ul className="divide-y divide-slate-200">
              {esencia.map(({ icon: Icon, color, title, text }) => (
                <li key={title} data-reveal className="flex gap-5 py-9 first:pt-0 last:pb-0">
                  <span
                    className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}1F`, color }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-black text-[#071B3A]">{title}</h3>
                    <p className="mt-2 max-w-md text-[17px] leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ================= ESPECIALIDADES ================= */}
        <section id="especialidades" className="scroll-mt-24 bg-white px-3 py-4 md:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071B3A] px-5 py-20 md:px-12 md:py-28">
            <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0A9BB8]/15 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-[#B01C48]/15 blur-3xl" />

            <div className="relative mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div className="self-start lg:sticky lg:top-32">
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  Especialidades para toda la familia
                </h2>
                <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed text-slate-300">
                  ¿No sabes cuál necesitas? Agenda una evaluación gratuita y un especialista te orienta.
                </p>
                <AmberLink href={AGENDA_HREF} className="mt-8 w-fit">
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Agenda tu evaluación
                </AmberLink>
              </div>

              <div>
                <ul>
                  {especialidades.map(({ name, desc, icon: Icon, color, href }) => (
                    <li key={name} data-reveal>
                      <div data-line className="h-px origin-left bg-white/15" />
                      <Link
                        href={href}
                        className="group relative flex items-center gap-5 px-2 py-6 transition-colors hover:bg-white/[0.04] focus-visible:bg-white/[0.04] focus-visible:outline-none md:px-5"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                          style={{ backgroundColor: color }}
                        />
                        <span
                          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${color}26`, color }}
                        >
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xl font-extrabold text-white md:text-2xl">{name}</span>
                          <span className="mt-0.5 block text-[15px] text-slate-400">{desc}</span>
                        </span>
                        <ArrowUpRight
                          className="h-5 w-5 flex-shrink-0 text-slate-500 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div data-line className="h-px origin-left bg-white/15" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONVENIOS ================= */}
        <section id="convenios" className="scroll-mt-24 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8">
            <SectionHeader
              title="Convenios y previsión"
              text="Precios accesibles, respaldo para tu reembolso y beneficios para tu grupo familiar."
            />

            {/* Isapre y Fonasa */}
            <div className="mt-14 flex flex-col overflow-hidden rounded-[2.5rem] bg-[#071B3A] shadow-2xl lg:flex-row">
              <div className="flex flex-col justify-center p-8 md:p-12 lg:w-[55%] lg:p-16">
                <h3 className="text-3xl font-black leading-tight tracking-tight text-white md:text-[40px]">
                  ¿Atienden por ISAPRE y FONASA?
                </h3>
                <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-blue-100/80">
                  En Clínica Dignidad atendemos de manera particular. Ofrecemos precios accesibles y te entregamos todo
                  lo necesario para que gestiones tu reembolso directamente con tu Isapre o seguro complementario.
                </p>

                <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-white/10 bg-[#0B2350] p-6 sm:flex-row sm:items-start">
                  <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-inner">
                    <Image src="/fonasa.png" alt="Logo Fonasa" fill sizes="96px" className="object-contain p-3" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg font-bold text-white">Reembolso Fonasa</h4>
                    <p className="mb-3 mt-1.5 text-[13px] leading-relaxed text-blue-100/70">
                      Si eres beneficiario, puedes solicitar el reembolso presentando los documentos en:
                    </p>
                    <a
                      href="https://portalserviciosweb.fonasa.cl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 rounded text-[13px] font-bold text-[#FDB92B] hover:underline ${focusDark}`}
                    >
                      portalserviciosweb.fonasa.cl <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[340px] lg:min-h-full lg:w-[45%]">
                <Image
                  src="/box.png"
                  alt="Box dental de Clínica Dignidad"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute right-5 top-8 z-10 hidden rotate-[-4deg] rounded-3xl border border-white bg-white/95 px-6 py-4 shadow-2xl backdrop-blur-md md:block lg:right-8">
                  <span className={`${scriptFont.className} block text-center text-[30px] leading-tight text-[#0B2350]`}>
                    Salud bucal <br /> para toda la familia
                  </span>
                </div>
              </div>
            </div>

            {/* Tarjeta Más Comunidad */}
            <div
              className="relative mt-8 flex min-h-[400px] w-full flex-col items-center overflow-hidden rounded-[2.5rem] bg-cover bg-center p-8 shadow-2xl md:min-h-[460px] md:flex-row md:p-14 lg:p-16"
              style={{ backgroundColor: '#7D41F0', backgroundImage: `url('/tarjeta.png')` }}
            >
              <div className="relative z-10 mr-auto mt-6 flex max-w-[340px] flex-col items-center space-y-4 text-center md:mt-0 md:items-start md:text-left lg:max-w-md">
                <span className="inline-block rounded-full bg-white/20 px-4 py-1.5 text-[13px] font-bold text-white">
                  Beneficio exclusivo
                </span>
                <h3 className="text-4xl font-black leading-tight text-white drop-shadow-sm md:text-[48px]">
                  Tarjeta Más Comunidad
                </h3>
                <p className="pb-2 text-[16px] font-medium leading-relaxed text-white/90 drop-shadow-sm">
                  Accede a descuentos especiales para ti y tu grupo familiar.
                </p>
                {/* TODO: apunta este link a la página o PDF de convenios cuando exista */}
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="#agenda"
                    className="flex w-fit items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-bold text-[#7D41F0] shadow-lg transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#7D41F0]"
                  >
                    Revisar convenios <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>

              <div className="absolute right-4 top-8 z-10 hidden rotate-[-5deg] flex-col items-center md:flex lg:right-8 lg:top-10">
                <span className={`${scriptFont.className} block text-center text-[28px] leading-tight text-[#2E1065] lg:text-[34px]`}>
                  Más <br /> beneficios <br /> para tu salud
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= AGENDA ================= */}
        <section id="agenda" className="scroll-mt-24 bg-white px-3 pb-6 md:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
            <BrandBar />
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#FDB92B]/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <div>
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  Agenda tu evaluación sin costo
                </h2>
                <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                  Un especialista revisa tu caso y te propone el mejor plan de tratamiento, explicando cada paso.
                </p>
                <ul className="mt-8 space-y-3.5">
                  {[
                    'Evaluación integral costo cero',
                    'Atención de urgencias dentales',
                    'Descuento con Tarjeta Más Comunidad',
                  ].map((item, i) => (
                    <li key={item} className="flex items-center gap-3 text-[17px] font-semibold text-white">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[#071B3A]"
                        style={{ backgroundColor: BRAND_BAR[(i + 1) % BRAND_BAR.length] }}
                      >
                        <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10">
                <p className="text-sm font-bold text-slate-500">Atención rápida</p>
                <a
                  href={PHONE_HREF}
                  className={`mt-1 block rounded text-3xl font-black tracking-tight text-[#071B3A] hover:text-[#0A9BB8] md:text-4xl ${focusLight}`}
                >
                  {PHONE_LABEL}
                </a>
                <div className="mt-7 flex flex-col gap-3">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <a
                      href={PHONE_HREF}
                      className={`flex items-center justify-center gap-2 rounded-full py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                      style={{ backgroundColor: AMBER }}
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      Llamar ahora
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <a
                      href={WHATSAPP_HREF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] py-3.5 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#071B3A] hover:text-white ${focusLight}`}
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      Escribir por WhatsApp
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PREGUNTAS FRECUENTES ================= */}
        <section id="preguntas" className="relative w-full scroll-mt-24 overflow-hidden py-24 md:py-32">
          {/* Fondo estático de altura fija: no salta al abrir el acordeón */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-[1500px] w-full bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url('/fondo-preguntas.png')` }}
          />

          <div className="relative z-10 mx-auto max-w-[1000px] px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-black tracking-tight text-[#071B3A] md:text-5xl">Preguntas frecuentes</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-600">
                Encuentra respuestas rápidas sobre nuestros servicios y procedimientos.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  index={i}
                  q={faq.q}
                  a={faq.a}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                />
              ))}
            </div>
          </div>
        </section>

        <MobileCta />
      </main>
    </MotionConfig>
  );
}