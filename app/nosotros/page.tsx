'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  ArrowRight,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  ExternalLink,
  Gem,
  HandHeart,
  Heart,
  HeartPulse,
  MessageCircle,
  Phone,
  Quote,
  Route,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Tokens de marca (mismos de la home, el Navbar y /equipo).          */
/*  Ideal: moverlos a src/lib/brand.ts e importarlos en todas.         */
/* ------------------------------------------------------------------ */
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const TEAL_LIGHT = '#22B3CF';
const GREEN = '#6B9A2A';
const GREEN_LIGHT = '#8DBF3F';
const MAGENTA = '#B01C48';
const MAGENTA_LIGHT = '#E5527B';
const SOFT = '#F6F9FD';
const BRAND_BAR = [GREEN, TEAL, AMBER, MAGENTA];

// OJO: la home usa +56 9 6646 7641 y el sitio actual publica +56 9 9446 4662.
// Deja uno solo en src/lib/brand.ts para no tener dos números dando vueltas.
const PHONE_LABEL = '+56 9 9446 4662';
const PHONE_HREF = 'tel:+56994464662';
const WHATSAPP_HREF = 'https://wa.me/56994464662';
const AGENDA_HREF =
  'https://d531f286059606eb615a04840514483424142e3e.agenda.softwaredentalink.com/agenda?modalidad=1';
const TMC_HREF = 'https://tmc.dideco.cl/services/dignidad-centro-medico-y-dental/';

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';
const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/*  Contenido                                                          */
/* ------------------------------------------------------------------ */
const cifras: { valor: string; label: string; color: string; icon: LucideIcon }[] = [
  { valor: '$0', label: 'Evaluación integral', color: AMBER, icon: CalendarCheck },
  { valor: '12+', label: 'Especialidades médicas', color: TEAL_LIGHT, icon: Stethoscope },
  { valor: '16', label: 'Profesionales en clínica', color: GREEN_LIGHT, icon: Users },
  { valor: '100%', label: 'Satisfacción del paciente', color: MAGENTA_LIGHT, icon: Heart },
];

const pilares: { titulo: string; texto: string; color: string; icon: LucideIcon }[] = [
  {
    titulo: 'Nuestra misión',
    texto:
      'Brindar una atención de salud integral, accesible y de alta calidad, basada en la innovación constante, la capacitación continua de nuestros profesionales y el compromiso genuino con cada paciente.',
    color: TEAL,
    icon: Route,
  },
  {
    titulo: 'Nuestra visión',
    texto:
      'Contribuir a que las personas vivan más y mejor, con una atención médica y dental centrada en el paciente y su familia, elevando cada día los estándares de calidad de nuestra comunidad.',
    color: GREEN,
    icon: Gem,
  },
];

const valores = [
  'Profesionalismo',
  'Respeto',
  'Honestidad',
  'Cercanía',
  'Compromiso',
  'Responsabilidad',
  'Actitud de servicio',
  'Excelencia',
  'Dignidad',
];

const pasos: { titulo: string; texto: string; color: string }[] = [
  {
    titulo: 'Agendas tu hora',
    texto: 'Por teléfono, WhatsApp o desde la agenda en línea. Eliges día, hora y motivo de consulta.',
    color: GREEN,
  },
  {
    titulo: 'Evaluación integral sin costo',
    texto: 'Un especialista revisa tu boca completa, no solo el diente que duele, y toma los registros necesarios.',
    color: TEAL,
  },
  {
    titulo: 'Recibes tu plan de tratamiento',
    texto: 'Te explicamos qué tienes, qué alternativas existen, cuánto demora y cuánto cuesta. Sin letra chica.',
    color: AMBER,
  },
  {
    titulo: 'Tratamiento y seguimiento',
    texto: 'Avanzamos a tu ritmo y con el especialista que corresponde, con controles después del alta.',
    color: MAGENTA,
  },
];

