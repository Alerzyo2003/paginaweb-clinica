'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCarrito } from '@/lib/tienda/carrito';
import { precio } from '@/lib/tienda/formato';
import { usePanelCarrito } from './PanelCarritoContext';

/** Botón flotante del carrito: aparece cuando hay productos agregados. */
export default function BotonCarrito() {
  const { unidades, total } = useCarrito();
  const { abrir, abierto, latido } = usePanelCarrito();

  return (
    <AnimatePresence>
      {unidades > 0 && !abierto && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-0 sm:pb-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        >
          <motion.button
            key={latido}
            type="button"
            onClick={abrir}
            initial={latido > 0 ? { scale: 1 } : false}
            animate={latido > 0 ? { scale: [1, 1.06, 1] } : undefined}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="pointer-events-auto flex h-16 w-full max-w-[420px] items-center gap-3 rounded-full bg-[#071B3A] pl-2 pr-6 text-white shadow-[0_18px_40px_-14px_rgba(7,27,58,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDB92B] focus-visible:ring-offset-2 sm:w-auto"
          >
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#FDB92B] text-[#071B3A]">
              <ShoppingBag className="h-[22px] w-[22px]" aria-hidden="true" />
              <span className="absolute -right-1 -top-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[12px] font-black tabular-nums text-[#071B3A] ring-2 ring-[#071B3A]">
                {unidades}
              </span>
            </span>
            <span className="flex-1 text-left text-[15.5px] font-extrabold">Ver carrito</span>
            <span className="text-[16px] font-black tabular-nums">{precio(total)}</span>
            <span className="sr-only">, {unidades} productos</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
