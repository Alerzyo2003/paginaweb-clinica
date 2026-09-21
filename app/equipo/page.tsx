'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, MotionConfig, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  ArrowRight,
  Baby,
  CalendarCheck,
  Footprints,
  HeartPulse,
  MessageCircle,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Tokens de marca (mismos de la home y el Navbar).                   */
/* ------------------------------------------------------------------ */
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const GREEN = '#6B9A2A';
const MAGENTA = '#B01C48';
const SOFT = '#F6F9FD';
const BRAND_BAR = [GREEN, TEAL, AMBER, MAGENTA];

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const WHATSAPP_HREF = 'https://wa.me/56966467641';
const AGENDA_HREF = 'https://confirmar-cita-dignidad.vercel.app/agendar';

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';
const focusLight =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

/* ------------------------------------------------------------------ */
/*  Áreas y equipo                                                     */
/* ------------------------------------------------------------------ */
type AreaId = 'cirugia' | 'ortodoncia' | 'endodoncia' | 'rehabilitacion' | 'general' | 'podologia';

type Miembro = {
  nombre: string;
  rol: string;
  descripcion: string;
  area: AreaId;
  foto?: string;
};

const AREAS: Record<AreaId, { titulo: string; corto: string; color: string; icon: LucideIcon }> = {
  cirugia: { titulo: 'Cirugía maxilofacial e implantes', corto: 'Cirugía e implantes', color: TEAL, icon: ShieldCheck },
  ortodoncia: { titulo: 'Ortodoncia y niños', corto: 'Ortodoncia y niños', color: AMBER, icon: Baby },
  endodoncia: { titulo: 'Endodoncia', corto: 'Endodoncia', color: GREEN, icon: Stethoscope },
  rehabilitacion: { titulo: 'Rehabilitación y estética', corto: 'Rehabilitación', color: MAGENTA, icon: Sparkles },
  general: { titulo: 'Odontología general', corto: 'Odontología general', color: TEAL, icon: Smile },
  podologia: { titulo: 'Podología clínica', corto: 'Podología', color: MAGENTA, icon: Footprints },
};

