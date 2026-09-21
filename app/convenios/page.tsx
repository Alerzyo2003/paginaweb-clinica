'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import { 
  Building2, 
  CheckCircle2, 
  ChevronDown, 
  Mail, 
  Phone, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  HeartHandshake,
  CalendarCheck,
  FileText,       // NUEVO
  Settings,       // NUEVO
  GraduationCap   // NUEVO
} from 'lucide-react';

// --- FUENTES Y COLORES ---
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

const NAVY = '#071B3A';
const AMBER = '#FDB92B';
const TEAL = '#0A9BB8';

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const CONTACT_EMAIL = 'cesar@clinicadignidad.com';

const focusLight = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071B3A] focus-visible:ring-offset-2 focus-visible:ring-offset-white';

// --- LISTA DE CONVENIOS ACTUALES ---
const conveniosActivos = [
  {
    titulo: 'Tarjeta + Comunidad La Pintana',
    descripcion: 'Residentes de la comuna acceden a descuentos exclusivos en prestaciones adscritas al convenio.',
    requisito: 'Presentar Tarjeta + Comunidad (física o digital) y Cédula de Identidad.',
    proceso: 'Validar en recepción antes de realizar el pago.',
    nota: 'Beneficio personal e intransferible. Atención solicitada por el titular.',
    logo: '/convenios/tmc.png',
    // Fondo morado para que coincida con el logo
    bgLogoClass: 'bg-[#705697]', 
  },
  {
    titulo: 'Colegio San José de la Familia',
    descripcion: 'Descuento especial en prestaciones de salud dental y médica para estudiantes del establecimiento.',
    requisito: 'Presentar certificado de alumno regular vigente.',
    proceso: 'Validación obligatoria en recepción previo al pago.',
    nota: 'Beneficio exclusivo para el estudiante. Requiere acompañamiento de un adulto.',
    logo: '/convenios/sjf.png',
    // Fondo gris súper claro para diferenciarlo del blanco
    bgLogoClass: 'bg-[#F8F9FA]', 
  },
  {
    titulo: 'Colegio Jorge Huneeus Zegers',
    descripcion: 'Alianza enfocada en la salud preventiva y el bienestar integral para nuestros estudiantes.',
    requisito: 'Presentar certificado de alumno regular vigente.',
    proceso: 'Validación obligatoria en recepción previo al pago.',
    nota: 'Beneficio exclusivo para el estudiante. Requiere acompañamiento de un adulto.',
    logo: '/convenios/jhz.png',
    // Fondo gris súper claro para diferenciarlo del blanco
    bgLogoClass: 'bg-[#F8F9FA]', 
  },
];

// --- SECCIÓN DE CONVENIOS VIGENTES CON DISEÑO LIMPIO ---
// Busca esta parte en tu código y reemplázala por esta versión
<section className="py-20 md:py-28 bg-white">
  <div className="max-w-[1300px] mx-auto px-4 md:px-8">
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="text-[#0A9BB8] font-black text-sm uppercase tracking-widest block mb-2">Alianzas Activas</span>
      <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Convenios de Descuento Vigentes</h2>
      <p className="text-slate-600 text-lg">Conoce las instituciones que ya confían en nosotros y disfrutan de beneficios preferenciales.</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {conveniosActivos.map((convenio, idx) => (
        // NOTA: Eliminado el p-8 (padding) general y añadido overflow-hidden
        <div key={idx} className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between overflow-hidden group">
          
          <div>
            {/* CONTENEDOR DEL LOGO (Ocupa todo el ancho superior) */}
            <div className={`h-28 w-full flex items-center justify-center relative ${convenio.bgLogoClass}`}>
              {/* Para la Tarjeta Comunidad, la imagen debe llenar el alto, para los colegios debe tener padding */}
              <Image 
                src={convenio.logo} 
                alt={convenio.titulo} 
                fill 
                className={`object-contain ${idx === 0 ? 'p-0 scale-110' : 'p-4'}`} 
              />
            </div>
            
            {/* CONTENIDO TEXTUAL DE LA TARJETA (Añadido padding aquí) */}
            <div className="p-8 pt-8">
              <h3 className="text-2xl font-black text-[#071B3A] mb-3 leading-tight">{convenio.titulo}</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">{convenio.descripcion}</p>
              
              <div className="space-y-3 mb-2 text-xs font-medium text-slate-700 bg-[#F8F9FA] p-5 rounded-2xl border border-slate-100">
                <p><strong>Requisito:</strong> {convenio.requisito}</p>
                <p><strong>Proceso:</strong> {convenio.proceso}</p>
              </div>
            </div>
          </div>

          {/* FOOTER DE LA TARJETA */}
          <div className="px-8 pb-8 pt-4">
            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 italic leading-snug">{convenio.nota}</p>
            </div>
          </div>

        </div>
      ))}
    </div>
  </div>
