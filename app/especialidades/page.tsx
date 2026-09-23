'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion, Variants } from 'framer-motion';import { Nunito, Dancing_Script } from 'next/font/google';
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  Search,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

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

const AGENDA_HREF = 'http://agendar.clinicadignidad.cl/agendar';
const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const WHATSAPP_HREF = 'https://wa.me/56966467641';

type Categoria = 'Todas' | 'Odontología' | 'Especializada' | 'Infantil';

type Especialidad = {
  nombre: string;
  slug: string;
  descripcion: string;
  detalle: string;
  categoria: Exclude<Categoria, 'Todas'>;
  color: string;
  icon: LucideIcon;
};

const especialidades: Especialidad[] = [
  {
    nombre: 'Odontología General',
    slug: 'odontologia-general',
    descripcion: 'Controles, diagnóstico, prevención y tratamientos generales para cuidar tu salud bucal.',
    detalle: 'La puerta de entrada para revisar tu salud dental y definir el camino de tratamiento.',
    categoria: 'Odontología',
    color: TEAL,
    icon: Smile,
  },
  {
    nombre: 'Ortodoncia',
    slug: 'ortodoncia',
    descripcion: 'Brackets, alineadores y tratamientos para mejorar la posición de los dientes y la mordida.',
    detalle: 'Alternativas para niños, adolescentes y adultos, según evaluación profesional.',
    categoria: 'Especializada',
    color: AMBER,
    icon: Smile,
  },
  {
    nombre: 'Implantología',
    slug: 'implantologia',
    descripcion: 'Soluciones para recuperar piezas dentales perdidas y devolver función y estética.',
    detalle: 'Planificación y rehabilitación alrededor de implantes dentales.',
    categoria: 'Especializada',
    color: '#E0A100',
    icon: ShieldCheck,
  },
  {
    nombre: 'Endodoncia',
    slug: 'endodoncia',
    descripcion: 'Tratamiento de conductos para conservar dientes afectados por infección o daño pulpar.',
    detalle: 'Atención especializada orientada a aliviar el dolor y preservar la pieza dental.',
    categoria: 'Especializada',
    color: GREEN,
    icon: Stethoscope,
  },
  {
    nombre: 'Estética Dental',
    slug: 'estetica-dental',
    descripcion: 'Blanqueamiento, carillas y rehabilitación estética para una sonrisa armónica y natural.',
    detalle: 'Tratamientos orientados a mejorar color, forma y proporción de la sonrisa.',
    categoria: 'Especializada',
    color: MAGENTA,
    icon: Sparkles,
  },
  {
    nombre: 'Odontopediatría',
    slug: 'odontopediatria',
    descripcion: 'Atención dental para niños, con prevención y una experiencia cercana y amigable.',
    detalle: 'Acompañamos cada etapa del desarrollo bucal con un enfoque adaptado a la infancia.',
    categoria: 'Infantil',
    color: TEAL_LIGHT,
    icon: Baby,
  },
  {
    nombre: 'Rehabilitación Oral',
    slug: 'rehabilitacion-oral',
    descripcion: 'Prótesis y tratamientos integrales para recuperar función, mordida y estética.',
    detalle: 'Planificación de casos que necesitan reconstrucción o reposición de piezas dentales.',
    categoria: 'Especializada',
    color: MAGENTA_LIGHT,
    icon: HeartPulse,
  },
];

const beneficios = [
  {
    titulo: 'Evaluación integral',
    texto: 'Primero entendemos tu caso y después definimos el tratamiento que corresponde.',
    color: TEAL,
    icon: Search,
  },
  {
    titulo: 'Especialistas en un mismo lugar',
    texto: 'Puedes avanzar entre distintas áreas sin tener que empezar de cero en otra clínica.',
    color: GREEN,
    icon: Users,
  },
  {
    titulo: 'Atención cercana',
    texto: 'Te explicamos cada etapa en un lenguaje claro para que tomes decisiones informado.',
    color: AMBER,
    icon: HeartPulse,
  },
];