const compromiso: { titulo: string; texto: string; color: string; icon: LucideIcon }[] = [
  {
    titulo: '¿Por qué nos eligen?',
    texto:
      'Por una atención cercana y humana, respaldada por la experiencia profesional de nuestros especialistas médicos y dentales.',
    color: TEAL,
    icon: HandHeart,
  },
  {
    titulo: 'Experiencia profesional',
    texto:
      'Un equipo altamente capacitado en distintas áreas de la salud médica y dental, comprometido con entregar una atención integral.',
    color: GREEN,
    icon: ShieldCheck,
  },
  {
    titulo: 'Servicios de emergencia',
    texto:
      'Una urgencia dental no puede esperar. Contamos con servicio de emergencia odontológica cuando más lo necesitas.',
    color: MAGENTA,
    icon: HeartPulse,
  },
];

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: '¿Qué hace diferente a Clínica Dignidad?',
    a: (
      <>
        Ofrecemos una atención centrada en las personas, que combina experiencia profesional, tecnología moderna y un
        trato cercano. Nos diferenciamos por las evaluaciones gratuitas y el acompañamiento en cada etapa del
        tratamiento. Aquí cada paciente es atendido con respeto, dedicación y dignidad.
      </>
    ),
  },
  {
    q: '¿Qué puedo esperar durante mi primera visita?',
    a: (
      <>
        Una evaluación integral costo cero. Un especialista revisa el estado de tu salud dental, resuelve tus dudas y te
        propone un plan de tratamiento con los tiempos y valores definidos antes de empezar.
      </>
    ),
  },
  {
    q: '¿Atienden por Fonasa?',
    a: <>Sí. Somos prestadores Fonasa Nivel 1 y atendemos por Fonasa exclusivamente tratamiento de conducto.</>,
  },
  {
    q: '¿Cómo puedo agendar una hora?',
    a: (
      <>
        Por teléfono al {PHONE_LABEL}, por WhatsApp o desde nuestra agenda en línea, disponible a cualquier hora. Si es
        una urgencia, llámanos: te damos prioridad.
      </>
    ),
  },
  {
    q: '¿Cómo acceder al descuento Tarjeta Más Comunidad?',
    a: (
      <>
        Presenta tu tarjeta vigente, física o digital, al agendar o al llegar a recepción. El descuento se aplica de
        inmediato sobre el valor del tratamiento.
      </>
    ),
  },
  {
    q: '¿Con qué frecuencia debo visitar al dentista?',
    a: (
      <>
        Para la mayoría de las personas, un control cada seis meses basta para detectar caries y problemas de encías a
        tiempo. Si tienes ortodoncia, implantes o enfermedad periodontal, tu especialista te indicará controles más
        seguidos.
      </>
    ),
  },
  {
    q: '¿Ofrecen atención dental de emergencia?',
    a: (
      <>
        Sí. Contamos con profesionales preparados para resolver dolor agudo, traumatismos e infecciones de forma rápida
        y segura. Llámanos y te indicamos la hora disponible más próxima.
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Piezas reutilizables + animación                                   */
/* ------------------------------------------------------------------ */

// Barra de progreso de scroll, con los colores de marca (BRAND_BAR).
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, background: `linear-gradient(90deg, ${GREEN}, ${TEAL}, ${AMBER}, ${MAGENTA})` }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left"
    />
  );
}

// Palabra por palabra, para el titular del hero (un único lugar "audaz" de la página).
function AnimatedWords({ text, className = '' }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 + 0.045 * i, ease: EASE }}
          className="inline-block"
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

// Cifra que cuenta hacia arriba cuando entra en pantalla (conserva prefijo/sufijo: $, +, %).
function AnimatedStat({ valor }: { valor: string }) {
  const match = valor.match(/^([^\d]*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView || !match) return;
    const target = parseInt(match[2], 10);
    const controls = animate(mv, target, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, match, mv]);

  if (!match) return <span ref={ref}>{valor}</span>;
  return (
    <span ref={ref}>
      {match[1]}
      {display}
      {match[3]}
    </span>
  );
}

