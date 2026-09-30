'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  Calculator,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Smile,
  Sparkles,
  HeartPulse,
  Info,
  CalendarCheck,
  CheckCircle2,
  Activity,
  Bone,
  Star,
  Syringe,
  Droplets
} from 'lucide-react';
import type { ReactNode } from 'react';

const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const SOFT = '#F6F9FD';
const AGENDA_HREF = 'http://agendar.clinicadignidad.cl/agendar';

type TreatmentData = {
  id: string;
  name: string;
  basePrice: number;
  fonasaPrice?: number;
  perTooth: boolean;
  hasFonasaBenefit: boolean;
  icon: any;
};

// Datos expandidos cruzados con los aranceles base de la clínica
const treatments: Record<string, TreatmentData> = {
  evaluacion: { id: 'evaluacion', name: 'Evaluación', basePrice: 0, perTooth: false, hasFonasaBenefit: false, icon: Stethoscope },
  limpieza: { id: 'limpieza', name: 'Limpieza', basePrice: 19990, perTooth: false, hasFonasaBenefit: false, icon: Sparkles },
  caries: { id: 'caries', name: 'Tapaduras (Caries)', basePrice: 28000, perTooth: true, hasFonasaBenefit: false, icon: ShieldCheck },
  endodoncia: { id: 'endodoncia', name: 'Trat. de conducto', basePrice: 102000, fonasaPrice: 80050, perTooth: true, hasFonasaBenefit: true, icon: Activity },
  extraccion: { id: 'extraccion', name: 'Extracción', basePrice: 40000, perTooth: true, hasFonasaBenefit: false, icon: Syringe },
  corona: { id: 'corona', name: 'Corona Dental', basePrice: 55000, perTooth: true, hasFonasaBenefit: false, icon: Star },
  implante: { id: 'implante', name: 'Implante', basePrice: 139990, perTooth: true, hasFonasaBenefit: false, icon: Bone },
  protesis: { id: 'protesis', name: 'Prótesis', basePrice: 56650, perTooth: false, hasFonasaBenefit: false, icon: HeartPulse },
  brackets: { id: 'brackets', name: 'Brackets', basePrice: 145000, perTooth: false, hasFonasaBenefit: false, icon: Smile },
  blanqueamiento: { id: 'blanqueamiento', name: 'Blanqueamiento', basePrice: 53000, perTooth: false, hasFonasaBenefit: false, icon: Droplets },
  carillas: { id: 'carillas', name: 'Carillas', basePrice: 67000, perTooth: true, hasFonasaBenefit: false, icon: Sparkles },
  sellante: { id: 'sellante', name: 'Flúor/Sellante', basePrice: 13000, perTooth: false, hasFonasaBenefit: false, icon: CheckCircle2 },
};

function AmberLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] px-8 py-4 text-[15px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2"
        style={{ backgroundColor: AMBER }}
      >
        {children}
      </a>
    </motion.div>
  );
}

