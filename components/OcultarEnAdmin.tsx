'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Oculta lo que envuelve (menú, footer, cursor) dentro del panel de admin. */
export default function OcultarEnAdmin({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <>{children}</>;
}