function BrandBar({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex h-[3px] w-full origin-left ${className}`}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {BRAND_BAR.map((c) => (
        <span key={c} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </motion.div>
  );
}

function SectionHeader({ title, text, dark = false }: { title: string; text?: string; dark?: boolean }) {
  return (
    <div className="grid items-end gap-5 md:grid-cols-[1.2fr_1fr] md:gap-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`text-4xl font-black leading-[1.08] tracking-tight md:text-[50px] ${
          dark ? 'text-white' : 'text-[#071B3A]'
        }`}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          className={`max-w-md text-lg font-medium leading-relaxed ${dark ? 'text-slate-300' : 'text-slate-600'}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

function AgendaLink({
  children,
  className = '',
  large = false,
}: {
  children: ReactNode;
  className?: string;
  large?: boolean;
}) {
  return (
    <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.96 }} className={className}>
      <a
        href={AGENDA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-2 rounded-full font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${
          large ? 'px-8 py-4 text-[15px]' : 'px-8 py-3.5 text-sm'
        } ${focusDark}`}
        style={{ backgroundColor: AMBER }}
      >
        {children}
      </a>
    </motion.div>
  );
}

function FaqItem({
  index,
  q,
  a,
  open,
  onToggle,
}: {
  index: number;
  q: string;
  a: ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: Math.min(index, 5) * 0.05, ease: EASE }}
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
    </motion.div>
  );
}

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: Math.min(i, 4) * 0.09, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const pop = {
  hidden: { opacity: 0, scale: 0.85, y: 8 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */
export default function Nosotros() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
        {/* ================= PORTADA ================= */}
        <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl"
              animate={{ y: [0, -26, 0], x: [0, 16, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#B01C48]/20 blur-3xl"
              animate={{ y: [0, 22, 0], x: [0, -14, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-[#FDB92B]/10 blur-3xl"
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            />
          </div>

          <div className="mx-auto max-w-[1320px] px-4 pb-32 pt-16 md:px-8 md:pb-36 md:pt-20">
            <div className="grid items-end gap-8 md:grid-cols-[1.15fr_1fr] md:gap-16">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[13px] font-bold text-[#FDB92B] backdrop-blur"
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -10, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.2, ease: EASE }}
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  </motion.span>
                  Sobre Clínica Dignidad
                </motion.span>
                <h1 className="mt-6 text-[40px] font-black leading-[1.08] tracking-tight md:text-5xl lg:text-[56px]">
                  <AnimatedWords text="Cuidamos tu salud con calidad, cercanía y compromiso" />
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              >
                <p className="max-w-md text-lg font-medium leading-relaxed text-slate-300">
                  Somos un centro médico y dental integral. Creemos que todas las personas merecen una atención de
                  primer nivel, con un enfoque humano y accesible.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <AgendaLink large className="w-full sm:w-auto">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar hora
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </AgendaLink>
                  <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                    <Link
                      href="/equipo"
                      className={`flex items-center justify-center rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusDark}`}
                    >
                      Conoce al equipo
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Cifras */}
            <motion.ul
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-16 grid grid-cols-2 gap-6 rounded-[2rem] border border-white/10 bg-white/[0.06] px-6 py-7 backdrop-blur-md md:px-10 lg:grid-cols-4 lg:gap-0"
            >
              {cifras.map(({ valor, label, color, icon: Icon }, i) => (
                <motion.li
                  key={label}
                  variants={pop}
                  whileHover={{ y: -3 }}
                  className={`flex items-center gap-3 lg:px-6 ${i > 0 ? 'lg:border-l lg:border-white/10' : ''} ${
                    i === 0 ? 'lg:pl-0' : ''
                  }`}
                >
                  <motion.span
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${color}26`, color }}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </motion.span>
                  <div>
                    <span className="block text-2xl font-black leading-tight">
                      <AnimatedStat valor={valor} />
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-slate-400">{label}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

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

        {/* ================= QUIÉNES SOMOS ================= */}
        <section className="py-20 md:py-28" style={{ backgroundColor: SOFT }}>
          <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="relative aspect-[4/3] w-full overflow-hidden rounded-[2.5rem] shadow-[0_30px_70px_-25px_rgba(7,27,58,0.5)]"
              >
                <Image
                  src="/box.png"
                  alt="Box de atención de Clínica Dignidad"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                whileHover={{ rotate: 0, scale: 1.04 }}
                className="absolute -bottom-8 -right-4 hidden rounded-3xl border border-white bg-white px-7 py-5 shadow-2xl md:block"
              >
                <span className={`${scriptFont.className} block text-center text-[30px] leading-tight text-[#0B2350]`}>
                  Que sonreír <br /> sea costumbre
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={reveal}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-[#071B3A] md:text-[50px]">
                Un centro médico y dental, pensado para tu familia
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-600">
                Reunimos en un mismo lugar las especialidades que tu salud bucal necesita, con tecnología moderna y un
                equipo que se toma el tiempo de explicarte cada paso. Así tu tratamiento avanza sin derivaciones entre
                clínicas ni esperas innecesarias.
              </p>
              <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-slate-600">
                Trabajamos para mejorar la calidad de vida de nuestros pacientes y sus familias, con tratamientos
                profesionales y precios al alcance de la comunidad.
              </p>

              <motion.figure
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
                className="mt-8 border-l-4 pl-6"
                style={{ borderColor: AMBER }}
              >
                <Quote className="h-6 w-6" style={{ color: AMBER }} aria-hidden="true" />
                <blockquote className="mt-2 text-xl font-bold leading-snug text-[#071B3A]">
                  Cada paciente es atendido con respeto, dedicación y dignidad, porque tu salud es nuestra prioridad.
                </blockquote>
              </motion.figure>
            </motion.div>
          </div>
        </section>

        {/* ================= MISIÓN, VISIÓN Y VALORES ================= */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1320px] px-4 md:px-8">
            <SectionHeader
              title="Lo que nos mueve"
              text="Principios que se notan en la consulta, no solo en el papel."
            />

            <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
              {pilares.map(({ titulo, texto, color, icon: Icon }, i) => (
                <motion.article
                  key={titulo}
                  variants={reveal}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  className="flex flex-col rounded-[2rem] p-8 ring-1 ring-slate-200/80 md:p-10"
                  style={{ backgroundColor: `${color}0D` }}
                >
                  <motion.span
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${color}1F`, color }}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </motion.span>
                  <h3 className="mt-6 text-2xl font-black text-[#071B3A]">{titulo}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-slate-600">{texto}</p>
                </motion.article>
              ))}

              <motion.article
                variants={reveal}
                custom={2}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                className="relative overflow-hidden rounded-[2rem] bg-[#071B3A] p-8 md:p-10"
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-[260px] w-[260px] rounded-full bg-[#0A9BB8]/20 blur-3xl"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${AMBER}26`, color: AMBER }}
                  >
                    <Heart className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-2xl font-black text-white">Nuestros valores</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-slate-300">
                    Nos guiamos por principios que se reflejan en cada atención:
                  </p>
                  <motion.ul
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.4 }}
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {valores.map((v, i) => (
                      <motion.li
                        key={v}
                        variants={pop}
                        whileHover={{ scale: 1.08, y: -2 }}
                        className="rounded-full border px-3.5 py-1.5 text-[13.5px] font-bold"
                        style={{
                          borderColor: `${BRAND_BAR[i % BRAND_BAR.length]}66`,
                          color: v === 'Dignidad' ? NAVY : '#E2E8F0',
                          backgroundColor: v === 'Dignidad' ? AMBER : 'rgba(255,255,255,0.04)',
                        }}
                      >
                        {v}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* ================= CÓMO FUNCIONA ================= */}
        <section className="bg-white px-3 py-4 md:px-6">
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-5 py-20 md:px-12 md:py-28"
            style={{ backgroundColor: SOFT }}
          >
            <div className="mx-auto max-w-[1300px]">
              <SectionHeader
                title="Cómo funciona tu atención"
                text="De la primera llamada al alta, siempre sabes en qué etapa vas y cuánto cuesta."
              />

              <ol className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {pasos.map(({ titulo, texto, color }, i) => (
                  <motion.li
                    key={titulo}
                    variants={reveal}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="relative"
                  >
                    {i < pasos.length - 1 && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: EASE }}
                        className="absolute left-14 top-[26px] hidden h-[2px] w-[calc(100%-3.5rem)] origin-left lg:block"
                        style={{ background: `linear-gradient(90deg, ${color}66, transparent)` }}
                      />
                    )}
                    <div className="flex items-center gap-4">
                      <motion.span
                        whileHover={{ scale: 1.12, rotate: -6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-2xl text-xl font-black text-white shadow-lg"
                        style={{ backgroundColor: color }}
                      >
                        {i + 1}
                      </motion.span>
                    </div>
                    <h3 className="mt-5 text-xl font-black leading-tight text-[#071B3A]">{titulo}</h3>
                    <p className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-slate-600">{texto}</p>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-14 flex flex-col items-start gap-4 border-t border-slate-200 pt-10 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-lg text-[17px] font-semibold text-[#071B3A]">
                  La primera evaluación no tiene costo y no te compromete a nada.
                </p>
                <AgendaLink large>
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Agendar evaluación gratis
                </AgendaLink>
              </div>
            </div>
          </div>
        </section>

        {/* ================= COMPROMISO ================= */}
        <section className="bg-white px-3 py-4 md:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071B3A] px-5 py-20 md:px-12 md:py-28">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0A9BB8]/15 blur-3xl"
              animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full bg-[#B01C48]/15 blur-3xl"
              animate={{ y: [0, 18, 0], x: [0, -10, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />

            <div className="relative mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="self-start lg:sticky lg:top-32"
              >
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  Sonríe tranquilo, estás en buenas manos
                </h2>
                <p className="mt-6 max-w-sm text-lg font-medium leading-relaxed text-slate-300">
                  Combinamos la experiencia profesional de nuestro equipo con una vocación genuina de servicio.
                </p>
                <p className={`${scriptFont.className} mt-6 text-4xl leading-tight text-[#22B3CF]`}>
                  Cuidamos siempre tu sonrisa
                </p>
              </motion.div>

              <ul className="divide-y divide-white/10">
                {compromiso.map(({ titulo, texto, color, icon: Icon }, i) => (
                  <motion.li
                    key={titulo}
                    variants={reveal}
                    custom={i}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex gap-5 py-9 first:pt-0 last:pb-0"
                  >
                    <motion.span
                      whileHover={{ rotate: 10, scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${color}2E`, color }}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </motion.span>
                    <div>
                      <h3 className="text-2xl font-black text-white">{titulo}</h3>
                      <p className="mt-2 max-w-md text-[17px] leading-relaxed text-slate-300">{texto}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= ATENCIÓN FONASA ================= */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-[1320px] px-4 md:px-8">
            <SectionHeader
              title="Atención Fonasa"
              text="Somos prestadores Fonasa Nivel 1 y actualmente atendemos por Fonasa exclusivamente tratamiento de conducto."
            />

            <div className="mt-14 grid gap-6">
              <motion.div
                variants={reveal}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative overflow-hidden rounded-[2.5rem] bg-[#071B3A] p-8 shadow-2xl md:p-12"
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-28 -top-28 h-[360px] w-[360px] rounded-full bg-[#0A9BB8]/15 blur-3xl"
                  animate={{ y: [0, -16, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-32 -left-20 h-[280px] w-[280px] rounded-full bg-[#FDB92B]/10 blur-3xl"
                  animate={{ y: [0, 14, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                />

                <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-extrabold text-[#FDB92B]">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                      Fonasa Nivel 1
                    </span>
                    <h3 className="mt-6 text-3xl font-black leading-tight text-white md:text-[38px]">
                      Tratamiento de conducto
                    </h3>
                    <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-300">
                      Actualmente atendemos por Fonasa exclusivamente esta prestación. Agenda tu evaluación para revisar
                      tu caso y confirmar la indicación del profesional antes de comenzar.
                    </p>
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.06, rotate: 3 }}
                    className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-xl"
                  >
                    <Stethoscope className="h-12 w-12 text-[#22B3CF]" aria-hidden="true" />
                  </motion.div>
                </div>

                <div className="relative mt-9 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Atención Fonasa Nivel 1 · Solo tratamiento de conducto
                  </p>
                  <AgendaLink large>
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar evaluación
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </AgendaLink>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= PREGUNTAS FRECUENTES ================= */}
        <section id="preguntas" className="relative w-full scroll-mt-24 overflow-hidden py-24 md:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 h-[1500px] w-full bg-cover bg-top bg-no-repeat"
            style={{ backgroundImage: `url('/fondo-preguntas.png')` }}
          />

          <div className="relative z-10 mx-auto max-w-[1000px] px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-black tracking-tight text-[#071B3A] md:text-5xl">
                Todo lo que necesitas saber
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-slate-600">
                Respuestas rápidas sobre nuestros servicios, procedimientos y atención al paciente.
              </p>
            </motion.div>

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

        {/* ================= AGENDA ================= */}
        <section id="agenda" className="scroll-mt-24 bg-white px-3 pb-6 md:px-6 md:pb-10">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
            <BrandBar />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#FDB92B]/10 blur-3xl"
              animate={{ y: [0, -18, 0], x: [0, 10, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  Da el primer paso hoy
                </h2>
                <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                  Agenda tu evaluación integral sin costo. Un especialista revisa tu caso y te propone el mejor plan de
                  tratamiento, explicando cada paso.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <AgendaLink large className="w-full sm:w-auto">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar hora en línea
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </AgendaLink>
                  <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
                    <Link
                      href="/equipo"
                      className={`flex items-center justify-center gap-2 rounded-full border border-white/25 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:border-white hover:bg-white/10 ${focusDark}`}
                    >
                      <Smile className="h-5 w-5" aria-hidden="true" />
                      Ver especialistas
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10"
              >
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
                <p className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-slate-500">
                  <ClipboardList className="h-4 w-4 flex-shrink-0" style={{ color: TEAL }} aria-hidden="true" />
                  Lleva tu cédula y, si tienes, radiografías previas.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}