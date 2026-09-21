'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
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
  Activity
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

export default function ImplantologiaPage() {
  return (
    // NOTA: Eliminamos pt-20 para que no haya espacio blanco debajo del Navbar estático
    <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
      
      {/* ================= HERO SECCIÓN ================= */}
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
        {/* Efectos de fondo */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FDB92B]/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="mx-auto max-w-[1300px] px-4 py-16 md:px-8 md:py-24 lg:flex lg:items-center lg:gap-16">
          {/* Texto Hero */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0A9BB8]/30 bg-[#0A9BB8]/10 px-4 py-1.5 text-[13px] font-bold text-[#22B3CF] backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Especialidad Quirúrgica
            </span>
            <h1 className="mt-6 text-[42px] font-black leading-[1.1] tracking-tight md:text-5xl lg:text-[56px]">
              Implantología y <br/>
              <span className="text-[#0A9BB8]">Cirugía Maxilofacial</span>
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed text-slate-300 max-w-lg">
              Recupera la funcionalidad de tu boca y la confianza de tu sonrisa. Utilizamos implantes de titanio biocompatibles y planificación digital para resultados exactos y duraderos.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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
            </div>
          </motion.div>

          {/* Imagen Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mt-12 lg:mt-0 lg:w-1/2 relative"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto rounded-full bg-gradient-to-tr from-[#0A9BB8] to-[#071B3A] p-2 shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#071B3A]">
                {/* SUGERENCIA: Foto de un paciente adulto mayor sonriendo o un especialista revisando un implante */}
                <Image 
                  src="/especialidades/implantologia.png" 
                  alt="Paciente con implantes dentales sonriendo"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white p-4 shadow-xl md:-left-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E8F0FA] text-[#0A9BB8]">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-500">Durabilidad</p>
                    <p className="text-lg font-black text-[#071B3A]">Para toda la vida</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENEFICIOS ================= */}
      <section className="py-20 md:py-28 bg-[#F6F9FD]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">La solución definitiva a la pérdida dental</h2>
            <p className="text-slate-600 text-lg">Los implantes dentales actúan como raíces artificiales, brindando una base sólida y permanente para dientes de reemplazo.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Masticación Segura", desc: "Vuelve a comer tus alimentos favoritos sin miedo a que tu prótesis se mueva o te cause dolor en las encías.", icon: Activity, color: TEAL },
              { title: "Preserva tu Hueso", desc: "Al reemplazar la raíz del diente, el implante estimula el hueso maxilar, evitando el desgaste y envejecimiento facial prematuro.", icon: ShieldCheck, color: NAVY },
              { title: "Aspecto 100% Natural", desc: "Las coronas sobre implantes se diseñan a la medida, imitando la textura, forma y color de tus dientes originales.", icon: Smile, color: AMBER },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  <item.icon className="h-7 w-7" />
                </div>
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
              <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Cirugías de alta precisión</h2>
              <p className="text-slate-600 text-lg">Contamos con pabellones equipados, tecnología de imagen 3D y un equipo de cirujanos maxilofaciales para abordar desde casos simples hasta reconstrucciones completas.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Opción 1: Implante Unitario */}
            <div className="group rounded-[2rem] border-2 border-slate-100 p-8 hover:border-[#0A9BB8] transition-colors">
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Implante Unitario</h3>
              <p className="text-[#0A9BB8] font-bold text-sm uppercase tracking-wider mb-4">Reemplazo Individual</p>
              <p className="text-slate-600 mb-6">Ideal si has perdido uno o pocos dientes. Se coloca un tornillo de titanio por pieza faltante, sin necesidad de desgastar los dientes vecinos sanos.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#0A9BB8] h-5 w-5 shrink-0" /> Conserva dientes adyacentes</li>
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#0A9BB8] h-5 w-5 shrink-0" /> Sensación idéntica al diente natural</li>
              </ul>
            </div>

            {/* Opción 2: Cirugía Maxilofacial */}
            <div className="group rounded-[2rem] border-2 border-slate-100 p-8 hover:border-[#0A9BB8] transition-colors">
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Cirugía Maxilofacial</h3>
              <p className="text-[#0A9BB8] font-bold text-sm uppercase tracking-wider mb-4">Extracciones e Injertos</p>
              <p className="text-slate-600 mb-6">Realizamos extracción de muelas del juicio complejas, regeneración ósea (injertos de hueso) y tratamientos de la articulación temporomandibular (TTM).</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#0A9BB8] h-5 w-5 shrink-0" /> Muelas del juicio sin dolor</li>
                <li className="flex gap-2 text-slate-700 font-medium"><CheckCircle2 className="text-[#0A9BB8] h-5 w-5 shrink-0" /> Preparación para implantes futuros</li>
              </ul>
            </div>

            {/* Opción 3: All on 4 / Prótesis completas */}
            <div className="group rounded-[2rem] border-2 border-[#FDB92B] bg-[#FFFBF0] p-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#FDB92B] text-[#071B3A] text-xs font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-wider">Rehabilitación Total</div>
              <h3 className="text-2xl font-black text-[#071B3A] mb-2">Prótesis sobre Implantes</h3>
              <p className="text-[#FDB92B] font-black text-sm uppercase tracking-wider mb-4">Técnica All-on-4 / All-on-6</p>
              <p className="text-slate-700 mb-6">Si has perdido todos tus dientes, podemos fijar una dentadura completa utilizando solo 4 o 6 implantes estratégicos, devolviendo tu sonrisa en tiempo récord.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex gap-2 text-slate-800 font-bold"><CheckCircle2 className="text-[#FDB92B] h-5 w-5 shrink-0" /> Dentadura fija y estable</li>
                <li className="flex gap-2 text-slate-800 font-bold"><CheckCircle2 className="text-[#FDB92B] h-5 w-5 shrink-0" /> Recuperación rápida de la sonrisa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA FINAL ================= */}
      <section className="bg-white px-3 py-6 md:px-6 md:py-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#0A9BB8]/20 blur-3xl" />
          
          <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                Recupera la confianza plena al sonreír y comer
              </h2>
              <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                Agenda tu diagnóstico quirúrgico. Nuestros especialistas maxilofaciales evaluarán tu estructura ósea con imágenes 3D para diseñar tu tratamiento ideal.
              </p>
              <p className={`${scriptFont.className} mt-8 text-4xl leading-tight text-[#22B3CF]`}>
                Que sonreír sea costumbre
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10">
              <p className="text-sm font-bold text-slate-500">Reserva directa</p>
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
                    <Phone className="h-5 w-5" />
                    Llamar para agendar
                  </a>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
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
              <p className="mt-5 flex items-start gap-2 text-[13px] font-semibold text-slate-500">
                <HeartPulse className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: TEAL }} />
                Nuestros cirujanos Dr. Ariel Zivov, Dra. Nathalia Peñaloza, Dr. Jaime Salazar y Dr. Diego Torrijos te esperan.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}