</section>

// --- PREGUNTAS FRECUENTES (FAQ) ---
const faqs = [
  {
    pregunta: '¿Qué tipo de instituciones pueden generar un convenio con Clínica Dignidad?',
    respuesta: 'Municipalidades y servicios públicos, colegios, jardines infantiles, universidades, empresas privadas, cooperativas, fundaciones, instituciones sin fines de lucro, organizaciones comunitarias y PYMES.'
  },
  {
    pregunta: '¿Qué beneficios incluye un convenio con Clínica Dignidad?',
    respuesta: 'Incluye evaluación gratuita para todos los beneficiarios, descuentos preferenciales en especialidades médicas y dentales, y un trato preferencial y personalizado.'
  },
  {
    pregunta: '¿Tiene algún costo generar el convenio?',
    respuesta: 'No. El convenio no tiene costo económico ni para la institución ni para sus beneficiarios. Solo se requiere formalizar el acuerdo mediante correo electrónico o formulario.'
  },
  {
    pregunta: '¿Cómo se identifican los beneficiarios del convenio?',
    respuesta: 'Dependiendo de la institución, presentando su credencial institucional, tarjeta comunitaria vigente, certificado de alumno regular o carnet de socio junto a su cédula de identidad en recepción.'
  },
  {
    pregunta: '¿Cómo puedo iniciar un convenio o solicitar más información?',
    respuesta: `Puedes escribirnos directamente a ${CONTACT_EMAIL} con tu propuesta formal o consulta. Nuestro equipo administrativo te contactará a la brevedad.`
  }
];

