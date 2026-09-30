'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  ArrowRight,
  CalendarCheck,
  Zap,
  ThermometerSnowflake,
  AlertCircle,
  Activity,
  Info,
  CheckCircle2,
} from 'lucide-react';
import type { ReactNode } from 'react';

const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

// Paleta de colores de la marca
const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const TEAL_LIGHT = '#22B3CF';
const GREEN_LIGHT = '#8DBF3F';
const MAGENTA_LIGHT = '#E5527B';
const SOFT = '#F6F9FD';

const AGENDA_HREF = 'http://agendar.clinicadignidad.cl/agendar';
const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';

const sintomas = [
  { icon: Zap, title: '¿Tienes dolor al masticar?', color: TEAL_LIGHT },
  { icon: ThermometerSnowflake, title: '¿Sensibilidad al frío o calor?', color: MAGENTA_LIGHT },
  { icon: AlertCircle, title: '¿Una caries profunda?', color: AMBER },
  { icon: Activity, title: '¿Inflamación o molestias en un diente?', color: GREEN_LIGHT },
];

/** Botón ámbar reutilizado de la página principal */
function AmberLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center justify-center gap-2 rounded-full font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] px-8 py-4 text-[15px] ${focusDark}`}
        style={{ backgroundColor: AMBER }}
      >
        {children}
      </a>
    </motion.div>
  );
}

export default function FonasaPage() {
  return (
    <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white pt-20 pb-28 md:pt-28 md:pb-32">
        {/* Resplandores de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[460px] w-[460px] rounded-full bg-[#B01C48]/20 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
        </div>

        <div className="mx-auto max-w-[1000px] px-4 md:px-8 text-center">
          {/* Logo Fonasa con contenedor blanco para resaltar sobre el fondo oscuro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mb-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
          >
            <Image 
              src="/fonasa.jpg" 
              alt="Logo Fonasa" 
              width={130} 
              height={45} 
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl md:text-5xl lg:text-[56px] font-black leading-[1.1] tracking-tight"
          >
            ¿Necesitas un tratamiento de conducto y eres <span className="text-[#FDB92B]">FONASA</span>?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mx-auto mt-8 max-w-2xl text-lg md:text-xl font-medium leading-relaxed text-slate-300"
          >
            Si tienes entre <span className="text-white font-bold">12 y 34 años</span> y eres beneficiario/a de <span className="text-white font-bold">FONASA B, C o D</span>, esta información puede ser importante para ti.
          </motion.p>
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

      {/* ================= REQUISITOS Y DIAGNÓSTICO ================= */}
      <section className="relative px-4 py-16 md:px-8 md:py-24" style={{ backgroundColor: SOFT }}>
        <div className="mx-auto max-w-[1200px]">
          
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            {/* Columna Izquierda: Cobertura */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] bg-white p-8 md:p-12 shadow-[0_20px_50px_-12px_rgba(7,27,58,0.1)] border border-slate-100"
            >
              {/* Logo integrado directamente en la tarjeta blanca */}
              <div className="relative mb-6 h-12 w-36">
                <Image 
                  src="/fonasa.png" 
                  alt="Logo Fonasa" 
                  fill
                  sizes="144px"
                  className="object-contain object-left" 
                />
              </div>
              <h2 className="text-3xl font-black text-[#071B3A] leading-tight mb-4">
                Cobertura
              </h2>
              <p className="text-[17px] text-slate-600 leading-relaxed mb-6">
                El tratamiento de conducto (endodoncia) puede estar cubierto por FONASA cuando se cumplen los requisitos correspondientes de la prestación.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#8DBF3F] flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] font-bold text-[#071B3A]">Tener entre 12 y 34 años de edad.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#8DBF3F] flex-shrink-0 mt-0.5" />
                  <span className="text-[15px] font-bold text-[#071B3A]">Estar afiliado a FONASA tramo B, C o D.</span>
                </li>
              </ul>
            </motion.div>

            {/* Columna Derecha: El "Ojo" */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] bg-[#FFF8EB] border-2 border-[#FDB92B]/30 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 opacity-10">
                <Info className="h-48 w-48 text-[#FDB92B]" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="h-8 w-8 text-[#FDB92B]" />
                  <span className={`${scriptFont.className} text-3xl text-[#071B3A]`}>Pero ojo...</span>
                </div>
                <h3 className="text-2xl font-black text-[#071B3A] leading-tight mb-4">
                  No todas las personas califican automáticamente.
                </h3>
                <p className="text-[17px] text-slate-700 leading-relaxed font-medium">
                  Primero es necesario realizar una evaluación odontológica profesional para determinar el diagnóstico exacto de tu pieza dental y confirmar si cumple con los criterios clínicos exigidos por FONASA.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= SÍNTOMAS ================= */}
      <section className="bg-white py-20 md:py-28 px-4 md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#071B3A] tracking-tight">
              ¿Identificas alguno de estos síntomas?
            </h2>
            <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Las molestias dentales son la primera señal de alerta. Presta atención a lo que sientes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sintomas.map((sintoma, i) => {
              const Icon = sintoma.icon;
              return (
                <motion.div
                  key={sintoma.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="rounded-[24px] border border-slate-100 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-center group"
                >
                  <div 
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl mb-6 transition-transform group-hover:-translate-y-1"
                    style={{ backgroundColor: `${sintoma.color}20`, color: sintoma.color }}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-[#071B3A] leading-snug">
                    {sintoma.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="px-4 pb-12 md:px-8 md:pb-24 bg-white">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#071B3A] px-6 py-16 md:px-16 md:py-24 text-center">
            {/* Elementos decorativos */}
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#0A9BB8]/20 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-[#B01C48]/20 blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                No esperes a que el <span className="text-[#E5527B]">dolor empeore.</span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 font-medium mb-10 max-w-xl">
                Agenda tu evaluación hoy mismo. Un especialista revisará tu caso para determinar tu diagnóstico y confirmar si aplicas al beneficio FONASA.
              </p>
              
              <AmberLink href={AGENDA_HREF} className="w-full sm:w-auto">
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Agendar mi evaluación
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </AmberLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}