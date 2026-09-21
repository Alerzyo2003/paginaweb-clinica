'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import type { PointerEvent } from 'react';
import { 
  ArrowRight, 
  CalendarCheck, 
  CheckCircle2, 
  Smile, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  HeartPulse 
} from 'lucide-react';

// --- FUENTES Y COLORES (Manteniendo la identidad de la marca) ---
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const MAGENTA = '#B01C48';

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const WHATSAPP_HREF = 'https://wa.me/56966467641';

const focusLight = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

export default function OrtodonciaPage() {
  const heroRotateX = useMotionValue(0);
  const heroRotateY = useMotionValue(0);
  const springX = useSpring(heroRotateX, { stiffness: 220, damping: 22 });
  const springY = useSpring(heroRotateY, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(springY, [-25, 25], [5, -5]);
  const rotateY = useTransform(springX, [-25, 25], [-5, 5]);

  const handleHeroPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 30;
    heroRotateX.set(x);
    heroRotateY.set(y);
  };

  const resetHeroPointer = () => {
    heroRotateX.set(0);
    heroRotateY.set(0);
  };

  const reveal = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay: i * 0.09,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const benefits = [
    { title: 'Estética y Confianza', desc: 'Logra la sonrisa que siempre has querido, mejorando tu autoestima y seguridad al hablar o sonreír.', icon: Smile, color: TEAL },
    { title: 'Salud Dental', desc: 'Los dientes alineados son más fáciles de limpiar, reduciendo drásticamente el riesgo de caries y sarro.', icon: ShieldCheck, color: AMBER },
    { title: 'Función Masticatoria', desc: 'Corrige problemas de mordida, previniendo el desgaste prematuro de los dientes y dolores articulares.', icon: CheckCircle2, color: NAVY },
  ];

  const treatments = [
    {
      title: 'Brackets Metálicos',
      eyebrow: 'Tradicionales y Efectivos',
      desc: 'El sistema más clásico. Son altamente resistentes, eficaces para cualquier tipo de maloclusión y suelen ser la opción más económica.',
      items: ['Alta resistencia', 'Resultados rápidos'],
      featured: false,
    },
    {
      title: 'Brackets Estéticos',
      eyebrow: 'Zafiro o Cerámica',
      desc: 'Funcionan igual que los metálicos, pero se mimetizan con el color del diente, haciéndolos mucho menos perceptibles a la vista.',
      items: ['Muy discretos', 'No se manchan fácilmente'],
      featured: false,
    },
    {
      title: 'Ortodoncia Invisible',
      eyebrow: 'Alineadores Transparentes',
      desc: 'La opción más moderna. Son placas transparentes removibles hechas a medida con tecnología 3D. Prácticamente invisibles y muy cómodos.',
      items: ['100% Estéticos', 'Removibles para comer'],
      featured: true,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
        {/* ================= HERO ================= */}
        <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -24, 0], y: [0, 24, 0], scale: [1, 1.06, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[-60px] bottom-[-40px] h-[420px] w-[420px] rounded-full bg-[#FDB92B]/15 blur-3xl"
            />
            <motion.div
              animate={{ opacity: [0.04, 0.1, 0.04] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
          </div>

          <div className="mx-auto max-w-[1300px] px-4 py-16 md:px-8 md:py-24 lg:flex lg:items-center lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2"
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#0A9BB8]/30 bg-[#0A9BB8]/10 px-4 py-1.5 text-[13px] font-bold text-[#22B3CF] backdrop-blur"
              >
                <Sparkles className="h-4 w-4" />
                Especialidad Dental
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-[42px] font-black leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
              >
                Ortodoncia y{' '}
                <span className="relative inline-block text-[#FDB92B]">
                  Ortopedia
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-0 h-1 w-full origin-left rounded-full bg-[#FDB92B]"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.65 }}
                className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300"
              >
                Alineamos tus dientes y corregimos tu mordida para que disfrutes de una sonrisa estética, funcional y saludable. Tratamientos personalizados para niños, adolescentes y adultos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.65 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.div whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/#agenda"
                    className={`group flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-lg transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                    style={{ backgroundColor: AMBER }}
                  >
                    <CalendarCheck className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg]" />
                    Agendar evaluación
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/equipo"
                    className="group flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
                  >
                    Ver especialistas
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Imagen hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-12 lg:mt-0 lg:w-1/2"
              onPointerMove={handleHeroPointerMove}
              onPointerLeave={resetHeroPointer}
            >
              <motion.div
                style={{ rotateX, rotateY }}
                className="relative mx-auto aspect-square max-w-[500px]"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-12px] rounded-full border border-[#22B3CF]/30"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[-24px] rounded-full border border-[#FDB92B]/15"
                />

                <motion.div
                  whileHover={{ scale: 1.025 }}
                  className="relative h-full w-full rounded-full bg-gradient-to-tr from-[#0A9BB8] via-[#22B3CF] to-[#071B3A] p-2 shadow-[0_30px_80px_-20px_rgba(10,155,184,0.55)]"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-[#071B3A] bg-[#E8F0FA]">
                    <Image
                      src="/especialidades/ortodoncia.png"
                      alt="Paciente feliz con tratamiento de ortodoncia"
                      fill
                      priority
                      sizes="(min-width: 1024px) 500px, 90vw"
                      className="object-cover transition-transform duration-1000 ease-out hover:scale-[1.06]"
                    />
                    <motion.div
                      animate={{ x: ['-130%', '130%'] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.2, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
                    />
                  </div>

                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl md:-left-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F0FA] text-[#0A9BB8]">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500">Ortodoncia</p>
                        <p className="text-lg font-black text-[#071B3A]">A tu medida</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= BENEFICIOS ================= */}
        <section className="bg-[#F6F9FD] py-20 md:py-28">
          <div className="mx-auto max-w-[1300px] px-4 md:px-8">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mx-auto mb-16 max-w-2xl text-center"
            >
              <h2 className="mb-4 text-3xl font-black text-[#071B3A] md:text-4xl">
                ¿Por qué realizarte un tratamiento de Ortodoncia?
              </h2>
              <p className="text-lg text-slate-600">
                Más allá de la estética, una mordida correcta previene múltiples problemas de salud bucal y general a largo plazo.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((item, i) => (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -8, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 220, damping: 18 }}
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <item.icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                  </motion.div>
                  <h3 className="mb-3 text-xl font-black text-[#071B3A]">{item.title}</h3>
                  <p className="leading-relaxed text-slate-600">{item.desc}</p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 h-1 w-full origin-left"
                    style={{ backgroundColor: item.color }}
                  />
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRATAMIENTOS ================= */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-[1300px] px-4 md:px-8">
            <motion.div
              variants={reveal}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mb-16 max-w-2xl"
            >
              <h2 className="mb-4 text-3xl font-black text-[#071B3A] md:text-4xl">Tecnología a tu medida</h2>
              <p className="text-lg text-slate-600">
                En Clínica Dignidad trabajamos con diferentes sistemas de ortodoncia para adaptarnos a tus necesidades estéticas y presupuesto.
              </p>
            </motion.div>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
              {treatments.map((item, i) => (
                <motion.article
                  key={item.title}
                  variants={reveal}
                  custom={i}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  whileHover={{ y: -8, rotateX: 2, rotateY: i === 0 ? -1.5 : i === 2 ? 1.5 : 0 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                  className={`group relative overflow-hidden rounded-[2rem] border-2 p-8 ${
                    item.featured
                      ? 'border-[#FDB92B] bg-[#FFFBF0] shadow-[0_24px_55px_-25px_rgba(253,185,43,0.45)]'
                      : 'border-slate-100 bg-white'
                  }`}
                >
                  {item.featured && (
                    <motion.div
                      animate={{ x: ['-130%', '130%'] }}
                      transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/4 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />
                  )}

                  {item.featured && (
                    <div className="absolute right-0 top-0 rounded-bl-xl bg-[#FDB92B] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#071B3A]">
                      Premium
                    </div>
                  )}

                  <div className="relative z-10">
                    <h3 className="mb-2 text-2xl font-black text-[#071B3A]">{item.title}</h3>
                    <p className={`mb-4 text-sm font-black uppercase tracking-wider ${item.featured ? 'text-[#B48300]' : 'text-[#0A9BB8]'}`}>
                      {item.eyebrow}
                    </p>
                    <p className="mb-6 text-slate-600">{item.desc}</p>
                    <ul className="mb-8 space-y-3">
                      {item.items.map((bullet) => (
                        <motion.li
                          key={bullet}
                          whileHover={{ x: 5 }}
                          className="flex gap-2 font-medium text-slate-700"
                        >
                          <CheckCircle2
                            className={`h-5 w-5 shrink-0 ${item.featured ? 'text-[#FDB92B]' : 'text-[#0A9BB8]'}`}
                          />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className={`inline-flex items-center gap-2 text-sm font-extrabold ${
                        item.featured ? 'text-[#071B3A]' : 'text-[#0A9BB8]'
                      }`}
                    >
                      Conoce esta opción <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section className="bg-white px-3 py-6 md:px-6 md:py-10">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
            <motion.div
              animate={{ x: [0, -18, 0], y: [0, 18, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#0A9BB8]/20 blur-3xl"
            />

            <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
              <motion.div
                variants={reveal}
                custom={0}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                  Inicia tu viaje hacia una sonrisa perfecta
                </h2>
                <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                  Reserva tu hora de evaluación. Nuestros especialistas estudiarán tu caso y te presentarán el plan de tratamiento ideal para ti.
                </p>
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7], x: [0, 4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`${scriptFont.className} mt-8 text-4xl leading-tight text-[#22B3CF]`}
                >
                  Que sonreír sea costumbre
                </motion.p>
              </motion.div>

              <motion.div
                variants={reveal}
                custom={1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10"
              >
                <p className="text-sm font-bold text-slate-500">Reserva directa</p>
                <a
                  href={PHONE_HREF}
                  className={`mt-1 block rounded text-3xl font-black tracking-tight text-[#071B3A] hover:text-[#0A9BB8] md:text-4xl ${focusLight}`}
                >
                  {PHONE_LABEL}
                </a>

                <div className="mt-7 flex flex-col gap-3">
                  <motion.a
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href={PHONE_HREF}
                    className={`flex items-center justify-center gap-2 rounded-full py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                    style={{ backgroundColor: AMBER }}
                  >
                    <Phone className="h-5 w-5" />
                    Llamar para agendar
                  </motion.a>

                  <motion.a
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] py-3.5 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#071B3A] hover:text-white ${focusLight}`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Consultar por WhatsApp
                  </motion.a>
                </div>

                <p className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-slate-500">
                  <HeartPulse className="h-4 w-4 flex-shrink-0" style={{ color: TEAL }} />
                  Nuestros ortodoncistas Víctor Morgado y Valeska Moraga te esperan.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