export default function ConveniosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className={`${mainFont.className} flex min-h-screen flex-col overflow-x-hidden bg-white`}>
      
      {/* ================= HERO SECCIÓN ================= */}
      <section className="relative isolate overflow-hidden bg-[#071B3A] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0A9BB8]/25 blur-3xl" />
          <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-[#FDB92B]/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        </div>

        <div className="mx-auto max-w-[1300px] px-4 py-16 md:px-8 md:py-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0A9BB8]/30 bg-[#0A9BB8]/10 px-4 py-1.5 text-[13px] font-bold text-[#22B3CF] backdrop-blur mb-4">
            <HeartHandshake className="h-4 w-4" /> Alianzas Estratégicas
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Convenios de Descuento <br />
            <span className="text-[#FDB92B]">Institucional y Comunidad</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            En Clínica Dignidad creemos que la salud es un valor fundamental que debe estar al alcance de todos. Construimos alianzas basadas en el mutuo acuerdo para tu comunidad.
          </p>
        </div>
      </section>

      {/* ================= PROPUESTA INSTITUCIONAL ================= */}
      <section className="py-20 md:py-28 bg-[#F6F9FD]">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#0A9BB8] font-black text-sm uppercase tracking-widest block mb-2">Compromiso compartido</span>
              <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-6">
                Impulsamos el bienestar de tu organización
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Invitamos a municipalidades, colegios, empresas e instituciones públicas y privadas a formar parte de nuestro Programa de Convenios. Nuestra propuesta busca entregar beneficios preferenciales en salud médica y dental a funcionarios, estudiantes y familias.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="h-6 w-6 text-[#0A9BB8] shrink-0 mt-0.5" />
                  <span>Evaluación gratuita para todos los beneficiarios de la institución.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="h-6 w-6 text-[#0A9BB8] shrink-0 mt-0.5" />
                  <span>Descuentos preferenciales en un amplio catálogo de especialidades.</span>
                </li>
                <li className="flex items-start gap-3 text-slate-700 font-bold">
                  <CheckCircle2 className="h-6 w-6 text-[#0A9BB8] shrink-0 mt-0.5" />
                  <span>Entorno profesional, humano, cercano y accesible.</span>
                </li>
              </ul>
            </div>

            {/* Caja de ¿Quiénes pueden acceder? */}
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-[#071B3A] text-white flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black text-[#071B3A]">¿Quiénes pueden acceder?</h3>
              </div>
              <div className="space-y-4 text-slate-600 font-medium">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#0A9BB8] shrink-0" />
                  <span>Municipalidades y servicios públicos</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#0A9BB8] shrink-0" />
                  <span>Colegios, jardines infantiles y universidades</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#0A9BB8] shrink-0" />
                  <span>Empresas privadas, cooperativas y fundaciones</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-[#0A9BB8] shrink-0" />
                  <span>Instituciones sin fines de lucro y organizaciones comunitarias</span>
                </div>
              </div>
            </div>
          </div>

          {/* Especialidades Incluidas */}
          <div className="mt-16 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 text-center">
            <h4 className="text-xl font-black text-[#071B3A] mb-4">Especialidades Médicas y Dentales Incluidas</h4>
            <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed max-w-4xl mx-auto">
              Implantología • Endodoncia • Ortodoncia • Odontopediatría • Periodoncia • Rehabilitación Oral • Fonoaudiología • Matronería • Podología • Odontología General y mucho más.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CONVENIOS VIGENTES CON ESPACIO PARA LOGOS ================= */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1300px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#0A9BB8] font-black text-sm uppercase tracking-widest block mb-2">Alianzas Activas</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Convenios de Descuento Vigentes</h2>
            <p className="text-slate-600 text-lg">Conoce las instituciones que ya confían en nosotros y disfrutan de beneficios preferenciales.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {conveniosActivos.map((convenio, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] p-8 shadow-sm border-2 border-slate-100 hover:border-[#0A9BB8] transition-all flex flex-col justify-between group">
                <div>
                  {/* ESPACIO PARA EL LOGO DE LA INSTITUCIÓN */}
                  <div className="h-20 w-full bg-slate-50 rounded-2xl mb-6 flex items-center justify-center border border-dashed border-slate-300 relative overflow-hidden group-hover:bg-[#F6F9FD] transition-colors">
                    
                    {/* Puedes borrar este div de texto provisional si lo deseas */}
                    <div className="absolute inset-0 flex items-center justify-center p-2 text-center opacity-0">
                      <span className="text-xs font-bold text-slate-400 group-hover:text-[#071B3A] transition-colors">
                        [ Logo: {convenio.titulo} ]
                      </span>
                    </div>

                    {/* ¡Etiqueta de imagen activada! */}
                    <Image 
                      src={convenio.logo} 
                      alt={convenio.titulo} 
                      fill 
                      className="object-contain p-2" 
                    />
                  </div>

                  <h3 className="text-2xl font-black text-[#071B3A] mb-3">{convenio.titulo}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{convenio.descripcion}</p>
                  
                  <div className="space-y-3 mb-6 text-xs font-medium text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p><strong>Requisito:</strong> {convenio.requisito}</p>
                    <p><strong>Proceso:</strong> {convenio.proceso}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 italic">{convenio.nota}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PREGUNTAS FRECUENTES (FAQ) ================= */}
      <section className="py-20 md:py-28 bg-[#F6F9FD]">
        <div className="max-w-[900px] mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#071B3A] mb-4">Preguntas Frecuentes sobre Convenios</h2>
            <p className="text-slate-600 text-lg">Resolvemos tus dudas principales acerca de cómo integrar a tu institución.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-black text-[#071B3A] hover:text-[#0A9BB8] transition-colors"
                >
                  <span className="text-lg">{faq.pregunta}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-[#0A9BB8]' : 'text-slate-400'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-6 pt-0 text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                        {faq.respuesta}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA / CONTACTO PARA CONVENIOS ================= */}
      <section className="bg-white px-3 py-6 md:px-6 md:py-10">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2350] to-[#071B3A]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-10 h-[360px] w-[360px] rounded-full bg-[#0A9BB8]/20 blur-3xl" />
          
          <div className="relative mx-auto grid max-w-[1300px] items-center gap-12 px-5 py-16 md:px-12 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[13px] font-bold text-[#FDB92B] backdrop-blur mb-4">
                <Mail className="h-4 w-4" /> Alianzas y Propuestas
              </span>
              <h2 className="text-4xl font-black leading-[1.08] tracking-tight text-white md:text-[50px]">
                ¿Te gustaría crear un convenio con nosotros?
              </h2>
              <p className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-slate-300">
                En Clínica Dignidad valoramos la colaboración como el motor de una comunidad más saludable. Nuestro equipo administrativo revisará tu propuesta bajo un principio de mutuo acuerdo.
              </p>
              <p className={`${scriptFont.className} mt-8 text-4xl leading-tight text-[#22B3CF]`}>
                Que sonreír sea costumbre
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-2xl md:p-10 space-y-6">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Correo de Negocios y Alianzas</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-xl md:text-2xl font-black text-[#071B3A] hover:text-[#0A9BB8] transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Atención Telefónica Directa</p>
                <a
                  href={PHONE_HREF}
                  className="text-xl md:text-2xl font-black text-[#071B3A] hover:text-[#0A9BB8] transition-colors"
                >
                  {PHONE_LABEL}
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Propuesta%20de%20Convenio%20Institucional`}
                  className={`flex items-center justify-center gap-2 w-full rounded-full py-4 text-[15px] font-extrabold text-[#071B3A] shadow-[0_10px_30px_-8px_rgba(253,185,43,0.7)] transition-colors hover:bg-[#FFC94F] ${focusLight}`}
                  style={{ backgroundColor: AMBER }}
                >
                  <Mail className="h-5 w-5" />
                  Enviar propuesta de convenio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}