export default function CalculadoraPage() {
  const [treatmentId, setTreatmentId] = useState<string | null>(null);
  const [teeth, setTeeth] = useState<number>(0); // Iniciamos en 0 para bloquear el flujo hasta que elija una cantidad
  const [fonasa, setFonasa] = useState<'si' | 'no' | null>(null);

  const currentTreatment = treatmentId ? treatments[treatmentId] : null;
  const showTeethStep = currentTreatment?.perTooth;
  
  // Mostrar paso Fonasa SOLO si el tratamiento tiene el beneficio y (si requiere dientes, ya se eligió cantidad)
  const showFonasaStep = currentTreatment?.hasFonasaBenefit && (!showTeethStep || teeth > 0);
  
  // Mostrar el resultado:
  // 1. Si tiene Fonasa, esperamos a que responda (fonasa !== null).
  // 2. Si no tiene Fonasa, saltamos directo luego de que elija los dientes o el tratamiento.
  const showResult = currentTreatment 
    ? (currentTreatment.hasFonasaBenefit 
        ? fonasa !== null 
        : (!showTeethStep || teeth > 0))
    : false;

  // Hacer scroll automático al resultado
  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        document.getElementById('resultado-calculo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [showResult]);

  const calculateTotal = () => {
    if (!currentTreatment) return 0;
    const price = fonasa === 'si' && currentTreatment.fonasaPrice ? currentTreatment.fonasaPrice : currentTreatment.basePrice;
    return price * (currentTreatment.perTooth ? Math.max(1, teeth) : 1);
  };

  return (
    <main className={`${mainFont.className} flex min-h-screen flex-col bg-white pb-24`}>
      {/* ===== HERO COMPACTO ===== */}
      <section className="bg-[#071B3A] pt-12 pb-16 px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#FDB92B] backdrop-blur-md"
          >
            <Calculator className="h-8 w-8" />
          </motion.div>
          <h1 className="text-3xl font-black text-white md:text-5xl tracking-tight leading-tight">
            Calcula tu tratamiento
          </h1>
          <p className="mt-4 text-lg text-slate-300 font-medium max-w-xl mx-auto">
            Selecciona lo que necesitas y obtén una estimación inicial al instante.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-5xl px-4 md:px-8 -mt-8 relative z-10">
        <div className="rounded-[2.5rem] bg-white p-6 md:p-12 shadow-[0_20px_50px_-12px_rgba(7,27,58,0.1)] border border-slate-100">
          
          {/* ----- PASO 1: TRATAMIENTO ----- */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#071B3A] mb-5 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A9BB8] text-sm text-white">1</span>
              ¿Qué necesitas?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.values(treatments).map((t) => {
                const Icon = t.icon;
                const isSelected = treatmentId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTreatmentId(t.id);
                      setFonasa(null); // Resetear los pasos siguientes
                      setTeeth(t.perTooth ? 0 : 1); // Si es por diente exigimos elegir la cantidad, si no se llena con 1
                    }}
                    className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
                      isSelected
                        ? 'border-[#0A9BB8] bg-[#0A9BB8]/5 shadow-md'
                        : 'border-slate-100 bg-white hover:border-[#0A9BB8]/40 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`h-7 w-7 ${isSelected ? 'text-[#0A9BB8]' : 'text-slate-400'}`} />
                    <span className={`text-[15px] font-bold leading-tight ${isSelected ? 'text-[#071B3A]' : 'text-slate-600'}`}>
                      {t.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence>
            {/* ----- PASO 2: CANTIDAD DE DIENTES (Condicional) ----- */}
            {showTeethStep && (
              <motion.div
                key="paso-dientes"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 overflow-hidden"
              >
                <h2 className="text-xl font-bold text-[#071B3A] mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A9BB8] text-sm text-white">2</span>
                  ¿Cuántos dientes?
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setTeeth(num)}
                      className={`h-14 w-16 md:w-20 rounded-2xl border-2 text-lg font-black transition-colors ${
                        teeth === num
                          ? 'border-[#0A9BB8] bg-[#0A9BB8] text-white shadow-md'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-[#0A9BB8]/40'
                      }`}
                    >
                      {num}{num === 4 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ----- PASO 3: FONASA (Condicional) ----- */}
            {showFonasaStep && (
              <motion.div
                key="paso-fonasa"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 overflow-hidden"
              >
                <h2 className="text-xl font-bold text-[#071B3A] mb-5 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0A9BB8] text-sm text-white">
                    {showTeethStep ? '3' : '2'}
                  </span>
                  ¿Tienes FONASA?
                </h2>
                <div className="flex gap-4">
                  {(['si', 'no'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFonasa(opt)}
                      className={`flex-1 md:flex-none md:w-32 py-4 rounded-2xl border-2 text-lg font-bold capitalize transition-colors ${
                        fonasa === opt
                          ? 'border-[#FDB92B] bg-[#FFF8EB] text-[#071B3A] shadow-md'
                          : 'border-slate-100 bg-white text-slate-500 hover:border-[#FDB92B]/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ----- RESULTADO ----- */}
        <AnimatePresence>
          {showResult && currentTreatment && (
            <motion.div
              key="resultado-calculo"
              id="resultado-calculo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8"
            >
              {/* Alerta de Beneficio FONASA */}
              {fonasa === 'si' && currentTreatment.hasFonasaBenefit && (
                <div className="mb-6 overflow-hidden rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="bg-[#0A9BB8] px-6 py-3 flex items-center gap-2 text-white font-bold">
                    <ShieldCheck className="h-5 w-5" />
                    Beneficio FONASA
                  </div>
                  <div className="p-6 md:flex md:items-center md:justify-between">
                    <p className="text-slate-700 font-medium leading-relaxed max-w-xl">
                      Este tratamiento podría contar con una prestación FONASA dependiendo de tu edad, diagnóstico y condiciones de cobertura.
                    </p>
                    <Link
                      href="/fonasa"
                      className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-[#0A9BB8] font-bold hover:underline"
                    >
                      Ver requisitos FONASA <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              )}

              {/* Tarjeta de Estimación */}
              <div className="overflow-hidden rounded-[2.5rem] bg-[#071B3A] shadow-2xl">
                <div className="p-8 md:p-12 md:flex md:items-center md:justify-between gap-10">
                  <div className="text-white space-y-4 flex-1">
                    <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-white tracking-widest uppercase mb-2">
                      Tu estimación inicial
                    </div>
                    
                    <ul className="space-y-2 pb-4 border-b border-white/10">
                      <li className="flex justify-between items-center text-lg">
                        <span className="text-slate-400 font-medium">Tratamiento:</span>
                        <span className="font-bold">{currentTreatment.name}</span>
                      </li>
                      {currentTreatment.perTooth && (
                        <li className="flex justify-between items-center text-lg">
                          <span className="text-slate-400 font-medium">Cantidad:</span>
                          <span className="font-bold">{teeth} {teeth === 1 ? 'diente' : 'dientes'} {teeth === 4 ? 'o más' : ''}</span>
                        </li>
                      )}
                      
                      {currentTreatment.basePrice > 0 && (
                        <li className="flex justify-between items-center text-lg">
                          <span className="text-slate-400 font-medium">Modalidad:</span>
                          <span className="font-bold">{fonasa === 'si' ? 'FONASA' : 'Particular'}</span>
                        </li>
                      )}
                    </ul>

                    <div>
                      <span className="block text-slate-400 font-medium mb-1">
                        {currentTreatment.basePrice > 0 ? 'Valor estimado desde:' : 'Valor de la evaluación:'}
                      </span>
                      <div className="flex items-baseline gap-2">
                        {currentTreatment.basePrice === 0 ? (
                          <span className="text-4xl md:text-5xl font-black text-[#FDB92B] tracking-tight uppercase">
                            GRATIS
                          </span>
                        ) : (
                          <span className="text-4xl md:text-5xl font-black text-[#FDB92B] tracking-tight">
                            ${calculateTotal().toLocaleString('es-CL')} {teeth === 4 && '+'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 md:mt-0 md:w-[340px] flex-shrink-0 bg-white/5 rounded-3xl p-6 border border-white/10 text-center">
                    <Info className="h-8 w-8 text-[#0A9BB8] mx-auto mb-3" />
                    <p className="text-[14.5px] text-slate-300 font-medium mb-6 leading-relaxed">
                      Todos los precios están sujetos a previa evaluación por el especialista, la cual es totalmente gratuita.
                    </p>
                    <AmberLink href={AGENDA_HREF} className="w-full">
                      <CalendarCheck className="h-5 w-5" />
                      AGENDAR EVALUACIÓN
                    </AmberLink>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}