const equipo: Miembro[] = [
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

/* ------------------------------------------------------------------ */
/*  Utilidades                                                         */
/* ------------------------------------------------------------------ */
function slugify(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function iniciales(nombre: string) {
  return nombre
    .replace(/^(Dra?\.|Sra?\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const revealUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
};

const softFloat = {
  animate: {
    x: [0, 18, -10, 0],
    y: [0, -14, 10, 0],
    scale: [1, 1.04, 0.97, 1],
  },
  transition: {
    duration: 14,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

function BrandBar({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex h-[3px] w-full ${className}`}
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {BRAND_BAR.map((c, i) => (
        <motion.span
          key={c}
          className="flex-1 origin-left"
          style={{ backgroundColor: c }}
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.03 }}
        />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Efectos de tarjeta — Spotlight + Tilt                             */
/* ------------------------------------------------------------------ */
function SpotlightCard({
  children,
  color,
  className = '',
}: {
  children: React.ReactNode;
  color: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty('--spot-x', `${x}%`);
    ref.current.style.setProperty('--spot-y', `${y}%`);
  };

  const handlePointerLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--spot-x', '50%');
    ref.current.style.setProperty('--spot-y', '35%');
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`group relative overflow-hidden rounded-[28px] bg-white ${className}`}
      style={{
        '--spot-x': '50%',
        '--spot-y': '35%',
      } as React.CSSProperties}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(260px circle at var(--spot-x) var(--spot-y), ${color}22, transparent 68%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function TiltSurface({ children }: { children: React.ReactNode }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 260, damping: 22, mass: 0.55 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 22, mass: 0.55 });
  const shadowY = useTransform(springX, [-10, 0, 10], [10, 22, 10]);
  const dynamicShadow = useTransform(shadowY, (y) => `0 ${y}px 45px -30px rgba(7,27,58,0.55)`);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 8);
    rotateX.set((0.5 - py) * 6);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      onPointerMove={handleMove}
      onPointerLeave={reset}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.995 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{
        rotateX: springX,
        rotateY: springY,
        perspective: 1000,
        transformStyle: 'preserve-3d',
        boxShadow: dynamicShadow,
      }}
    >
      {children}
    </motion.div>
  );
}

function TarjetaProfesional({ m, index }: { m: Miembro; index: number }) {
  const area = AREAS[m.area];
  const Icon = area.icon;
  // Agregamos el especialista como parámetro en la URL de reserva para que el portal lo lea
  const href = `${AGENDA_HREF}?especialista=${slugify(m.nombre)}`;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 45, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -50px 0px' }}
      transition={{
        duration: 0.65,
        delay: Math.min(index * 0.055, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      exit={{ opacity: 0, y: 20, scale: 0.96 }}
      className="min-w-0"
    >
      <TiltSurface>
        <SpotlightCard
          color={area.color}
          className="ring-1 ring-slate-200/90 shadow-[0_8px_28px_-18px_rgba(7,27,58,0.45)] transition-[box-shadow,transform] duration-300 group-hover:ring-slate-300 group-hover:shadow-[0_24px_55px_-24px_rgba(7,27,58,0.58)]"
        >
          {/* Línea de marca */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 z-30 h-1 origin-left"
            style={{ backgroundColor: area.color }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 + index * 0.03, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Foto — limpia, sin overlay/transparencia gris */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E8F0FA]">
            {m.foto ? (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                >
                  <Image
                    src={m.foto}
                    alt={`Retrato de ${m.nombre}`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 23vw"
                    className="object-cover object-top"
                  />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                aria-hidden="true"
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: `${area.color}17`, color: area.color }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className={`${scriptFont.className} select-none text-7xl leading-none`}>
                  {iniciales(m.nombre)}
                </span>
              </motion.div>
            )}

            {/* Glare tipo React Bits: aparece solo al interactuar. */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/2 z-10 w-1/2 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent"
              initial={{ x: '-10%', opacity: 0 }}
              whileHover={{ x: '320%', opacity: 1 }}
              transition={{ duration: 0.85, ease: 'easeInOut' }}
            />
          </div>

          {/* Datos: 100% sólidos */}
          <div className="relative z-10 flex flex-1 flex-col bg-white p-6">
            <motion.div
              className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[12px] font-extrabold"
              style={{ backgroundColor: `${area.color}12`, color: area.color }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 + index * 0.03, duration: 0.4 }}
              whileHover={{ scale: 1.04, x: 2 }}
            >
              <motion.span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: `${area.color}20`, color: area.color }}
                whileHover={{ rotate: 12, scale: 1.12 }}
              >
                <Icon className="h-3 w-3" aria-hidden="true" />
              </motion.span>
              {area.corto}
            </motion.div>

            <motion.h3
              className="text-[20px] font-black leading-tight tracking-tight text-[#071B3A]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 + index * 0.03, duration: 0.4 }}
            >
              {m.nombre}
            </motion.h3>

            <motion.p
              className="mt-1.5 text-[13.5px] font-bold leading-snug"
              style={{ color: area.color }}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.21 + index * 0.03, duration: 0.4 }}
            >
              {m.rol}
            </motion.p>

            <motion.p
              className="mt-3 flex-1 text-[14.5px] leading-relaxed text-slate-600"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.26 + index * 0.03, duration: 0.4 }}
            >
              {m.descripcion}
            </motion.p>

            <motion.div
              className="mt-6"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group/btn flex items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] py-3 text-[14px] font-extrabold text-[#071B3A] transition-colors duration-200 hover:border-[#FDB92B] hover:bg-[#FDB92B] ${focusLight}`}
              >
                <motion.span whileHover={{ rotate: -8 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                  <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
                </motion.span>
                Agendar hora
                <motion.span
                  className="inline-flex"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.span>
              </a>
            </motion.div>
            <span className="sr-only">con {m.nombre}</span>
          </div>
        </SpotlightCard>
      </TiltSurface>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/*  Página                                                             */
/* ------------------------------------------------------------------ */
export default function Equipo() {
  const [filtro, setFiltro] = useState<AreaId | 'todos'>('todos');

  const conteos = useMemo(() => {
    return equipo.reduce<Record<string, number>>((acc, m) => {
      acc[m.area] = (acc[m.area] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  const visibles = filtro === 'todos' ? equipo : equipo.filter((m) => m.area === filtro);

  const chips: { id: AreaId | 'todos'; label: string; total: number; color: string }[] = [
    { id: 'todos', label: 'Todo el equipo', total: equipo.length, color: NAVY },
    ...(Object.keys(AREAS) as AreaId[]).map((id) => ({
      id,
      label: AREAS[id].corto,
      total: conteos[id] ?? 0,
      color: AREAS[id].color,
    })),
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
        {/* ================= PORTADA ================= */}
        <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl"
              {...softFloat}
            />
            <motion.div
              className="absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-[#B01C48]/20 blur-3xl"
              animate={{ x: [0, -16, 12, 0], y: [0, 12, -12, 0], scale: [1, 0.96, 1.05, 1] }}
              transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-[#FDB92B]/10 blur-3xl"
              animate={{ x: [0, 12, -8, 0], y: [0, -10, 6, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
            />
          </div>

          <div className="mx-auto max-w-[1320px] px-4 pb-32 pt-16 md:px-8 md:pb-36 md:pt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.16 } },
              }}
              className="grid items-end gap-8 md:grid-cols-[1.15fr_1fr] md:gap-16"
            >
              <motion.div variants={revealUp} transition={{ duration: 0.65, ease: EASE_OUT }}>
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-[13px] font-bold text-[#FDB92B] backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Nuestro equipo
                </span>
                <motion.h1 variants={revealUp} className="mt-6 text-[40px] font-black leading-[1.08] tracking-tight md:text-5xl lg:text-[56px]">
                  Las personas que cuidan tu sonrisa
                </motion.h1>
              </motion.div>

              <motion.div variants={revealUp} transition={{ duration: 0.65, ease: EASE_OUT }}>
                <p className="max-w-md text-lg font-medium leading-relaxed text-slate-300">
                  {equipo.length} profesionales de {Object.keys(AREAS).length} áreas atienden en el mismo lugar: tu
                  tratamiento avanza sin derivaciones ni esperas entre clínicas.
                </p>
                <motion.p
                  className={`${scriptFont.className} mt-6 text-4xl leading-tight text-[#22B3CF]`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.6, ease: EASE_OUT }}
                >
                  Que sonreír sea costumbre
                </motion.p>
              </motion.div>
            </motion.div>
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

        {/* ================= EQUIPO ================= */}
        <section className="pb-24 pt-10 md:pb-28" style={{ backgroundColor: SOFT }}>
          <div className="mx-auto max-w-[1320px] px-4 md:px-8">
            {/* Filtro por especialidad */}
            <motion.div
              className="sticky top-20 z-30 -mx-4 mb-12 px-4 py-3 md:-mx-8 md:px-8"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <div className="rounded-full border border-white bg-white/80 p-2 shadow-[0_10px_30px_-18px_rgba(7,27,58,0.5)] backdrop-blur-md">
                <ul role="list" className="flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {chips.map(({ id, label, total, color }) => {
                    const activo = filtro === id;
                    return (
                      <li key={id} className="snap-start">
                        <motion.button
                          type="button"
                          onClick={() => setFiltro(id)}
                          whileTap={{ scale: 0.96 }}
                          whileHover={{ y: -1 }}
                          aria-pressed={activo}
                          className={`relative flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[14px] font-extrabold transition-colors ${focusLight} ${
                            activo ? 'text-white' : 'text-slate-600 hover:text-[#071B3A]'
                          }`}
                        >
                          {activo && (
                            <motion.span
                              layoutId="chip-activo"
                              className="absolute inset-0 -z-10 rounded-full"
                              style={{ backgroundColor: NAVY }}
                              transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                            />
                          )}
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 flex-shrink-0 rounded-full"
                            style={{ backgroundColor: activo ? AMBER : color }}
                          />
                          {label}
                          <span className={activo ? 'text-white/60' : 'text-slate-400'}>{total}</span>
                        </motion.button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>

            {/* Grilla */}
            <motion.ul
              layout
              role="list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={stagger}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-7"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibles.map((m, index) => (
                  <TarjetaProfesional key={m.nombre} m={m} index={index} />
                ))}
              </AnimatePresence>
            </motion.ul>

            <p aria-live="polite" className="sr-only">
              {visibles.length} profesionales en {filtro === 'todos' ? 'todas las áreas' : AREAS[filtro].titulo}.
            </p>
          </div>
        </section>

        {/* ================= AGENDA ================= */}
        <section className="bg-white px-3 py-6 md:px-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]"
          >
            <BrandBar />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#FDB92B]/10 blur-3xl"
            />

            <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <motion.div variants={revealUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.65, ease: EASE_OUT }}>
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  ¿No sabes con quién atenderte?
                </h2>
                <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                  Cuéntanos qué te preocupa y derivamos tu caso al especialista indicado. La primera evaluación no tiene
                  costo.
                </p>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className="mt-8 w-fit">
                  <a
                    href={AGENDA_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusDark}`}
                    style={{ backgroundColor: AMBER }}
                  >
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                    Agendar evaluación gratis
                    <ArrowRight
                      className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, delay: 0.12, ease: EASE_OUT }}
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
                  <HeartPulse className="h-4 w-4 flex-shrink-0" style={{ color: MAGENTA }} aria-hidden="true" />
                  También atendemos urgencias dentales.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}
