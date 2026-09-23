'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Nunito, Dancing_Script } from 'next/font/google';
import {
  Baby,
  CalendarCheck,
  ChevronDown,
  HeartPulse,
  Menu,
  Phone,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Tipografías (para cambiarlas, edita solo estas dos líneas)        */
/*  - Nunito: redondeada y amable, como las letras del logo            */
/*  - Dancing Script: manuscrita, como el lema del logo                */
/* ------------------------------------------------------------------ */
const mainFont = Nunito({ subsets: ['latin'], display: 'swap' });
const scriptFont = Dancing_Script({ subsets: ['latin'], display: 'swap' });

/* ------------------------------------------------------------------ */
/*  Colores sacados del logo                                           */
/* ------------------------------------------------------------------ */
const NAVY = '#071B3A'; // fondo del logo
const NAVY_DEEP = '#050F22'; // franja superior
const NAVY_RAISED = '#0B2350'; // paneles flotantes
const AMBER = '#FDB92B'; // figura amarilla
const BRAND_BAR = ['#6B9A2A', '#0A9BB8', '#FDB92B', '#B01C48']; // verde, turquesa, amarillo, magenta

const PHONE_LABEL = '+56 9 6646 7641';
const PHONE_HREF = 'tel:+56966467641';
const AGENDA_HREF = 'http://agendar.clinicadignidad.cl/agendar';

/* ------------------------------------------------------------------ */
/*  Datos de navegación (Añadido el campo 'id' para TypeScript)        */
/* ------------------------------------------------------------------ */
const navLinks = [
  { name: 'Inicio', href: '/', id: 'inicio' },
  { name: 'Equipo', href: '/equipo', id: 'equipo' },
  { name: 'Nosotros', href: '/nosotros', id: 'nosotros' },
  { name: 'Especialidades', href: '/especialidades', hasDropdown: true, id: 'especialidades' },
  { name: 'Convenios', href: '/convenios', id: 'convenios' },
];

const especialidades = [
  { name: 'Ortodoncia', desc: 'Brackets y alineadores', icon: Smile, color: '#22B3CF', href: '/especialidades/ortodoncia' },
  { name: 'Implantología', desc: 'Recupera piezas perdidas', icon: ShieldCheck, color: '#FDB92B', href: '/especialidades/implantologia' },
  { name: 'Endodoncia', desc: 'Tratamiento de conductos', icon: Stethoscope, color: '#8DBF3F', href: '/especialidades/endodoncia' },
  { name: 'Estética dental', desc: 'Blanqueamiento y carillas', icon: Sparkles, color: '#E5527B', href: '/especialidades/estetica-dental' },
  { name: 'Odontopediatría', desc: 'Atención para niños', icon: Baby, color: '#22B3CF', href: '/especialidades/odontopediatria' },
  { name: 'Rehabilitación oral', desc: 'Prótesis y función masticatoria', icon: HeartPulse, color: '#FDB92B', href: '/especialidades/rehabilitacion-oral' },
];

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // SOLUCIÓN: Definimos explícitamente que hovered puede ser string o null
  const [hovered, setHovered] = useState<string | null>(null);
  
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('inicio');

  /* Header compacto + "Inicio" activo al estar arriba */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      if (window.scrollY < 120) setActive('inicio');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Resalta el link de la sección que se está viendo */
  useEffect(() => {
    const sections = navLinks
      .filter((l) => l.id !== 'inicio')
      .map((l) => document.getElementById(l.id))
      // SOLUCIÓN: Le decimos a TypeScript que filtramos los nulos y solo dejamos HTMLElements
      .filter((s): s is HTMLElement => s !== null); 
      
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && window.scrollY >= 120) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Bloquea el scroll del fondo con el menú móvil abierto y lo cierra al pasar a escritorio */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const mq = window.matchMedia('(min-width: 1280px)');
    
    // SOLUCIÓN: Tipado estricto del evento
    const onChange = (e: MediaQueryListEvent) => e.matches && setMobileOpen(false);
    mq.addEventListener('change', onChange);
    return () => {
      document.body.style.overflow = '';
      mq.removeEventListener('change', onChange);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSpecOpen(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      {/* ===== Franja superior (solo escritorio) ===== */}
      <div className={`${mainFont.className} hidden md:block text-slate-300`} style={{ backgroundColor: NAVY_DEEP }}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-1 md:px-8">
          <p className={`${scriptFont.className} text-[19px] font-medium leading-none text-white/80`}>
            Que sonreír sea costumbre
          </p>
          <a
            href={PHONE_HREF}
            className="group inline-flex items-center gap-2 text-[12.5px] font-medium tracking-wide transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
          >
            <Phone className="h-3.5 w-3.5 text-[#FDB92B]" aria-hidden="true" />
            <span>Atención rápida</span>
            <span className="font-bold text-white">{PHONE_LABEL}</span>
          </a>
        </div>
      </div>

      {/* ===== Header principal ===== */}
      <header
        className={`${mainFont.className} sticky top-0 z-50 w-full transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? 'bg-[#071B3A]/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'bg-[#071B3A]'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-4 transition-[padding] duration-300 md:px-8 ${
            scrolled ? 'py-2' : 'py-3'
          }`}
        >
          {/* ---------- Logo: isotipo + wordmark en texto real ---------- */}
          <Link
            href="/"
            aria-label="Clínica Dignidad, ir al inicio"
            className={`group flex flex-shrink-0 items-center gap-3 rounded-lg ${focusRing}`}
          >
            <Image
              src="/logo-icono.png"
              alt=""
              width={456}
              height={350}
              priority
              className={`w-auto object-contain transition-[height] duration-300 ${
                scrolled ? 'h-9 md:h-10' : 'h-10 md:h-12'
              }`}
            />
            <span className="flex flex-col leading-none">
              <span className="text-[21px] font-black tracking-[0.06em] text-white md:text-[25px]">
                DIGNIDAD
              </span>
              <span className="mt-1.5 border-b border-white/70 pb-1 text-[8.5px] font-bold uppercase tracking-[0.18em] text-white/90 md:text-[9.5px]">
                Clínica odontológica
              </span>
            </span>
          </Link>

          {/* ---------- Menú escritorio ---------- */}
          <nav
            aria-label="Principal"
            className="hidden items-center gap-1 xl:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navLinks.map((link) => {
              const isActive = active === link.id;
              const isHovered = hovered === link.name;

              const linkInner = (
                <>
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative">{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      aria-hidden="true"
                      className={`relative h-3.5 w-3.5 transition-transform duration-200 ${
                        dropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full"
                      style={{ backgroundColor: AMBER }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </>
              );

              const linkClass = `relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[15.5px] font-bold transition-colors ${
                isActive ? 'text-white' : 'text-slate-300 hover:text-white'
              } ${focusRing}`;

              if (!link.hasDropdown) {
                return (
                  <div key={link.name} onMouseEnter={() => setHovered(link.name)}>
                    <Link href={link.href} className={linkClass} aria-current={isActive ? 'page' : undefined}>
                      {linkInner}
                    </Link>
                  </div>
                );
              }

              /* --- Especialidades con desplegable --- */
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(link.name);
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => setDropdownOpen(false)}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDropdownOpen(false);
                  }}
                  onKeyDown={(e) => e.key === 'Escape' && setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={linkClass}
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen}
                  >
                    {linkInner}
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-4">
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                          style={{ backgroundColor: NAVY_RAISED }}
                        >
                          <ul className="grid grid-cols-2 gap-1 p-3">
                            {especialidades.map(({ name, desc, icon: Icon, color, href }) => (
                              <li key={name}>
                                <Link
                                  href={href}
                                  onClick={() => setDropdownOpen(false)}
                                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:outline-none"
                                >
                                  <span
                                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                                    style={{ backgroundColor: `${color}26`, color }}
                                  >
                                    <Icon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block text-[14px] font-semibold text-white">{name}</span>
                                    <span className="block truncate text-[12.5px] text-slate-400">{desc}</span>
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-6 py-3">
                            <span className="text-[12.5px] text-slate-400">¿No sabes cuál necesitas?</span>
                            <a
                              href={AGENDA_HREF}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setDropdownOpen(false)}
                              className="text-[13px] font-bold text-[#FDB92B] hover:underline focus-visible:underline focus-visible:outline-none"
                            >
                              Agenda una evaluación
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* ---------- Derecha: CTA + botón móvil ---------- */}
          <div className="flex items-center gap-2">
            <a
              href={AGENDA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full px-6 py-3 text-[14px] font-extrabold text-[#071B3A] shadow-[0_6px_20px_-6px_rgba(253,185,43,0.55)] transition-all hover:-translate-y-px hover:bg-[#FFC94F] hover:shadow-[0_10px_26px_-6px_rgba(253,185,43,0.7)] active:translate-y-0 active:scale-[0.98] md:inline-flex ${focusRing}`}
              style={{ backgroundColor: AMBER }}
            >
              <CalendarCheck className="h-[18px] w-[18px]" aria-hidden="true" />
              Agenda tu evaluación
            </a>

            <button
              type="button"
              onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              aria-controls="menu-movil"
              className={`relative flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 xl:hidden ${focusRing}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -60 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 60 }}
                  transition={{ duration: 0.15 }}
                  className="flex"
                >
                  {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ---------- Barra con los 4 colores del logo ---------- */}
        <div className="flex h-[3px] w-full" aria-hidden="true">
          {BRAND_BAR.map((c) => (
            <span key={c} className="flex-1" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* ---------- Menú móvil ---------- */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="menu-movil"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/10 shadow-2xl shadow-black/60 xl:hidden"
              style={{ backgroundColor: NAVY }}
            >
              <nav aria-label="Menú móvil" className="space-y-1 px-4 pb-2 pt-4">
                {navLinks.map((link) => {
                  const isActive = active === link.id;
                  const rowClass = `flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-[16px] font-bold transition-colors hover:bg-white/[0.06] ${
                    isActive ? 'text-[#FDB92B]' : 'text-slate-100'
                  } ${focusRing}`;

                  if (!link.hasDropdown) {
                    return (
                      <Link key={link.name} href={link.href} onClick={closeMobile} className={rowClass}>
                        {link.name}
                      </Link>
                    );
                  }

                  return (
                    <div key={link.name}>
                      <button
                        type="button"
                        className={rowClass}
                        aria-expanded={mobileSpecOpen}
                        onClick={() => setMobileSpecOpen((v) => !v)}
                      >
                        {link.name}
                        <ChevronDown
                          aria-hidden="true"
                          className={`h-4 w-4 transition-transform duration-200 ${mobileSpecOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobileSpecOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            {especialidades.map(({ name, icon: Icon, color, href }) => (
                              <li key={name}>
                                <Link
                                  href={href}
                                  onClick={closeMobile}
                                  className="ml-4 flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:bg-white/[0.06]"
                                >
                                  <span
                                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                                    style={{ backgroundColor: `${color}26`, color }}
                                  >
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                  </span>
                                  {name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="space-y-3 px-4 pb-6 pt-4">
                <a
                  href={PHONE_HREF}
                  className={`flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-[15px] font-bold text-white transition-colors hover:bg-white/[0.06] ${focusRing}`}
                >
                  <Phone className="h-4 w-4 text-[#FDB92B]" aria-hidden="true" />
                  {PHONE_LABEL}
                </a>
                <a
                  href={AGENDA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className={`flex items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-extrabold text-[#071B3A] transition-colors hover:bg-[#FFC94F] ${focusRing}`}
                  style={{ backgroundColor: AMBER }}
                >
                  <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  Agenda tu evaluación
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}
