'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Detecta si el mouse está sobre un enlace (a) o un botón (button)
      const target = e.target as HTMLElement;
      if (
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  // Ocultamos el cursor en dispositivos móviles/táctiles porque no tiene sentido ahí
  return (
    <>
      {/* El anillo exterior que persigue al mouse con un efecto de "resorte" suave */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#0A9BB8] mix-blend-exclusion md:flex"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: isHovered ? 1.5 : 1,
          backgroundColor: isHovered ? 'rgba(10, 155, 184, 0.15)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 28,
          mass: 0.5,
        }}
      >
        {/* El puntito interior que desaparece al hacer hover */}
        <motion.div
          className="h-2 w-2 rounded-full bg-[#FDB92B]"
          animate={{
            opacity: isHovered ? 0 : 1,
            scale: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}