const reveal = {
  hidden: { opacity: 0, y: 32, filter: 'blur(7px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function SpecialtyCard({ item, index }: { item: Especialidad; index: number }) {
  const Icon = item.icon;

  return (
    <motion.article
      layout
      variants={reveal}
      custom={index % 4}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      whileHover={{ y: -12, scale: 1.012, rotateX: 1.4, rotateY: index % 2 ? 1.2 : -1.2 }}
      className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-[0_16px_50px_-38px_rgba(7,27,58,.7)] transition-shadow duration-300 hover:shadow-[0_28px_70px_-38px_rgba(7,27,58,.8)] [transform-style:preserve-3d]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ opacity: 0.65, scale: 1.05 }}
        style={{ backgroundColor: `${item.color}35` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <motion.div
          whileHover={{ rotate: 9, scale: 1.08 }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${item.color}16`, color: item.color }}
        >
          <Icon className="h-7 w-7" />
        </motion.div>

        <span
          className="rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em]"
          style={{ backgroundColor: `${item.color}12`, color: item.color }}
        >
          {item.categoria}
        </span>
      </div>

      <div className="relative z-10 mt-6">
        <h3 className="text-[25px] font-black leading-tight tracking-tight text-[#071B3A]">{item.nombre}</h3>
        <p className="mt-3 text-[15px] leading-7 text-slate-600">{item.descripcion}</p>
      </div>

      <div
        className="relative z-10 mt-6 overflow-hidden rounded-2xl border p-4"
        style={{ borderColor: `${item.color}20`, backgroundColor: `${item.color}08` }}
      >
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: item.color }} />
          <p className="text-sm font-semibold leading-6 text-slate-600">{item.detalle}</p>
        </div>
      </div>

      <Link
        href={`/especialidades/${item.slug}`}
        className="group/link relative z-10 mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-black text-[#071B3A] shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
      >
        Ver especialidad
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </Link>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-1 w-full origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35 }}
        style={{ backgroundColor: item.color }}
      />
    </motion.article>
  );
}

export default function EspecialidadesPage() {
  const [categoria, setCategoria] = useState<Categoria>('Todas');

  const visibles = useMemo(() => {
    if (categoria === 'Todas') return especialidades;
    return especialidades.filter((item) => item.categoria === categoria);
  }, [categoria]);

  return (
    <MotionConfig reducedMotion="user">
      <main className={`${mainFont.className} min-h-screen overflow-x-hidden bg-white text-[#071B3A]`}>
        {/* ================= HERO ================= */}
        <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute -left-44 -top-44 h-[560px] w-[560px] rounded-full bg-[#0A9BB8]/22 blur-3xl"
              animate={{ x: [0, 36, -18, 0], y: [0, 18, 46, 0], scale: [1, 1.08, 0.97, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-[-100px] top-1/3 h-[480px] w-[480px] rounded-full bg-[#B01C48]/18 blur-3xl"
              animate={{ x: [0, -22, 18, 0], y: [0, -15, 18, 0], scale: [1, 0.94, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-[-160px] left-1/3 h-[400px] w-[400px] rounded-full bg-[#FDB92B]/12 blur-3xl"
              animate={{ x: [0, 20, -15, 0], scale: [1, 1.1, 0.95, 1] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 opacity-[0.06]"
              animate={{ backgroundPosition: ['0px 0px', '28px 28px'] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-14 md:px-8 md:pb-20 md:pt-18">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16"
            >
              <div>
                <motion.div
                  variants={reveal}
                  custom={0}
                  className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.065] px-4 py-2 text-[12px] font-black uppercase tracking-[0.14em] text-[#FDB92B] backdrop-blur"
                >
                  <Sparkles className="h-4 w-4" />
                  Clínica Dignidad
                </motion.div>

                <motion.h1
                  variants={reveal}
                  custom={1}
                  className="max-w-3xl text-[44px] font-black leading-[1.02] tracking-tight md:text-6xl lg:text-[68px]"
                >
                  Especialidades
                  <span className="block text-[#FDB92B]">para cada sonrisa.</span>
                </motion.h1>

                <motion.p
                  variants={reveal}
                  custom={2}
                  className="mt-6 max-w-xl text-lg font-medium leading-8 text-slate-300 md:text-xl"
                >
                  Diferentes áreas de atención, un mismo equipo y una experiencia pensada para acompañarte en cada
                  etapa de tu salud bucal.
                </motion.p>

                <motion.div variants={reveal} custom={3} className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <motion.a
                    href={AGENDA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_18px_45px_-13px_rgba(253,185,43,.8)] sm:w-auto"
                    style={{ backgroundColor: AMBER }}
                  >
                    <CalendarCheck className="h-5 w-5" />
                    Agendar evaluación
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.a>

                  <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/equipo"
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 text-[15px] font-bold text-white transition-all hover:border-white/40 hover:bg-white/[0.07] sm:w-auto"
                    >
                      Conocer especialistas
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div variants={reveal} custom={4} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                  {[
                    ['+8', 'Especialidades'],
                    ['100%', 'Atención cercana'],
                    ['1 lugar', 'Para tu familia'],
                  ].map(([value, label], i) => (
                    <motion.div
                      key={label}
                      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,.08)' }}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors"
                    >
                      <p className="text-lg font-black" style={{ color: BRAND_BAR[i + 1] ?? AMBER }}>{value}</p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">{label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                variants={reveal}
                custom={2}
                className="relative mx-auto w-full max-w-[580px] [perspective:1200px]"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                  transition={{
                    opacity: { duration: 0.8, delay: 0.25 },
                    scale: { duration: 0.8, delay: 0.25 },
                    y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.018, rotateX: 2.5, rotateY: -3 }}
                  className="relative overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[0.08] p-2 shadow-[0_40px_90px_-28px_rgba(0,0,0,.75)]"
                >
<div className="relative aspect-square overflow-hidden rounded-[2.05rem] bg-white">
                    <Image
                      src="/especialidades/especialidades.png"
                      alt="Especialidades de Clínica Dignidad"
                      fill
                      sizes="(max-width: 1024px) 92vw, 580px"
                      priority
                      className="object-contain"
                    />

                    <motion.div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-[-45%] w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                      animate={{ x: ['0%', '480%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 3.8, ease: 'easeInOut' }}
                      style={{ transform: 'skewX(-18deg)' }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-6 -left-3 hidden rounded-3xl bg-white p-4 shadow-2xl md:block"
                  animate={{ y: [0, -7, 0], rotate: [-2.5, -1, -2.5] }}
                  transition={{ duration: 4.1, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.04, rotate: 0 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${AMBER}22`, color: AMBER }}
                    >
                      <CalendarCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500">Primera evaluación</p>
                      <p className="text-base font-black text-[#071B3A]">Costo cero</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -right-2 top-8 hidden rounded-2xl border border-white/10 bg-[#0B2350]/90 px-4 py-3 shadow-xl backdrop-blur md:block"
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#8DBF3F] shadow-[0_0_15px_rgba(141,191,63,.8)]" />
                    <span className="text-xs font-extrabold text-white">Atención profesional</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${GREEN}, ${TEAL}, ${AMBER}, ${MAGENTA})` }} />
        </section>

        {/* ================= INTRO ================= */}
        <section className="relative overflow-hidden bg-white py-16 md:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute -left-28 top-20 h-60 w-60 rounded-full bg-[#0A9BB8]/8 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#B01C48]/6 blur-3xl" />

          <div className="relative mx-auto max-w-[1380px] px-4 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end"
            >
              <motion.div variants={reveal} custom={0}>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#0A9BB8]">Encuentra tu camino</span>
                <h2 className="mt-3 text-4xl font-black leading-[1.08] tracking-tight md:text-5xl">
                  Una clínica. Diferentes especialidades. Un mismo equipo.
                </h2>
              </motion.div>

              <motion.p variants={reveal} custom={1} className="max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
                Explora cada área y descubre en qué puede ayudarte. Si no sabes cuál necesitas, también puedes agendar
                directamente y nosotros te orientamos.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ================= DIRECTORIO ================= */}
        <section className="relative bg-[#F6F9FD] py-12 md:py-20">
          <div className="mx-auto max-w-[1380px] px-4 md:px-8">
            <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B01C48]">Directorio clínico</span>
                <h2 className="mt-3 text-4xl font-black tracking-tight text-[#071B3A] md:text-5xl">¿Qué especialidad buscas?</h2>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="flex min-w-max rounded-full border border-slate-200 bg-white p-2 shadow-sm">
                  {(['Todas', 'Odontología', 'Especializada', 'Infantil'] as Categoria[]).map((item) => {
                    const active = categoria === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategoria(item)}
                        className="relative rounded-full px-5 py-2.5 text-sm font-black"
                      >
                        {active && (
                          <motion.span
                            layoutId="categoria-activa"
                            className="absolute inset-0 rounded-full"
                            style={{ backgroundColor: NAVY }}
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className={`relative z-10 ${active ? 'text-white' : 'text-slate-600'}`}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visibles.map((item, i) => (
                  <SpecialtyCard key={item.slug} item={item} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ================= BENEFICIOS ================= */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-[1380px] px-4 md:px-8">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16"
            >
              <motion.div variants={reveal} custom={0}>
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#6B9A2A]">La experiencia Dignidad</span>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  No necesitas saberlo todo antes de venir.
                </h2>
                <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
                  Lo importante es dar el primer paso. Evaluamos tu caso y te ayudamos a entender qué necesitas.
                </p>

                <motion.a
                  href={AGENDA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-black text-[#071B3A] shadow-lg"
                  style={{ backgroundColor: AMBER }}
                >
                  No sé qué especialidad necesito
                  <ArrowRight className="h-4 w-4" />
                </motion.a>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-3">
                {beneficios.map((beneficio, i) => {
                  const Icon = beneficio.icon;

                  return (
                    <motion.article
                      key={beneficio.titulo}
                      variants={reveal}
                      custom={i + 1}
                      whileHover={{ y: -9, scale: 1.02 }}
                      className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_12px_40px_-30px_rgba(7,27,58,.55)]"
                    >
                      <motion.div
                        aria-hidden="true"
                        className="absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: `${beneficio.color}30` }}
                      />
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.08 }}
                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl"
                        style={{ backgroundColor: `${beneficio.color}18`, color: beneficio.color }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.div>
                      <h3 className="relative z-10 mt-6 text-xl font-black">{beneficio.titulo}</h3>
                      <p className="relative z-10 mt-3 text-sm leading-6 text-slate-600">{beneficio.texto}</p>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= MINI CTA ================= */}
        <section className="bg-[#F6F9FD] px-3 py-5 md:px-6 md:py-7">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            className="relative mx-auto max-w-[1380px] overflow-hidden rounded-[2.3rem] bg-[#071B3A] px-6 py-8 md:px-10"
          >
            <motion.div
              aria-hidden="true"
              className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#0A9BB8]/18 blur-3xl"
              animate={{ x: [0, -18, 12, 0], y: [0, 14, -8, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.17em] text-[#22B3CF]">Primer paso</p>
                <h2 className="mt-2 text-2xl font-black text-white md:text-3xl">
                  Agenda y deja que nosotros te orientemos.
                </h2>
              </div>

              <motion.a
                href={AGENDA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-7 py-3.5 text-sm font-black text-[#071B3A] shadow-xl"
                style={{ backgroundColor: AMBER }}
              >
                <CalendarCheck className="h-5 w-5" />
                Agendar evaluación
              </motion.a>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4">
              {BRAND_BAR.map((color, i) => (
                <motion.div
                  key={color}
                  className="h-1 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.92, 1, 0.92] }}
                  transition={{ duration: 2.7 + i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>
        </section>

        {/* ================= CONTACTO ================= */}
        <section className="bg-white py-14 md:py-18">
          <div className="mx-auto flex max-w-[1380px] flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Atención</p>
              <p className="mt-1 text-2xl font-black text-[#071B3A]">{PHONE_LABEL}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">La Pintana · Clínica Dignidad</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <motion.a
                href={PHONE_HREF}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-slate-200 px-6 py-3 text-sm font-black text-[#071B3A] transition-shadow hover:shadow-lg"
              >
                Llamar ahora
              </motion.a>
              <motion.a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border-2 border-[#071B3A] px-6 py-3 text-sm font-black text-[#071B3A] transition-colors hover:bg-[#071B3A] hover:text-white"
              >
                WhatsApp
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}