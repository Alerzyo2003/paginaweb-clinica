'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AGENDA_HREF, CLINICA } from '@/lib/clinica';

const focusDark =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071B3A]';

/** Rutas donde la barra no se muestra: el admin, y la tienda (ahí abajo va el botón del carrito). */
const OCULTA_EN = ['/admin', '/tienda'];

/**
 * Barra fija de contacto en el celular: llamar, WhatsApp y agendar.
 * Aparece al bajar un poco por la página. En computador no se muestra.
 */
export default function BarraContactoMovil() {
  const pathname = usePathname() ?? '';
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollY, 'change', (v) => setVisible(v > 300));

  if (OCULTA_EN.some((ruta) => pathname.startsWith(ruta))) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-40 md:hidden"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="mx-3 mb-3 flex gap-2 rounded-full border border-white/10 bg-[#071B3A]/90 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <a
              href={`tel:${CLINICA.telefono}`}
              aria-label={`Llamar al ${CLINICA.telefonoVisible}`}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-[#FDB92B] ${focusDark}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={CLINICA.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp"
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-white/15 text-[#8DBF3F] ${focusDark}`}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={AGENDA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FDB92B] text-[15px] font-extrabold text-[#071B3A] ${focusDark}`}
            >
              <CalendarCheck className="h-5 w-5" aria-hidden="true" />
              Agendar evaluación
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
