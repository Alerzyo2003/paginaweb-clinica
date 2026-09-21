'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import { 
  ArrowRight, 
  CalendarCheck, 
  CheckCircle2, 
  Smile, 
  Sparkles, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  HeartPulse,
  Star
} from 'lucide-react';

// --- FUENTES Y COLORES ---
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';
const GREEN = '#6B9A2A'; 
const MAGENTA = '#B01C48'; 

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const WHATSAPP_HREF = 'https://wa.me/56966467641';

const focusLight = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';


const easeOut = [0.22, 1, 0.36, 1] as const;

const revealUp = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: easeOut,
    },
  }),
};

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export default function EsteticaDentalPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
      
      {/* ================= HERO SECCIÓN ================= */}
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
        {/* Efectos de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#B01C48]/20 blur-3xl"
            animate={{ x: [0, 34, -12, 0], y: [0, 18, 42, 0], scale: [1, 1.08, 0.97, 1] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FDB92B]/15 blur-3xl"
            animate={{ x: [0, -28, 16, 0], y: [0, -22, 16, 0], scale: [1, 0.94, 1.06, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 opacity-[0.07]"
            animate={{ backgroundPosition: ['0px 0px', '28px 28px'] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
          />
        </div>

        <div className="mx-auto max-w-[1300px] px-4 py-16 md:px-8 md:py-24 lg:flex lg:items-center lg:gap-16">
          {/* Texto Hero */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="lg:w-1/2"
          >
            <motion.span
              variants={revealUp}
              custom={0}
              className="inline-flex items-center gap-2 rounded-full border border-[#B01C48]/30 bg-[#B01C48]/10 px-4 py-1.5 text-[13px] font-bold text-[#f2416f] backdrop-blur"
            >
              <Sparkles className="h-4 w-4" /> Especialidad Estética
            </motion.span>
            <motion.h1
              variants={revealUp}
              custom={1}
              className="mt-6 text-[42px] font-black leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]"
            >
              Estética Dental y <br/>
              <motion.span
                className="inline-block text-[#FDB92B]"
                animate={{ textShadow: ['0 0 0 rgba(253,185,43,0)', '0 0 24px rgba(253,185,43,.28)', '0 0 0 rgba(253,185,43,0)'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Diseño de Sonrisa
              </motion.span>
            </motion.h1>
            <motion.p variants={revealUp} custom={2} className="mt-6 text-lg font-medium leading-relaxed text-slate-300 max-w-lg">
              Potencia la belleza natural de tu sonrisa. Combinamos arte, armonía facial y tecnología adhesiva de vanguardia para que proyectes seguridad al sonreír.
            </motion.p>
            <motion.div variants={revealUp} custom={3} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#agenda"
                className={`flex items-center gap-2 rounded-full px-8 py-4 text-[15px] font-extrabold text-[#071B3A] shadow-lg transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                style={{ backgroundColor: AMBER }}
              >
                <CalendarCheck className="h-5 w-5" />
                Agendar evaluación
              </Link>
              <Link
                href="/equipo"
                className="flex items-center gap-2 rounded-full border-2 border-white/20 px-8 py-4 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
              >
                Ver especialistas
              </Link>
            </motion.div>
          </motion.div>

          {/* Imagen Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.75, delay: 0.18, ease: "easeOut" },
              scale: { duration: 0.75, delay: 0.18, ease: "easeOut" },
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            }}
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -3 }}
            className="mt-12 lg:mt-0 lg:w-1/2 relative [perspective:1200px]"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto rounded-full bg-gradient-to-tr from-[#B01C48] via-[#0A9BB8] to-[#071B3A] p-2 shadow-2xl">
              <motion.div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-[#f2416f]/30"
                animate={{ rotate: 360, scale: [1, 1.025, 1] }}
                transition={{
                  rotate: { duration: 18, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                aria-hidden="true"
                className="absolute inset-2 rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#071B3A]">
                <Image 
                  src="/especialidades/estetica-dental.png" 
                  alt="Sonrisa radiante gracias a estética dental"
                  fill
                  className="object-cover"
                />
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  animate={{ x: ['-120%', '120%'] }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.2, ease: "easeInOut" }}
                  style={{ transform: 'skewX(-18deg)' }}
                />
              </div>
              {/* Badge flotante */}
              <motion.div
                className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl md:-left-8"
                animate={{ y: [0, -6, 0], rotate: [-3, -1, -3] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.04, rotate: 0 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fdf2f4] text-[#B01C48]">
                    <Star className="h-6 w-6 fill-current" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500">Transformación</p>
                    <p className="text-lg font-black text-[#071B3A]">Natural y Armónica</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENEFICIOS ================= */}
      <section className="py-20 md:py-28 bg-[#F6F9FD]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Detalles que marcan la diferencia</h2>
            <p className="text-slate-600 text-lg">La estética dental no solo busca embellecer, sino cuidar la salud de tus dientes mediante tratamientos seguros y mínimamente invasivos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Armonía Facial", desc: "Estudiamos la forma de tu rostro, labios y encías para que tu nueva sonrisa luzca perfecta y completamente natural.", icon: Smile, color: MAGENTA },
              { title: "Técnicas Conservadoras", desc: "Priorizamos el resguardo del tejido dental sano mediante odontología adhesiva de última generación.", icon: ShieldCheck, color: TEAL },
              { title: "Autoestima y Seguridad", desc: "Sonríe sin complejos en reuniones, fotografías y en tu día a día, proyectando confianza absoluta.", icon: Sparkles, color: AMBER },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={revealUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-slate-200 hover:shadow-[0_24px_50px_-24px_rgba(7,27,58,.45)]"
              >
                <motion.span
                  aria-hidden="true"
                  className="absolute -right-14 -top-14 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ backgroundColor: `${item.color}30` }}
                />
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.08 }}
                  className="relative z-10 h-14 w-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  <item.icon className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-black text-[#071B3A] mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TIPOS DE TRATAMIENTOS ================= */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="mb-16 md:flex md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Tratamientos Estéticos Principales</h2>
              <p className="text-slate-600 text-lg">Descubre las soluciones avanzadas que tenemos para devolver el brillo, color y forma ideal a tus dientes.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Opción 1: Blanqueamiento */}
            <motion.div
              variants={revealUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -9, rotateX: 1.5, rotateY: -1.5 }}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-slate-100 p-8 transition-colors hover:border-[#B01C48] [transform-style:preserve-3d]"
            >
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Blanqueamiento Dental</h3>
              <p className="text-[#B01C48] font-bold text-sm uppercase tracking-wider mb-4">Luminosidad y Brillo</p>
              <p className="text-slate-600 mb-6">Elimina las manchas provocadas por el café, té o el paso del tiempo con tecnología LED de alta gama y geles seguros que cuidan tu esmalte.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#B01C48] h-5 w-5 shrink-0" /> Resultados visibles en una sesión</li>
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#B01C48] h-5 w-5 shrink-0" /> Protección anti-sensibilidad</li>
              </ul>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                animate={{ x: ['0%', '320%'] }}
                transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                style={{ transform: 'skewX(-18deg)' }}
              />
            </motion.div>

            {/* Opción 2: Carillas */}
            <motion.div
              variants={revealUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -9, rotateX: 1.5, rotateY: 1.5 }}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-slate-100 p-8 transition-colors hover:border-[#B01C48] [transform-style:preserve-3d]"
            >
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Carillas de Resina o Porcelana</h3>
              <p className="text-[#B01C48] font-bold text-sm uppercase tracking-wider mb-4">Forma y Color Perfectos</p>
              <p className="text-slate-600 mb-6">Finas láminas que se adhieren a la parte frontal del diente para corregir fracturas, espacios entre dientes (diastemas) o desgaste severo.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#B01C48] h-5 w-5 shrink-0" /> Diseño de sonrisa a medida</li>
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#B01C48] h-5 w-5 shrink-0" /> Materiales ultrarresistentes</li>
              </ul>
              <motion.span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent"
                animate={{ x: ['0%', '320%'] }}
                transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 4.7, ease: "easeInOut" }}
                style={{ transform: 'skewX(-18deg)' }}
              />
            </motion.div>

            {/* Opción 3: Rehabilitación Adhesiva Estética */}
            <motion.div
              variants={revealUp}
              custom={2}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -9, scale: 1.015 }}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-[#FDB92B] bg-[#FFFBF0] p-8 shadow-lg"
            >
              <div className="absolute top-0 right-0 bg-[#FDB92B] text-[#071B3A] text-xs font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Especializado</div>
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Rehabilitación Adhesiva</h3>
              <p className="text-[#FDB92B] font-black text-sm uppercase tracking-wider mb-4">Estética y Función</p>
              <p className="text-slate-700 mb-6">Restauraciones estéticas avanzadas con tecnología adhesiva para devolver la estructura perdida de los dientes posteriores y anteriores de forma impecable.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-800 font-bold"><CheckCircle2 className="text-[#FDB92B] h-5 w-5 shrink-0" /> Mínimamente invasivo</li>
                <li className="flex gap-2 text-slate-800 font-bold"><CheckCircle2 className="text-[#FDB92B] h-5 w-5 shrink-0" /> Estética de alta gama</li>
              </ul>
              <motion.div
                aria-hidden="true"
                className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-[#FDB92B]/10 blur-2xl"
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="bg-white px-3 py-6 md:px-6 md:py-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#B01C48]/20 blur-3xl"
            animate={{ x: [0, -24, 10, 0], y: [0, 18, -8, 0], scale: [1, 1.08, 0.98, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                Dale a tu sonrisa el brillo que se merece
              </h2>
              <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                Reserva tu evaluación estética hoy mismo. Evaluaremos tus opciones ideales para lograr una sonrisa armónica y deslumbrante.
              </p>
              <motion.p
                className={`${scriptFont.className} mt-8 text-4xl leading-tight text-[#f2416f]`}
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                Que sonreír sea costumbre
              </motion.p>
            </motion.div>

            <motion.div
              variants={revealUp}
              custom={1}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10"
            >
              <p className="text-sm font-bold text-slate-500">Reserva directa</p>
              <a
                href={PHONE_HREF}
                className={`mt-1 block rounded text-3xl font-black tracking-tight text-[#071B3A] hover:text-[#B01C48] md:text-4xl ${focusLight}`}
              >
                {PHONE_LABEL}
              </a>
              <div className="mt-7 flex flex-col gap-3">
                <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={PHONE_HREF}
                    className={`flex items-center justify-center gap-2 rounded-full py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                    style={{ backgroundColor: AMBER }}
                  >
                    <Phone className="h-5 w-5" />
                    Llamar para agendar
                  </a>
                </motion.div>
                <motion.div whileHover={{ y: -3, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 rounded-full border-2 border-[#071B3A] py-3.5 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#071B3A] hover:text-white ${focusLight}`}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Consultar por WhatsApp
                  </a>
                </motion.div>
              </div>
              <p className="mt-5 flex items-center gap-2 text-[13px] font-semibold text-slate-500">
                <motion.span
                  animate={{ scale: [1, 1.16, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <HeartPulse className="h-4 w-4 flex-shrink-0" style={{ color: MAGENTA }} />
                </motion.span>
                Nuestro especialista Dr. Pedro Chacón te espera.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      </main>
    </MotionConfig>
  );
}