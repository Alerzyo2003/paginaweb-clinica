'use client';

import { MotionConfig } from 'framer-motion';
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type PanelCarrito = {
  abierto: boolean;
  abrir: () => void;
  cerrar: () => void;
  /** Cambia cada vez que se agrega algo, para animar el botón del carrito. */
  latido: number;
  avisarAgregado: () => void;
};

const Contexto = createContext<PanelCarrito | null>(null);

export function PanelCarritoProvider({ children }: { children: ReactNode }) {
  const [abierto, setAbierto] = useState(false);
  const [latido, setLatido] = useState(0);

  const abrir = useCallback(() => setAbierto(true), []);
  const cerrar = useCallback(() => setAbierto(false), []);
  const avisarAgregado = useCallback(() => setLatido((n) => n + 1), []);

  const valor = useMemo(
    () => ({ abierto, abrir, cerrar, latido, avisarAgregado }),
    [abierto, abrir, cerrar, latido, avisarAgregado],
  );

  return (
    <Contexto.Provider value={valor}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </Contexto.Provider>
  );
}

export function usePanelCarrito() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error('usePanelCarrito debe usarse dentro de PanelCarritoProvider');
  return ctx;
}
